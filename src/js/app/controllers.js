'use strict';
(function () {
    var app = angular.module('RegexGame.controllers', []);
    app.controller('IndexController',
        function ($scope, LevelsFactory) {
            LevelsFactory.getAll(function (err, allLevels) {
                $scope.allLevels = allLevels;
            })
        });

    app.controller('CreateController',
        function ($scope, $location, $timeout, LevelsFactory, GameStatusService) {
            $scope.compiledRegex = null;

            $scope.levelData = {};
            $scope.levelStatus = null;
            $scope.isSolved = false;

            $scope.createdUrl = "";

            $scope.$on('regex-update',
                function (event, regex) {
                    if (regex) {
                        $scope.compiledRegex = regex;
                        $scope.levelData.solution = regex.source;
                        $scope.testWords();
                    } else {
                        $scope.levelStatus = GameStatusService.getInitialStatus($scope.levelData);
                        $scope.isSolved = false;
                    }
                });

            $scope.testWords = function () {
                $scope.checkInputWordAvailability();
                if (!$scope.compiledRegex)
                    return;

                $scope.levelStatus = GameStatusService.getLevelStatus($scope.levelData, $scope.compiledRegex);
                $scope.isSolved = $scope.levelStatus.percentage == 100;
            };

            $scope.save = function () {
                $scope.testWords();
                if (!$scope.isSolved)
                    return;

                LevelsFactory.dumpLevel($scope.levelData, function (err, levelData) {
                    $scope.createdUrl = window.location.origin + "#/created/?l=" + levelData;
                    shortener($scope.createdUrl, function (err, url) {
                        $("#created-url").val(url || $scope.createdUrl);
                    })
                });
                ga('send', 'event', 'create', 'save');
            };

            $scope.copyToClipboard = function () {
                var ipt = document.getElementById("created-url");
                if (ipt.value.length) {
                    ipt.focus();
                    ipt.setSelectionRange(0, ipt.value.length);
                    try {
                        var copied = document.execCommand("copy");
                        if (copied)
                            $(".alert-copy").show()
                    }
                    catch (e) {
                    }
                }
            };

            $scope.checkInputWordAvailability = function () {
                angular.forEach([$scope.levelData.goodWords, $scope.levelData.badWords], function (words) {
                    var total = 0;
                    angular.forEach(words, function (word) {
                        if (word.length > 0)
                            total++
                    });
                    if (total >= words.length && words.length < 20)
                        words.push("");
                });
            };

            $scope.updateRegexBuilder = function () {
                $timeout(function () {
                    $scope.$broadcast("set-regex-tools", false);
                    $scope.$broadcast("set-regex-text", $scope.levelData.solution)
                });
            };

            $scope.loadLevelFromQuery = function () {
                LevelsFactory.loadLevel($location.search().l, function (err, levelData) {
                    $scope.levelData = levelData;
                    $scope.testWords();
                });
            };

            $scope.init = function () {
                if ($location.search().l)
                    $scope.loadLevelFromQuery();
                else {
                    $scope.levelData = {
                        goodWords: ["", "", "", "", "", ""],
                        badWords: ["", "", "", "", "", ""],
                        title: "",
                        solution: ""
                    };
                    $scope.levelStatus = GameStatusService.getInitialStatus($scope.levelData);
                    $scope.updateRegexBuilder();
                }
            };

            $scope.init();
        });

    app.controller('SearchController',
        function ($scope, $location, $timeout, WordsFactory) {
            $scope.wordsList = null;
            $scope.matches = [];

            $scope.search = function (regex) {
                var matches = [];

                angular.forEach($scope.wordsList, function (word) {
                    var match = regex.exec(word);
                    if (match)
                        if (match[0].length) {
                            matches.push({text: match.input.replace(regex, "<span class='search-match'>" + match[0] + "</span>")});
                        } else
                            matches.push({text: match.input});
                });

                if (matches.length > 50) {
                    $scope.matches = matches.slice(0, 20);
                    $scope.matches.push({text: "..."});
                    $scope.matches.push({text: "..."});
                    $scope.matches.push({text: "..."});
                    $scope.matches = $scope.matches.concat(matches.slice(matches.length - 20));
                } else
                    $scope.matches = matches;

                $scope.totalMatches = matches.length;
            };

            var searchTimeout = null;
            $scope.$on('regex-update',
                function (event, regex) {
                    if (regex) {
                        $location.search('q', regex.source);
                        $timeout.cancel(searchTimeout);
                        searchTimeout = $timeout(function () {
                            $scope.search(regex)
                        }, 300);
                    } else {
                        $scope.matches = [];
                        $scope.totalMatches = 0;
                        $location.search('q', null);
                    }
                });

            $scope.updateRegexBuilder = function () {
                $timeout(function () {
                    $scope.$broadcast("set-regex-tools", false);
                    if ($location.search().q && typeof $location.search().q == "string")
                        $scope.$broadcast("set-regex-text", $location.search().q)
                });
            };

            $scope.init = function () {
                WordsFactory.getDictionary({lang: 'pt-br'}, function (err, data) {
                    $scope.wordsList = data;
                });
            };
            $scope.init();
        });

    app.controller('GameController',
        function ($scope, $timeout, $location, $routeParams, LevelsFactory, GameStatusService, localStorageService) {
            $scope.levelData = null;
            $scope.gameMode = "";

            $scope.gameStatus = {};
            $scope.isLevelCompleted = false;
            $scope.currentLevelId = 0;
            $scope.hintsCount = 0;

            $scope.golfSize = 5;
            $scope.golfPoints = 0;

            $scope.compiledRegex = null;

            $scope.testWords = function () {
                $scope.gameStatus = GameStatusService.getLevelStatus($scope.levelData, $scope.compiledRegex, true);
                $scope.checkGameStatus();
            };

            $scope.checkGameStatus = function () {
                $scope.updateGolfPoints();
                if ($scope.gameStatus.percentage == 100 && $scope.levelData.id && !$scope.isLevelCompleted) {
                    $timeout(function () {
                        $("#finish-modal").modal("show");
                        $scope.isLevelCompleted = true;
                    }, 500)
                }
            };

            $scope.nextLevel = function () {
                $(".modal").modal("hide");
                if ($scope.currentLevelId + 1 >= window.levelsData.length)
                    window.location = "#/end";
                else
                    window.location = "#/play/" + ($scope.currentLevelId + 1).toString();
                ga('send', 'event', 'level', 'finished', $scope.currentLevelId || 'custom');
            };

            $scope.onLevelLoaded = function (err, levelData) {
                if (err || !levelData) {
                    window.location = "#/";
                    return;
                }
                $scope.levelData = levelData;
                $scope.gameStatus = GameStatusService.getInitialStatus(levelData);
                $scope.hintsCount = 0;

                if (levelData.id) {
                    $scope.currentLevelId = parseInt($routeParams.levelId);
                    $("body").addClass("level-" + levelData.id);
                    $timeout(function () {
                        $("#start-modal").modal("show");
                    }, 400)
                }

                $scope.updateRegexBuilder();
            };

            $scope.updateRegexBuilder = function () {
                $timeout(function () {
                    $scope.$broadcast("set-regex-tools", $scope.levelData.startingTools || false)
                });
            };

            $scope.showHint = function () {
                $scope.hintsCount++;
                $('#hints-modal').modal('show');
                ga('send', 'event', 'level', 'hint', $scope.levelData.id);
            };

            $scope.editLevel = function () {
                ga('send', 'event', 'create', 'edit');
                window.location = "#/create/?l=" + $location.search().l;
            };

            $scope.getRandomLevel = function () {
                LevelsFactory.getRandomLevel({size: $scope.golfSize}, $scope.onLevelLoaded);
                $scope.$broadcast("set-regex-text", "")
            };

            $scope.solveLevel = function () {
                var solution = findregex($scope.levelData.goodWords, $scope.levelData.badWords);
                $scope.$broadcast("set-regex-text", solution)
            };

            $scope._addGolfEventListeners = function () {
                var $btnsGolfSize = $('.li-golfsize .btn');
                var golfSize = localStorageService.get("golfSize");
                $btnsGolfSize.removeClass('active');
                $('.golf-size-' + golfSize).addClass('active');
                $scope.golfSize = golfSize || 5;
                $btnsGolfSize.click(function (e) {
                    $scope.golfSize = parseInt(e.target.innerText);
                    localStorageService.set("golfSize", $scope.golfSize);
                    $scope.$apply();
                    $scope.getRandomLevel();
                });
            };

            $scope.updateGolfPoints = function () {
                var points = 0;
                angular.forEach($scope.gameStatus.goodWords, function (word) {
                    if (word.match) points += 10
                });

                angular.forEach($scope.gameStatus.badWords, function (word) {
                    if (word.match) points -= 10
                });

                points -= $scope.compiledRegex.source.length;
                if ($scope.compiledRegex.source.indexOf("|") >= 0)
                    points -= $scope.compiledRegex.source.match(/\|/g).length * 4;
                $scope.golfPoints = points;
            };

            $scope.$on('regex-update',
                function (event, regex) {
                    if (regex) {
                        $scope.compiledRegex = regex;
                        $scope.testWords();
                    } else {
                        $scope.golfPoints = 0;
                        $scope.gameStatus = GameStatusService.getInitialStatus($scope.levelData);
                    }
                });

            $scope.init = function () {
                switch ($location.path()) {
                    case '/created/':
                        LevelsFactory.loadLevel($location.search().l, $scope.onLevelLoaded);
                        $scope.gameMode = "created";
                        $("body").addClass("game-created");
                        break;
                    case '/golf/':
                        $scope._addGolfEventListeners();
                        LevelsFactory.getRandomLevel({size: $scope.golfSize}, $scope.onLevelLoaded);
                        $scope.gameMode = "golf";
                        $("body").addClass("game-golf");
                        break;
                    default:
                        LevelsFactory.get($routeParams.levelId || 1, $scope.onLevelLoaded);
                        $("body").addClass("game-level");
                        $scope.gameMode = "level";
                }
            };
            $scope.init();
        });

    app.controller('RegexBuilderController',
        function ($scope, $timeout, localStorageService) {
            // raw regex input
            $scope.iKnowRegexMode = false;
            $scope.rawRegex = "";
            $scope.quickTools = ['.', '?', '+', '*', '[', ']', '^', '$', '|', '{', '}', '(', ')', '\\', '/'];

            // regex builder input
            $scope.regexText = "";
            $scope.regexCompiled = "";
            $scope.regexElements = [];

            // regex builder modals
            $scope.inputValue = "";
            $scope.inputQuantifier = "";

            $scope.toolsLabel = {
                letter: "a",
                dot: ".",
                group: "[ ]",
                groupNegated: "[^]",
                anchorStart: "^",
                anchorEnd: "$",
                or: "|"
            };

            $scope.startingTools = {};
            $scope.availableTools = {};

            $scope.useTool = function (toolType) {
                $scope.inputValue = "";
                $scope.inputQuantifier = "";
                $scope.useToolFunction[toolType](toolType);
            };

            $scope.useLetterTool = function () {
                _openToolModal('input-letter-modal');
            };

            $scope.useGroupTool = function (toolType) {
                $scope.isGroupNegated = toolType == "groupNegated";
                _openToolModal('input-group-modal');
            };

            $scope.selectToolLetter = function () {
                if (!$scope.inputValue)
                    return;
                $("#input-letter-modal").modal("hide");
                $scope._selectTool(
                    "letter",
                    $scope.inputValue,
                    $scope.inputQuantifier
                );
            };

            $scope.selectToolGroup = function () {
                if (!$scope.inputValue)
                    return;
                $("#input-group-modal").modal("hide");
                $scope._selectTool(
                    $scope.isGroupNegated ? "groupNegated" : "group",
                    "[" + ($scope.isGroupNegated ? "^" : "") + $scope.inputValue + "]",
                    $scope.inputQuantifier
                );
            };

            $scope.selectSimpleTool = function (toolType) {
                $scope._selectTool(toolType, $scope.toolsLabel[toolType], $scope.inputQuantifier);
            };

            $scope._selectTool = function (toolType, regexValue, quantifier) {
                quantifier = quantifier || "";
                $scope.availableTools[toolType]--;
                $scope.regexText += regexValue + quantifier;
                $scope.regexElements.push({
                    type: toolType,
                    value: regexValue,
                    quantifier: quantifier
                });
                $scope.updateRegex($scope.regexText);
            };

            $scope.updateRegex = function (regexText) {
                if (regexText.length)
                    try {
                        $scope.regexCompiled = new RegExp(regexText);
                    } catch (e) {
                    }
                else
                    $scope.regexCompiled = null;
                $scope.$emit('regex-update', $scope.regexCompiled);
            };

            $scope.onRawRegexUpdate = function () {
                $scope.resetTools(false);
                $scope.updateRegex($scope.rawRegex);
            };

            $scope.addQuickTool = function (e) {
                $scope.rawRegex += e;
                $scope.updateRegex($scope.rawRegex);
            };

            $scope.resetTools = function (emit) {
                emit = typeof emit == "boolean" ? emit : true;
                $scope.regexText = "";
                $scope.regexElements = [];
                $scope.availableTools = angular.copy($scope.startingTools);
                if (emit)
                    $scope.$emit('regex-update', null);
            };

            var _addModalEventListener = function () {
                $('#input-letter-modal').on('show.bs.modal', function (e) {
                    setTimeout(function () {
                        $('#input-letter').focus();
                    }, 100);
                });
                $('#input-group-modal').on('show.bs.modal', function (e) {
                    setTimeout(function () {
                        $('#input-group').focus();
                    }, 100);
                });
            };

            var _openToolModal = function (modal_id) {
                var $modal = $('#' + modal_id);
                var $radiosQuantifier = $modal.find('input:radio');
                $radiosQuantifier.attr('checked', false);
                $($radiosQuantifier[0]).attr('checked', true);

                var $btnsQuantifier = $modal.find('.btn-quantifier');
                $btnsQuantifier.removeClass('active');
                $($btnsQuantifier[0]).addClass('active');

                $modal.modal('show');
            };

            $scope.inputFilters = {
                letter: function () {
                    $scope.inputValue = $scope.inputValue.toLowerCase().replace(/[^a-z]+/g, '').substr($scope.inputValue.length - 1);
                },
                group: function () {
                    $scope.inputValue = $scope.inputValue.toLowerCase().replace(/[^a-z]+/g, '').substr(0, 5);
                }
            };

            $scope.useToolFunction = {
                letter: $scope.useLetterTool,
                dot: $scope.selectSimpleTool,
                group: $scope.useGroupTool,
                groupNegated: $scope.useGroupTool,
                anchorStart: $scope.selectSimpleTool,
                anchorEnd: $scope.selectSimpleTool,
                or: $scope.selectSimpleTool
            };

            $scope.$on('set-regex-tools', function (event, tools) {
                $scope.startingTools = tools || false;
                _addModalEventListener();
                $scope.resetTools();
            });

            $scope.$on('set-regex-text', function (event, regexText) {
                $scope.rawRegex = regexText;
                $scope.updateRegex($scope.rawRegex);
            });

            $scope.init = function () {
                $scope.iKnowRegexMode = localStorageService.get("iKnowRegexMode");
                var $i = $('#i-know-regex-mode');
                $i.bootstrapSwitch('state', $scope.iKnowRegexMode);
                $i.on('switchChange.bootstrapSwitch', function (event, state) {
                    localStorageService.set("iKnowRegexMode", state);
                    $scope.iKnowRegexMode = state;
                    $scope.$apply();
                });
            };
            $scope.init();
        });
}());