(function (global, isTest) {
    var scoreMatch = 4;
    var subPartsMaxSize = 4;

    var _extend = function (objA, objB) {
        for (var k in objB) {
            objA[k] = objB[k]
        }
    };

    var sortScores = function (a, b) {
        return b - a;
    };

    function getMatches(wordList, regex) {
        var matches = [];
        for (var i = 0; i < wordList.length; i++) {
            if (regex.exec(wordList[i]))
                matches.push(wordList[i])
        }
        return matches;
    }

    function subparts(word, n) {
        n = n || subPartsMaxSize;
        var fullWord = "^" + word + "$";
        var parts = {};
        var step = 0;
        while (step++ < n) {
            for (var i = 0; i < fullWord.length; i++) {
                parts[fullWord.substr(i, step)] = 0;
            }
        }

        return parts
    }

    function dotify(wordPart, prefix) {
        var fn = function (wordPart, prefix) {
            if (wordPart.length == 0)
                return;
            prefix = prefix || "";

            var part = wordPart.slice();
            var dotified = {};

            for (var i = 0; i < part.length; i++) {
                for (var j = 1; j < part.length - i + 1; j++) {
                    var p = part.substr(i, j).replace(/[^\^\$\.]/g, '.');
                    var partial = [part.substr(0, i), p, part.substr(i + j)].join('');
                    dotified[prefix + partial] = 0;
                }
            }


            _extend(dotified, fn(wordPart.slice(1), prefix + (wordPart[0] == "^" ? "^" : ".")));
            _extend(dotified, fn(wordPart.slice(1), prefix + wordPart[0]));
            return dotified
        };

        return fn(wordPart, prefix);
    }

    function getFullWordsRegex(wordList) {
        var parts = [];
        for (var i = 0; i < wordList.length; i++) {
            parts.push("^" + wordList[i] + "$")
        }
        return parts;
    }

    function getScoredPool(regexPool, goodWords, badWords) {
        var regexPoolByScore = {};

        for (var i = 0; i < regexPool.length; i++) {
            var regexPart = regexPool[i];
            var regexp = new RegExp(regexPart);

            if (badWords && getMatches(badWords, regexp).length)
                continue;

            var goodMatches = getMatches(goodWords, regexp);
            if (goodMatches.length) {
                var score = goodMatches.length * scoreMatch - regexp.source.length;
                try {
                    regexPoolByScore[score].push(regexp)
                } catch (e) {
                    regexPoolByScore[score] = [regexp]
                }
            }

        }

        var scores = Object.keys(regexPoolByScore).sort(sortScores);

        var regexListByScore = [];
        while (scores.length) {
            score = scores.pop();
            while (regexPoolByScore[score].length) {
                regexListByScore.push(regexPoolByScore[score].pop())
            }
        }
        return regexListByScore;
    }

    function getRegexParts(goodWords) {
        var regexPartsPool = {};
        for (var i = 0; i < goodWords.length; i++) {
            _extend(regexPartsPool, subparts(goodWords[i]))
        }

        var dotifieds = {};
        for (var p in regexPartsPool) {
            _extend(dotifieds, dotify(p))
        }
        _extend(regexPartsPool, dotifieds);

        var regexPartsList = Object.keys(regexPartsPool);

        regexPartsList = regexPartsList.concat(getFullWordsRegex(goodWords));
        return regexPartsList
    }

    function findRegex(goodWords, badWords) {
        var allRegexParts = getRegexParts(goodWords);
        var regexPool = getScoredPool(allRegexParts, goodWords, badWords);
        var winnersLeft = goodWords.slice();
        var regexParts = [];
        while (winnersLeft.length) {
            var newMatches = [];
            var regexPart = regexPool.pop();
            for (var i = 0; i < winnersLeft.length; i++) {
                if (regexPart.exec(winnersLeft[i]))
                    newMatches.push(winnersLeft[i]);
            }
            if (newMatches) {
                regexParts.push(regexPart.source);
                for (var i = 0; i < newMatches.length; i++) {
                    winnersLeft.splice(winnersLeft.indexOf(newMatches[i]), 1);
                }
                regexPool = getScoredPool(regexPool, winnersLeft)
            }
        }
        return regexParts.join("|");
    }

    if (isTest) {
        global.subparts = subparts;
        global.dotify = dotify;
        global.getMatches = getMatches;
        global.getScoredPool = getScoredPool;
        global.getRegexParts = getRegexParts;
    }

    global.findregex = findRegex;
})(typeof window == 'undefined' ? global : window, typeof window == 'undefined');