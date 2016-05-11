var assert = require("assert");

function words(s) {
    return s.split(" ")
}

function report(goodWords, badWords, norvigSolution) {
    var solution = findregex(goodWords, badWords);
    console.log(["\n#######################", goodWords[0], "x", badWords[0]].join(" "));
    console.log(["Solution: \t\t\\", solution, "\\ - ", solution.length].join(''));
    if (norvigSolution)
        console.log(["Norvig Solution: \t\\", norvigSolution, "\\ - ", norvigSolution.length].join(''));
    console.log("#######################\n");
    return solution
}

describe('Regex Finder', function () {

    require('../src/js/app/regexfinder');

    describe('Build Regex', function () {
        it('split a word into smallers regex parts', function () {
            var parts = subparts("abc");
            assert.equal(0, parts["bc$"]);
            assert.equal(0, parts["^ab"]);
            assert.equal(0, parts["b"]);
        });

        it('dotify a part', function () {
            function testDotifyWord(word, expected) {
                var parts = Object.keys(dotify(word));
                expected.sort();
                parts.sort();
                assert.deepEqual(parts, expected);
            }

            testDotifyWord("a$", ['.$', 'a$']);
            testDotifyWord("ab$", ['a.$', '.b$', '..$', 'ab$']);
            testDotifyWord("^it$", ['^it$', '^i.$', '^.t$', '^..$']);
            testDotifyWord("this", ['thi.', 'th.s', 'th..', 't.is', 't.i.', 't..s', 't...', '.his', '.hi.', '.h.s', '.h..', '..is', '..i.', '...s', '....']);
        });

        it("gets every match in an array", function () {
            var regexp = new RegExp('a|b|c');
            var words = ['a', 'b', 'c', 'd', 'e'];

            assert.deepEqual(getMatches(words, regexp), ['a', 'b', 'c'])
        });

        it("build a array of regex parts ordered by score", function () {
            var regexPoll = ["b$", "^a", ".", "x", "a", "^..$"];
            var pool = getScoredPool(regexPoll, ["ab", "ad", "af"], ["frs", "fdx", "htd", "gfs"]);
            assert.equal(pool.length, 4);
            assert.equal(pool.pop(), "/a/");
            assert.equal(pool[0], "/b$/");
        });

        it("returns an array of regex parts from the goodWords", function () {
            var goodWords = ["sorti", "roeu", "reserva", "hospital", "errata", "herbicida", "oficina", "sorri", "heresia", "opala"];
            var badWords = ["sacrilego", "depreciativo", "intrigar", "drogar", "parmesao", "abstinhas", "bob", "realengo", "antedais", "desferrar"];

            var regexValidParts = getRegexParts(goodWords);

            var regexPool = getScoredPool(regexValidParts, goodWords, badWords);
            while (regexPool.length) {
                var r = regexPool.pop();

                var matchesOne = false;
                for (var g = 0; g < goodWords.length; g++) {
                    if (new RegExp(r).exec(goodWords[g]))
                        matchesOne = true
                }
                assert(matchesOne);

                for (var b = 0; b < badWords.length; b++) {
                    assert(!new RegExp(r).exec(badWords[b]))
                }
            }
        })
    });

    describe('Solving Problems', function () {

        it("solves regex golf problems - boys girls", function () {
            var norvigSolution = 'a.$|e.$|a.o';
            var solution = report(
                words('jacob mason ethan noah william liam jayden michael alexander aiden'),
                words('sophia emma isabella olivia ava emily abigail mia madison elizabeth'),
                norvigSolution);
            assert.equal(norvigSolution, solution);
        });

        it("solves regex golf problems", function () {
            var norvigSolution = 'o.$|x|ir|q|f|po';
            var solution = report(
                words('lipitor nexium plavix advair ablify seroquel singulair crestor actos epogen'),
                words('paris trinidad capetown riga zurich shanghai vancouver chicago adelaide auckland'),
                norvigSolution);
            assert.equal(norvigSolution.length, solution.length);
        });

        it("solves regex golf problems - star wars / trek", function () {
            var norvigSolution = ' T|E.P|OP';
            var solution = report(
                ['The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
                ['The Wrath of Khan', 'The Search for Spock', 'The Voyage Home', 'The Final Frontier', 'The Undiscovered Country', 'Generations', 'First Contact', 'Insurrection', 'Nemesis'],
                norvigSolution);
            assert.equal(norvigSolution.length, solution.length);
        });

        it("solves regex golf problems - presidents", function () {
            var solution = report(
                words('madison taylor clinton carter buchanan washington garfield taft harrison cleveland truman polk monroe wilson jackson grant bush jefferson mckinley van-buren hoover harding reagan lincoln coolidge eisenhower obama pierce adams johnson kennedy grapartnt roosevelt hayes nixon'),
                words('parker dukakis greeley romney dole mccain scott blaine landon smith mcclellan goldwater kerry mcgovern willkie seymour clay fremont ford pinckney breckinridge mondale tilden dewey king hughes cox hancock cass bryan davis humphrey stevenson gore'),
                'a.a|i..n|j|oo|a.t|i..o|a..i|bu|n.e|ay.|r.e$|po|ma|nd$'
            );
            assert(solution)
        });

    });
});