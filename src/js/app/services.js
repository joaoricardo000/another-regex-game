'use strict';
(function () {
    var app = angular.module('RegexGame.services', []);

    app.factory('LevelsFactory', function (GameStatusService, WordsFactory) {
        var Levels = {};

        Levels.get = function (id, next) {
            next(null, window.levelsData[id]);
        };

        Levels.getAll = function (next) {
            next(null, window.levelsData);
        };

        Levels.getRandomLevel = function (args, next) {
            var size = args.size || 5;
            WordsFactory.getDictionary({lang: args.lang}, function (err, words) {
                var all = {};
                var totalWords = words.length;

                var levelData = {
                    labels: {title: "Golf"},
                    goodWords: [],
                    badWords: []
                };

                var w = "";
                while (levelData.goodWords.length < size) {
                    w = words[parseInt(Math.random() * totalWords)];
                    if (!all[w] && w.length < 14) {
                        levelData.goodWords.push(w);
                        all[w] = true;
                    }
                }

                while (levelData.badWords.length < size) {
                    w = words[parseInt(Math.random() * totalWords)];
                    if (!all[w] && w.length < 14) {
                        levelData.badWords.push(w);
                        all[w] = true;
                    }
                }

                next(null, levelData);
            })
        };

        Levels.dumpLevel = function (args, next) {
            var title = args.title || "A Title";
            var solution = args.solution;
            var goodWords = args.goodWords;
            var badWords = args.badWords;

            var clearGoodWords = [];
            angular.forEach(goodWords,
                function (word) {
                    if (word.length > 0)
                        clearGoodWords.push(word)
                });

            var clearBadWords = [];
            angular.forEach(badWords,
                function (word) {
                    if (word.length > 0)
                        clearBadWords.push(word)
                });

            var textJson = JSON.stringify({
                labels: {title: title},
                solution: solution,
                goodWords: clearGoodWords,
                badWords: clearBadWords
            });
            next(null, encodeURIComponent(Crypto.util.bytesToBase64(Crypto.charenc.UTF8.stringToBytes(textJson))));
        };

        function isLevelDataValid(loadedLevelData) {
            var levelRegex = new RegExp(loadedLevelData.solution);
            if (loadedLevelData.goodWords.length == 0 || loadedLevelData.goodWords.length > 25 || loadedLevelData.badWords.length > 25)
                throw "Invalid Level Words";

            var checkSize = function (word) {
                if (word.length > 30)
                    throw "Invalid Level Words Size";
            };

            angular.forEach(loadedLevelData.goodWords, checkSize);
            angular.forEach(loadedLevelData.badWords, checkSize);

            var gameStatus = GameStatusService.getLevelStatus(loadedLevelData, levelRegex);
            return gameStatus.percentage == 100;
        }

        Levels.loadLevel = function (encodedLevelData, next) {
            try {
                var loadedLevelData = JSON.parse(
                    Crypto.charenc.UTF8.bytesToString(
                        Crypto.util.base64ToBytes(decodeURIComponent(encodedLevelData))
                    ));
                if (isLevelDataValid(loadedLevelData))
                    next(null, loadedLevelData);
                else
                    next("Invalid Level Data", null);
            } catch (e) {
                next(e, null)
            }
        };

        return Levels;
    });

    app.factory('WordsFactory', function ($http) {
        var Words = {};
        var db_url = window.staticBaseUrl + "js/db/";
        var cache = {};

        Words.getDictionary = function (args, next) {
            var lang = args.lang || 'pt-br';
            if (cache[lang])
                next(null, cache[lang]);
            else
                $http.get(db_url + lang)
                    .then(function (response) {
                        cache[lang] = response.data.split("\n");
                        next(null, cache[lang])
                    });
        };
        return Words;
    });

    app.service('GameStatusService', function () {
        var GameStatus = {};

        function _buildSpanMatch(match) {
            return [escapeHtml(match.input.substr(0, match.index)),
                "<span class='regex-match'>" + escapeHtml(match[0]) + "</span>",
                escapeHtml(match.input.substr(match.index + match[0].length))].join('')
        }

        function _getWordListStatus(words, regex, spanMatch) {
            var wordsStatus = [];
            var validWordCount = 0;
            var matchCount = 0;

            for (var i = 0; i < words.length; i++) {
                var word = words[i];
                if (word.length) {
                    validWordCount++;
                    var match = regex.exec(word);
                    if (match) {
                        matchCount++;
                        wordsStatus[i] = {
                            text: spanMatch ? _buildSpanMatch(match) : escapeHtml(word),
                            match: match
                        };
                        continue
                    }
                }
                wordsStatus[i] = {text: escapeHtml(word), match: false};
            }

            return {
                words: wordsStatus,
                percentage: parseInt(matchCount * 100 / validWordCount)
            };
        }

        GameStatus.getInitialStatus = function (levelData) {
            var levelStatus = {
                goodWords: [],
                badWords: [],
                percentage: 0
            };

            for (var i = 0; i < levelData.goodWords.length; i++) {
                levelStatus.goodWords.push({text: escapeHtml(levelData.goodWords[i] || ''), match: false})
            }
            if (levelData.badWords)
                for (i = 0; i < levelData.badWords.length; i++) {
                    levelStatus.badWords.push({text: escapeHtml(levelData.badWords[i] || ''), match: false})
                }
            return levelStatus;
        };

        GameStatus.getLevelStatus = function (levelData, regex, spanMatch) {
            var statusGood = _getWordListStatus(levelData.goodWords, regex, spanMatch);
            var statusBad = levelData.badWords ? _getWordListStatus(levelData.badWords, regex, spanMatch) : null;

            return {
                goodWords: statusGood.words,
                badWords: statusBad ? statusBad.words : [],
                percentage: (statusBad && statusBad.percentage) ? 0 : statusGood.percentage
            }
        };

        return GameStatus;
    });
}());