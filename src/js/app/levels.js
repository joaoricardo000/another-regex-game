window.levelsData = [
    {
        goodWords: ["aaaaaaaaa", "abc", "aaces", "abacate", "amora", "aspargos"],
        badWords: ["sgfgkllgd", "sdhdlfk", "pwutf", "mflsir", "jkf", "fpfkd"],
        startingTools: {
            letter: 9,
            dot: 9,
            group: 9,
            groupNegated: 9,
            anchorStart: 9,
            anchorEnd: 9,
            or: 9
        },
        solution: "a",
        labels: {
            title: "The Test Level"
        },
        modals: {
            start: {
                title: "Title Start",
                subtitle: "subtitle text",
                text: "text"
            },
            finish: {
                title: "Wow!",
                subtitle: "subtitle"
            },
            hints: []
        },
        id: "0"
    },
    {
        goodWords: ["abc", "amora", "macaco", "abacate", "coisa", "aspargos", "taxi"],
        startingTools: {
            letter: 1
        },
        solution: "a",
        labels: {
            title: "The Letter"
        },
        modals: {
            start: {
                title: "Another Regex Game",
                subtitle: "a game about patterns",
                text: "Find out what is unique in all these words and use the available tools on the bottom to create a pattern."
            },
            finish: {
                title: "Nice!",
                subtitle: "master of the letters",
                text: "It will get harder..."
            },
            hints: [
                {
                    title: "Only one letter",
                    subtitle: "",
                    text: "Look better at the words"
                },
                {
                    title: "just A letter",
                    subtitle: "",
                    text: "One letter that is in every word"
                }]
        },
        id: "1"
    },
    {
        goodWords: ["oito", "coisa", "android", "biscoito", "doido", "afoito", "adenoide"],
        badWords: ["lapis", "macaco", "reddit", "amora", "zelda", "ocarina", "ostentar"],
        startingTools: {
            letter: 2
        },
        solution: "oi",
        labels: {
            title: "Avoid the bad"
        },
        modals: {
            start: {
                title: "Left good, right bad",
                subtitle: "match only the first column",
                text: "Figure out what is unique in the good words"
            },
            finish: {
                title: "Good one",
                subtitle: "",
                text: "Not difficult yet.."
            },
            hints: [{
                title: "Two letter pattern",
                subtitle: "",
                text: "Not one, but two letter in sequence!"
            }]
        },
        id: "2"
    },
    {
        goodWords: ["teste", "coisarada", "cabana", "banana", "laptop", "escova"],
        badWords: ["ab", "bc", "xs", "md", "lg", "af"],
        startingTools: {
            dot: 9
        },
        solution: "...",
        labels: {
            title: "The Anything"
        },
        modals: {
            start: {
                title: "Introducing the dot",
                subtitle: ". matches any letter",
                text: "Use the dot to match only the first column"
            },
            finish: {
                title: "Great",
                subtitle: "",
                text: ".... job!"
            },
            hints: [{
                title: "Only two letters in the right",
                subtitle: "",
                text: "Create a pattern to match only three letters or more!"
            }]
        },
        id: "3"
    },
    {
        goodWords: ["aboboreira", "vovozinha", "manolo", "aeroporto", "jocoso", "benevolo"],
        badWords: ["xarope", "livro", "amendoa", "biscoito", "rainha", "fonte"],
        startingTools: {
            letter: 2,
            dot: 1
        },
        solution: "o.o",
        labels: {
            title: "A real pattern"
        },
        modals: {
            start: {
                title: "The first pattern",
                subtitle: "combine your tools",
                text: "Look for a unique pattern in all words on the first column"
            },
            finish: {
                title: "Well done!",
                subtitle: "",
                text: "harder yet?"
            },
            hints: [
                {
                    title: "Three letters pattern",
                    subtitle: "⚆.⚆",
                    text: "You have to use all tools to solve this level"
                },
                {
                    title: "A letter, anything, another letter",
                    subtitle: "",
                    text: "Look for this pattern"
                },
                {
                    title: "X.X",
                    subtitle: "",
                    text: ""
                }]
        },
        id: "4"
    },
    {
        goodWords: ["sabado", "sentir", "bolacha", "estupido", "salgueiro", "biscoito"],
        badWords: ["enfurnar", "grampo", "vivencial", "gotejar", "tony", "lalau"],
        startingTools: {
            group: 1
        },
        solution: "[sb]",
        labels: {
            title: "The group"
        },
        modals: {
            start: {
                title: "Introducing the group [ ]",
                subtitle: "it can be a set of letters",
                text: "[abc] can be, guess what, a or b or c!"
            },
            finish: {
                title: "Cool",
                subtitle: "",
                text: "Calm down, still introducing tools..."
            },
            hints: [
                {
                    title: "Find unique letters",
                    subtitle: "",
                    text: "There are two letters on the good words that are not on the bad words"
                },
                {
                    title: "Keep Looking",
                    subtitle: "",
                    text: "One letter is 's'"
                }]
        },
        id: "5"
    },
    {
        goodWords: ["jurisdicao", "rebarba", "radio", "javanes", "ressabiado", "random"],
        badWords: ["minicamera", "alfazema", "bangladesh", "gotejar", "tony", "advirtamos"],
        startingTools: {
            dot: 1,
            group: 1,
            anchorStart: 1
        },
        solution: "^[jr]",
        labels: {
            title: "The beginning"
        },
        modals: {
            start: {
                title: "Introducing the beginning ^",
                subtitle: "mark the beginning of the word",
                text: "while 'a' will match any word with an 'a' in any position, '^a' will match only the words that starts with 'a'"
            },
            finish: {
                title: "Suberb!",
                subtitle: "",
                text: "running out of encouragement words..."
            },
            hints: [
                {
                    title: "The Anchor Start",
                    subtitle: "^",
                    texts: ["^a", "O - aba ase axx a aaa", "X - ba se xx d tea"]
                },
                {
                    title: "The good words starts with...",
                    subtitle: "check it out!",
                    text: "If it starts with more than one letter (AND IT DOES), you can use the group"
                }]
        },
        id: "6"
    },
    {
        goodWords: ["caramelado", "encefaloide", "notabilidade", "bagda", "tigelada", "racudo"],
        badWords: ["taboao", "veterano", "ritmo", "enfrentar", "amandita", "texas"],
        startingTools: {
            dot: 1,
            letter: 1,
            anchorEnd: 1
        },
        solution: "d.$",
        labels: {
            title: "The end."
        },
        modals: {
            start: {
                title: "Introducing the end $",
                subtitle: "mark the end of the word",
                text: "While 'a' will match any word with an 'a' in any position, 'a$' will match only the words that ends with 'a'"
            },
            finish: {
                title: "You are a good person",
                subtitle: "",
                text: "...right?"
            },
            hints: [
                {
                    title: "The Anchor End",
                    subtitle: "$",
                    texts: ["no$", "O - cano veneno abono", "X - alo bingo test got"]
                },
                {
                    title: "Look for a pattern in the end",
                    subtitle: "maybe it's not the last letter",
                    text: "But, probably, it's really close to the end"
                }]
        },
        id: "7"
    },
    {
        goodWords: ["icq", "ceo", "dai", "joe", "mpb", "fps"],
        badWords: ["inovativo", "meta", "et", "jacare", "iriam", "telejornal"],
        startingTools: {
            letter: 2,
            dot: 8,
            anchorStart: 1,
            anchorEnd: 1
        },
        solution: "^...$",
        labels: {
            title: "Quick recap I"
        },
        modals: {
            start: {
                title: "Exactly three letters",
                subtitle: "how to match only words with three letters",
                texts: ["Do not forget that", ". is any letter", "[ ] is a group", "^ is the beginning", "$ is the end"]
            },
            finish: {
                title: "Great!",
                subtitle: "",
                text: "it's not getting any easier"
            },
            hints: [
                {
                    title: "You already know",
                    subtitle: "",
                    text: "Between the start and the end of the words, there is any three letters"
                }]
        },
        id: "8"
    },
    {
        goodWords: ["flagelo", "niagara", "flagelo", "nuance", "fraude", "nba"],
        badWords: ["abacaxi", "fabular", "xangai", "nutricional", "iriam", "abstinha"],
        startingTools: {
            dot: 1,
            group: 1,
            letter: 1,
            anchorEnd: 1,
            anchorStart: 1
        },
        solution: "^[nf].a",
        labels: {
            title: "Quick recap II"
        },
        modals: {
            start: {
                title: "Let's review",
                subtitle: "Combine the tools you already used",
                texts: ["Do not forget that", ". is any letter", "[ ] is a group", "^ is the beginning", "$ is the end"]
            },
            finish: {
                title: "SHARE THIS WITH TWO FRIENDS TO UNLOCK THE NEXT LEVEL",
                subtitle: "",
                text: "do not click on the button before doing this, please."
            },
            hints: [
                {
                    title: "Do not expect many hints...",
                    subtitle: "",
                    text: ""
                },
                {
                    title: "Keep thinking!",
                    subtitle: "one thing you will use is [nf]",
                    text: ""
                },
                {
                    title: "Take your time",
                    subtitle: "another is 'a'",
                    text: "And that is it, no more hints."
                },
                {
                    title: ":)",
                    subtitle: "",
                    text: ""
                }]
        },
        id: "9"
    },
    {
        goodWords: ["solarizar", "guache", "conterei", "descabia", "fervedura", "puderem", "colegial"],
        badWords: ["azular", "botocudo", "blogagem", "assadura", "autopsiar", "boricado", "artropode"],
        startingTools: {
            dot: 3,
            groupNegated: 1,
            anchorStart: 1,
            anchorEnd: 1
        },
        solution: "^[^ab]",
        labels: {
            title: "The negated group"
        },
        modals: {
            start: {
                title: "Introducing the negated group [^]",
                subtitle: "When it's easier to say what something is not",
                texts: [
                    "The negated group works just like the group, except it's the opposite",
                    "'[^abc]' -> g x d gth kkkkk",
                    "[^abc] will match [def...] got it, right?"
                ]
            },
            finish: {
                title: "( ͡ᵔ ͜ʖ ͡ᵔ )",
                subtitle: "good",
                text: ""
            },
            hints: [
                {
                    title: "Find what is unique on the bad words",
                    subtitle: "",
                    text: "And negate it!"
                }]
        },
        id: "10"
    },
    {
        goodWords: ["agenda", "fachada", "mandioca", "palhoca", "guasca", "descida"],
        badWords: ["pacotaco", "facanha", "visagismo", "palido", "paisana", "gomo"],
        startingTools: {
            letter: 3,
            dot: 1,
            group: 1,
            anchorStart: 1,
            anchorEnd: 1
        },
        solution: "[cd]a$",
        labels: {
            title: "Quick recap III"
        },
        modals: {
            start: {
                title: "Let's review",
                subtitle: "play around with the tools you got",
                texts: ["Do not forget that", ". is any letter", "[ ] is a group", "^ is the beginning", "$ is the end"]
            },
            finish: {
                title: "\\o/",
                subtitle: "yay",
                text: "getting harder..."
            },
            hints: [
                {
                    title: "It's getting harder",
                    subtitle: "a"
                },
                {
                    title: "Keep thinking!",
                    subtitle: "one thing you will use is [cd]"
                }]
        },
        id: "11"
    },
    {
        goodWords: ["pipi", "true", "moais", "oreo", "reto", "ribas"],
        badWords: ["serio", "aco", "tenor", "jacare", "iriam", "pluvial"],
        startingTools: {
            dot: 4,
            letter: 2,
            group: 1,
            anchorStart: 1,
            anchorEnd: 1
        },
        solution: "^....s?$",
        labels: {
            title: "Got quantifier?"
        },
        modals: {
            start: {
                title: "Introducing quantifiers",
                subtitle: "? means that it can be there or not",
                texts: ["a? means 0 or 1 'a'.",
                    "'a?b' -> 'b' 'ab'"]
            },
            finish: {
                title: "⊙▂⊙",
                subtitle: "nice!",
                text: ""
            },
            hints: [
                {
                    title: "It have four letters",
                    subtitle: "",
                    text: "but sometimes, there is one more..."
                }]
        },
        id: "12"
    },
    {
        goodWords: ["abbbbc", "abbbbccc", "abc", "abb", "bbccc", "bb"],
        badWords: ["banana", "cabbaad", "abada", "aabbc", "aaccbbdd", "accdd"],
        startingTools: {
            letter: 3,
            anchorStart: 1,
            anchorEnd: 1
        },
        solution: "^...$",
        labels: {
            title: "The quantifiers"
        },
        modals: {
            start: {
                title: "Introducing quantifiers",
                subtitle: "+ and * means that it can repeat",
                texts: ["a+ means 1 to many",
                    "'a+b' - ab aab aaaab",
                    "a* means 0 to many",
                    "'a*b' - b ab aab aaaab"]
            },
            finish: {
                title: "Got it?",
                subtitle: "",
                text: "if not, feel free to replay some levels"
            },
            hints: [
                {
                    title: "The ? means maybe",
                    subtitle: "It can or can't be there"
                },
                {
                    title: "The +",
                    subtitle: "There is at least one, but can be a lot"
                },
                {
                    title: "The *",
                    subtitle: "Can be any amount at all, zero to many"
                },
                {
                    title: "Check the good words",
                    subtitle: "It always starts with a single 'a'. Or does it?"
                },
                {
                    title: "But there is at least one 'b'",
                    subtitle: ""
                }]
        },
        id: "13"
    },
    {
        goodWords: ["haveis", "sulcar", "hoover", "herege", "legalizar", "horacio", "adamastor"],
        badWords: ["tramela", "macarrao", "carlton", "retinto", "paranaue", "meganha", "cuica"],
        startingTools: {
            letter: 2,
            anchorStart: 1,
            anchorEnd: 1,
            or: 1
        },
        solution: "^h|r$",
        labels: {
            title: "The or "
        },
        modals: {
            start: {
                title: "Introducing the or |",
                subtitle: "when one pattern is not enough",
                texts: [
                    "The '|' allows you to create more than one pattern.",
                    "If does not match the first, keeps testing the others patterns separated by the '|'",
                    "'a | bc' -> asx gra tbce bc a",
                    "'a$ | bc?' -> sxa gra tbce bc bx a"
                ]
            },
            finish: {
                title: "¯\\_(ツ)_/¯",
                subtitle: "That's it.",
                text: ""
            },
            hints: [
                {
                    title: "You have two simple patterns",
                    subtitle: "",
                    text: "check your tools and find the two different patterns on the good words"
                }, {
                    title: "Words starts with h OR ends with r",
                    subtitle: "",
                    text: "Just create this pattern!"
                }]
        },
        id: "14"
    },
    {
        goodWords: ["servo", "produtor", "folheiro", "gringo", "supino", "puderem", "negrito"],
        badWords: ["vacilar", "hebraize", "sumamos", "angariar", "highlander", "abu", "armadura"],
        startingTools: {
            groupNegated: 1,
            anchorStart: 1,
            anchorEnd: 1
        },
        solution: "^[^abc]$",
        labels: {
            title: "The negated group II"
        },
        modals: {
            start: {
                title: "Everything but [^abc]",
                subtitle: "When it's easier says what something is not",
                texts: [
                    "'[^abc]' -> g x d gth kkkkk",
                    "[^abc] will match [def...] got it, right?"
                ]
            },
            finish: {
                title: "(ง°ل͜°)ง",
                subtitle: "hooray!",
                text: ""
            },
            hints: [
                {
                    title: "The pattern is on the bad words",
                    subtitle: "",
                    text: "You have to match everything, but the unique letters on the bad words"
                }, {
                    title: "Find the two unique letters in bad words",
                    subtitle: "",
                    text: "And make sure that the words starts and ends without it!"
                }]
        },
        id: "15"
    },
    {
        goodWords: ["alemanha", "acaraje", "penadinho", "empunhadura", "bandeja", "acanhar", "marinheiro", "molejo", "peleja"],
        badWords: ["alocativo", "rodizio", "satiricamente", "ursao", "fiasco", "xaxim", "yamaha", "itajuba", "depender"],
        startingTools: {
            letter: 3,
            dot: 2,
            groupNegated: 1,
            anchorEnd: 1,
            or: 2
        },
        solution: "nh|j.$",
        labels: {
            title: "Level I"
        },
        modals: {
            start: {
                title: "No more tutorials",
                subtitle: "at least for some time",
                texts: [
                    "I hope you got all tools so far.",
                    "It's all you have now"
                ]
            },
            finish: {
                title: "Bored?",
                subtitle: "",
                text: "press '000' (if on computer...)"
            },
            hints: [
                {
                    title: "Two patterns for all good words!",
                    subtitle: "",
                    text: "look for simple solutions first"
                }, {
                    title: "One pattern is only two letters",
                    subtitle: "",
                    text: ""
                }, {
                    title: "The other is by the end",
                    subtitle: "",
                    text: ""
                }]
        },
        id: "16"
    },
    {
        goodWords: ["flamejar", "diadema", "flame", "fraternal", "frame", "flagelar", "diazepam", "fiavel", "dialetico"],
        badWords: ["filmete", "provem", "baixela", "silveira", "fiadura", "chopeiro", "adware", "rodoanel", "diabolico"],
        startingTools: {
            letter: 3,
            dot: 4,
            group: 1,
            groupNegated: 1,
            anchorStart: 1,
            anchorEnd: 1,
            or: 1
        },
        solution: "^[fd].a.e",
        labels: {
            title: "Level II"
        },
        modals: {
            start: {
                title: "No more tutorials",
                subtitle: "may the force be with you",
                texts: [
                    "... always!"
                ]
            },
            finish: {
                title: "You can create levels",
                subtitle: "#regexgame",
                text: "And share it's url for others to play.."
            },
            hints: []
        },
        id: "17"
    },
    {
        goodWords: ["sorriamos", "sacudais", "sustinhamos", "satanas", "sdds", "sigas", "sortimos", "salsa"],
        badWords: ["lampada", "seres", "baixela", "soutiens", "macaco", "saberieis", "perfume", "salada"],
        startingTools: {
            letter: 3,
            dot: 2,
            group: 1,
            groupNegated: 1,
            anchorStart: 1,
            anchorEnd: 1,
            or: 1
        },
        solution: "^[^be]+s",
        labels: {
            title: "Hungry for regex?"
        },
        modals: {
            start: {
                title: "What's my purpose?",
                subtitle: "",
                text: "you solve regex."
            },
            finish: {
                title: "Check our github project!",
                subtitle: "not now, but sometime...",
                text: ""
            },
            hints: []
        },
        id: "18"
    },
    {
        goodWords: ["guardar", "amante", "entuchar", "notabilidade", "gospels", "concha", "licitude", "barbicha"],
        badWords: ["simetria", "relevar", "retaliativo", "cobri", "bretanha", "retangular", "xongas", "realengo"],
        startingTools: {
            letter: 6,
            dot: 3,
            group: 2,
            groupNegated: 2,
            anchorStart: 1,
            anchorEnd: 1,
            or: 2
        },
        solution: "^g|e$|cha",
        labels: {
            title: "A long one"
        },
        modals: {
            start: {
                title: "Nothing new",
                subtitle: "just a lot o old stuff",
                texts: []
            },
            finish: {
                title: "...",
                subtitle: "(._.) ( l: ) ( .-. ) ( :l ) (._.)",
                text: ""
            },
            hints: [{
                title: "Many solutions for this, keep trying"
            }]
        },
        id: "19"
    },
    {
        goodWords: ["sorti", "roeu", "reserva", "hospital", "errata", "herbicida", "oficina", "sorri", "heresia", "opala"],
        badWords: ["sacrilego", "depreciativo", "intrigar", "drogar", "parmesao", "abstinhas", "bob", "realengo", "antedais", "desferrar"],
        startingTools: {
            letter: 4,
            group: 3,
            dot: 3,
            groupNegated: 1,
            anchorStart: 2,
            anchorEnd: 2,
            or: 2
        },
        solution: "^[horse]+[^horse]+$",
        labels: {
            title: "Horse"
        },
        modals: {
            start: {
                title: "Good Luck",
                subtitle: "There is more than one way to solve this",
                texts: []
            },
            finish: {
                title: "ಠ‿↼",
                subtitle: "super",
                text: ""
            },
            hints: [{
                title: "There is a simple way",
                subtitle: "Hard to spot",
                text: "(the same group used twice)"
            }]
        },
        id: "20"
    }
];