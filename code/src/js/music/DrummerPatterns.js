DrummerPatterns = function() {
    this.sequences = this.drumSequences();

};

DrummerPatterns.prototype.setSampleList = function(list) {
    console.log(list)
    this.sampleList = list;
//    this.drumModePatterns = this.drumModePatternMap();
};

DrummerPatterns.prototype.getSampleList = function(drum) {
    return this.sampleList[drum];
};

DrummerPatterns.prototype.getLoadedDrummerMode = function() {
    return this.loadedDrummerMode;
};

DrummerPatterns.prototype.loadDrummerMode = function(mode) {
    this.loadedDrummerMode = mode
//    this.updateDrummerPattern();
};

DrummerPatterns.prototype.updateDrummerPattern = function() {
    var pattern = this.drumModePatternMap(music.ENUMS.drumBeats[this.loadedDrummerMode]);
    for (index in music.ENUMS.drums) {
        this.setDrumSequence(music.ENUMS.instruments[index], pattern[music.ENUMS.drumBeats[this.loadedDrummerMode]][index].samples);
        music.musicSequencer.drummer.setDrumBeatPattern(music.ENUMS.instruments[index], pattern[music.ENUMS.drumBeats[this.loadedDrummerMode]][index].beat);
    }
};


DrummerPatterns.prototype.getDrumSample = function(drum, step) {
//    var seq =  this.drumSequences()[drum];
    var seq = this.sequences[drum];

    var seqStep =  step % seq.length;
//    console.log(drum, this.sequences, seqStep ,  step , seq.length)
    return seq[seqStep];
};

DrummerPatterns.prototype.setDrumSequence = function(drum, sequence) {
    return this.sequences[drum] = sequence;
};



DrummerPatterns.prototype.drumSequences = function() {
    var sequences = {};
    sequences[music.ENUMS.instruments.kick]  = {};
    sequences[music.ENUMS.instruments.snare] = {};
    sequences[music.ENUMS.instruments.toms]  = {};
    sequences[music.ENUMS.instruments.hat]   = {};
    sequences[music.ENUMS.instruments.ohs]   = {};
    sequences[music.ENUMS.instruments.perc]  = {};
    return sequences;
};

DrummerPatterns.prototype.drumModePatternMap = function(mode) {
    var map = {};
    map[mode] = this.drumModePattern(mode);
    return map;
};

DrummerPatterns.prototype.buildDrumBarPattern = function(drum, mode) {
    var ident = music.getScore().getBarIdent();
//    console.log("Ident: ", ident, drum, mode)
    var pattern = {
        samples:this.modeSampleMap(mode, drum, ident),
        beat:this.modeBeatMap(mode, drum, ident)
    };
//    console.log(pattern)
    return pattern;
};

DrummerPatterns.prototype.drumModePattern = function(modeId) {
    var mode = {};
    for (index in music.ENUMS.drums) {
        mode[index] = this.buildDrumBarPattern(index, modeId);
    }
    return mode;
};



DrummerPatterns.prototype.modeSampleMap = function(mode, drum, ident) {
//    console.log("BarId", mode, drum, ident)
    var list = this.getSampleList(drum);
    var map = {};
    map[music.ENUMS.drumBeats.introBeat   ] = {
        kick:[
            [list.synth]
        ],
        snare:[
            [list.sidestick]
        ],
        hat:[
            [[list.closed], [list.open], [list.open]]
        ],
        toms:[
            [list.hi]
        ],
        ohs:[
            [list.ridelight], [list.ridelight], [list.ridelight, list.ridebell]
        ],
        perc:[
            [[list.Ts], [list.Sh], [list.Ti], [list.Sc], [list.Sh], [list.Ts], [list.Ti], [list.Sh]],
            [[list.Ti], [list.Sc], [list.Sh], [list.Ts], [list.Ti], [list.Ts], [list.Sh], [list.Sc]]
        ]
    };
    map[music.ENUMS.drumBeats.straight] = {
       kick:[
           [list.fat]
       ],
       snare:[
           [list.dry]
       ],
       hat:[
           [[list.open,     list.bell],   [list.openBell, list.closed], [list.bell, list.closed],     [list.closed, list.openBell]],
           [[list.openBell, list.closed], [list.bell, list.closed],     [list.open,   list.bell],     [list.closed, list.openBell]]
       ],
       toms:[
           [list.hi]
       ],
       ohs:[
           [[list.ridelight], [list.ridebell, list.ridelight], [list.ridelight]],
           [[list.ridelight], [list.ridelight], [list.ridelight, list.ridebell], [list.ridelight]]
       ],
       perc:[
           [list.Tamb]
       ]
    };
    map[music.ENUMS.drumBeats.rockBeat    ] = {

        kick:[
            [list.fat]
        ],
        snare:[
            [list.fat, list.flat, list.fat]
        ],
        hat:[
            [[list.open,     list.bell],   [list.openBell, list.closed], [list.bell, list.closed],     [list.closed, list.openBell]],
            [[list.openBell, list.closed], [list.bell, list.closed],     [list.open,     list.bell],   [list.closed, list.openBell]]
        ],
        toms:[
            [list.hi]
        ],
        ohs:[
            [[list.ridelight], [list.ridebell, list.ridelight], [list.Crash1, list.Crash2], [list.ridelight]],
            [[list.ridelight], [list.ridelight], [list.Crash1], [list.Crash3, list.Crash2]]
        ],
        perc:[
            [list.Tamb]
        ]

    };
    map[music.ENUMS.drumBeats.chillBeat   ] = {
        kick:[
            [list.synth]
        ],
        snare:[
            [list.sidestick]
        ],
        hat:[
            [list.openBell], [list.openBell], [list.openBell]
        ],
        toms:[
            [list.hi]
        ],
        ohs:[
            [list.ridebell], [list.ridebell], [list.Crash1, list.Crash2]
        ],
        perc:[
            [list.Tamb]
        ]
    };
    map[music.ENUMS.drumBeats.metalBeat   ] = {
        kick:[
            [list.rock]
        ],
        snare:[
            [list.ring]
        ],
        hat:[
            [[list.open,     list.bell],   [list.openBell, list.open],   [list.open, list.closed],     [list.closed, list.openBell]],
            [[list.open,   list.closed],   [list.bell, list.closed],     [list.open,     list.bell],   [list.open, list.openBell]]
        ],
        toms:[
            [[list.hi], [list.mid], [list.low], [list.mid], [list.low], [list.low], [list.floor]]
        ],
        ohs:[
            [[list.ridelight], [list.Crash1], [list.ridelight], [list.Crash2]],
            [[list.ridelight], [list.Crash3], [list.ridelight], [list.Crash2, list.Crash1]]
        ],
        perc:[
            [list.Tamb]
        ]
    };
    map[music.ENUMS.drumBeats.elecBeat ] = {
        kick:[
            [list.fat]
        ],
        snare:[
            [list.dry]
        ],
        hat:[
            [[list.closed], [list.closed, list.open], [list.open, list.closed], [list.bell, list.closed]],

            [[list.openBell, list.closed], [list.open, list.closed]]
        ],
        toms:[
            [list.hi]
        ],
        ohs:[
            [[list.ridelight], [list.ridelight], [list.ridelight]],
        ],
        perc:[
            [[list.Ts], [list.Sh], [list.Ti], [list.Sc], [list.Sh], [list.Ts], [list.Ti], [list.Sh]],
            [[list.Ti], [list.Sc], [list.Sh], [list.Ts], [list.Ti], [list.Ts], [list.Sh], [list.Sc]]
        ]
    };
    map[music.ENUMS.drumBeats.indoBeat ] = {
        kick:[
            [list.fat]
        ],
        snare:[
            [list.dry]
        ],
        hat:[
            [[list.bell],   [list.bell],   [list.bell], [list.bell]],

            [[list.bell],   [list.bell],   [list.bell], [list.bell]]
        ],
        toms:[
            [list.hi]
        ],
        ohs:[
            [[list.ridebell], [list.Crash1], [list.Crash3]]
        ],
        perc:[
            [[list.Ts], [list.Sh], [list.Ti], [list.Sc], [list.Sh], [list.Ts], [list.Ti], [list.Sh]],
            [[list.Ti], [list.Sc], [list.Sh], [list.Ts], [list.Ti], [list.Ts], [list.Sh], [list.Sc]]
        ]
    };

    var mapStep = ident % map[mode][drum].length ;
//    console.log("BarId", ident, mapStep, mode, map[mode][drum][mapStep])
    return map[mode][drum][mapStep];
};

// [[list.Ti], [list.Sc], [list.Cp], [list.He], [list.Se], [list.Sp], [list.Sc], [list.Ts]]

DrummerPatterns.prototype.modeBeatMap = function(mode, drum, ident) {
    var map = {};
    map[music.ENUMS.drumBeats.introBeat   ] = {
        kick:[
            {0: {pattern:music.ENUMS.rythmPatterns.D0  , time:1}}
        ],
        snare:[
            {14:{pattern:music.ENUMS.rythmPatterns.D0  , time:1}}
        ],
        hat:[
            {4:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 12:{pattern:music.ENUMS.rythmPatterns.D0  , time:1}}
        ],
        toms:[
            {2:{pattern:null   , time:1}}
        ],
        ohs:[
            {0:{pattern:music.ENUMS.rythmPatterns.Trips, time:0.5}, 9:{pattern:music.ENUMS.rythmPatterns.Trips   , time:1}}
        ],
        perc:[
            {2:{pattern:music.ENUMS.rythmPatterns.Fors, time:0.5 }}
        ]
    };
    map[music.ENUMS.drumBeats.straight] = {
        kick:[
            {0:{pattern:music.ENUMS.rythmPatterns.D1   , time:1}}
        ],
        snare:[
            {4:{pattern:music.ENUMS.rythmPatterns.S1   , time:1}}
        ],
        hat:[
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:2}, 8:{pattern:music.ENUMS.rythmPatterns.H1   , time:2}}
        ],
        toms:[
            {2:{pattern:null   , time:1}}
        ],
        ohs:[
            {0:{pattern:music.ENUMS.rythmPatterns.R1   , time:2 }, 8:{pattern:music.ENUMS.rythmPatterns.R1   , time:2}}
        ],
        perc:[
            {14:{pattern:music.ENUMS.rythmPatterns.Tamb1, time:1 }}
        ]
    };
    map[music.ENUMS.drumBeats.rockBeat    ] = {
        kick:[
            {0:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 7:{pattern:music.ENUMS.rythmPatterns.Dubs, time:1}},
            {0:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 3:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 6:{pattern:music.ENUMS.rythmPatterns.Dubs, time:0.5}},
            {0:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 2:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 7:{pattern:music.ENUMS.rythmPatterns.Dubs, time:1}},
            {0:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 2:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 6:{pattern:music.ENUMS.rythmPatterns.Dubs, time:0.5}}

        ],
        snare:[
            {4:{pattern:music.ENUMS.rythmPatterns.D0   , time:1   }, 12:{pattern:music.ENUMS.rythmPatterns.D0   , time:1   }},
            {4:{pattern:music.ENUMS.rythmPatterns.S1   , time:1   }},
            {4:{pattern:music.ENUMS.rythmPatterns.D0   , time:1   }, 12:{pattern:music.ENUMS.rythmPatterns.D0   , time:1   }},
            {3:{pattern:music.ENUMS.rythmPatterns.S2   , time:1}, 14:{pattern:music.ENUMS.rythmPatterns.D0      , time:2   }}
        ],
        hat:[
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 5:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 9:{pattern:music.ENUMS.rythmPatterns.D0   , time:2},  10:{pattern:music.ENUMS.rythmPatterns.Dubs, time:2}, 14:{pattern:music.ENUMS.rythmPatterns.Trips, time:2}},
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 5:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 9:{pattern:music.ENUMS.rythmPatterns.Dubs , time:4},  10:{pattern:music.ENUMS.rythmPatterns.H1  , time:4}, 14:{pattern:music.ENUMS.rythmPatterns.Dubs,  time:4}},
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 5:{pattern:music.ENUMS.rythmPatterns.Trips, time:1}, 8:{pattern:music.ENUMS.rythmPatterns.Dubs , time:4},  9:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 13:{pattern:music.ENUMS.rythmPatterns.Trips, time:1.5}},
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 5:{pattern:music.ENUMS.rythmPatterns.H1   , time:4}, 9:{pattern:music.ENUMS.rythmPatterns.Dubs , time:2},  13:{pattern:music.ENUMS.rythmPatterns.Trips,  time:2}}

        ],
        toms:[
            {0:{pattern:music.ENUMS.rythmPatterns.null   , time:1}}
        ],
        ohs:[
            {4:{pattern:music.ENUMS.rythmPatterns.D0   , time:2 }, 12:{pattern:music.ENUMS.rythmPatterns.D0   , time:4}   },
            {4:{pattern:music.ENUMS.rythmPatterns.D0   , time:2 }, 12:{pattern:music.ENUMS.rythmPatterns.D0   , time:4}   },
            {4:{pattern:music.ENUMS.rythmPatterns.D0   , time:2 }, 12:{pattern:music.ENUMS.rythmPatterns.D0   , time:4}   },
            {4:{pattern:music.ENUMS.rythmPatterns.S2   , time:1 }}
        ],
        perc:[
            {10:{pattern:music.ENUMS.rythmPatterns.Tamb1, time:1 }}
        ]

    };
    map[music.ENUMS.drumBeats.chillBeat   ] = {
        kick:[
            {0:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}}
        ],
        snare:[
            {4:{pattern:music.ENUMS.rythmPatterns.S1  , time:1}}
        ],
        hat:[
            {6:{pattern:music.ENUMS.rythmPatterns.D0, time:1}}
        ],
        toms:[
            {2:{pattern:null   , time:1}}
        ],
        ohs:[
            {1:{pattern:music.ENUMS.rythmPatterns.Trips, time:1}, 7:{pattern:music.ENUMS.rythmPatterns.Trips   , time:1}, 11:{pattern:music.ENUMS.rythmPatterns.Trips, time:2} }

        ],
        perc:[
            {14:{pattern:music.ENUMS.rythmPatterns.D0, time:1 }}
        ]
    };
    map[music.ENUMS.drumBeats.metalBeat   ] = {
        kick:[
            {0:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 4:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 8:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 12 :{pattern:music.ENUMS.rythmPatterns.D1  , time:4}},
            {0:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 4:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 8:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 12 :{pattern:music.ENUMS.rythmPatterns.Dubs, time:2}   , 14:{pattern:music.ENUMS.rythmPatterns.Trips, time:2}},
            {0:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 4:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 8:{pattern:music.ENUMS.rythmPatterns.D1   , time:4}, 12 :{pattern:music.ENUMS.rythmPatterns.Dubs, time:2}   , 14:{pattern:music.ENUMS.rythmPatterns.Trips, time:2}},
            {0:{pattern:music.ENUMS.rythmPatterns.D0   , time:4}, 1:{pattern:music.ENUMS.rythmPatterns.Trips, time:1}, 4:{pattern:music.ENUMS.rythmPatterns.Trips, time:1}, 9:{pattern:music.ENUMS.rythmPatterns.Trips    , time:1}, 12:{pattern:music.ENUMS.rythmPatterns.D0   , time:4} , 13:{pattern:music.ENUMS.rythmPatterns.Trips, time:2}, 15:{pattern:music.ENUMS.rythmPatterns.D0   , time:4}}
        ],
        snare:[
            {4:{pattern:music.ENUMS.rythmPatterns.S1   , time:1}},
            {4:{pattern:music.ENUMS.rythmPatterns.S3   , time:1}},
            {4:{pattern:music.ENUMS.rythmPatterns.S1   , time:1}},
            {5:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}}

        ],
        hat:[
            {0:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}, 2:{pattern:music.ENUMS.rythmPatterns.H1   , time:1}, 8:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}}

        ],
        toms:[
            {0:{pattern:music.ENUMS.rythmPatterns.null   , time:1}},
            {0:{pattern:music.ENUMS.rythmPatterns.null   , time:1}},
            {0:{pattern:music.ENUMS.rythmPatterns.null   , time:1}},
            {3:{pattern:music.ENUMS.rythmPatterns.D0  , time:1}, 4:{pattern:music.ENUMS.rythmPatterns.D0  , time:1}, 7:{pattern:music.ENUMS.rythmPatterns.Fill1  , time:1}}
        ],
        ohs:[
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:1 }},
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:1 }},
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:1 }},
            {3:{pattern:music.ENUMS.rythmPatterns.S2   , time:1 }}
        ],
        perc:[
            {0:{pattern:music.ENUMS.rythmPatterns.Tamb1, time:1 }}
        ]
    };
    map[music.ENUMS.drumBeats.elecBeat ] = {
        kick:[
            {0: {pattern:music.ENUMS.rythmPatterns.Trips , time:1}, 10:{pattern:music.ENUMS.rythmPatterns.Dubs   , time:1}},
            {0: {pattern:music.ENUMS.rythmPatterns.Dubs  , time:1}, 6: {pattern:music.ENUMS.rythmPatterns.Trips  , time:1}},
            {0: {pattern:music.ENUMS.rythmPatterns.Trips , time:1}, 9: {pattern:music.ENUMS.rythmPatterns.D0     , time:1}},
            {0: {pattern:music.ENUMS.rythmPatterns.Trips , time:1}, 6: {pattern:music.ENUMS.rythmPatterns.Trips  , time:1}}
        ],
        snare:[
            {4:{pattern:music.ENUMS.rythmPatterns.D0   , time:1},  14:{pattern:music.ENUMS.rythmPatterns.D0  , time:1}}
        ],
        hat:[
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:2},   8:{pattern:music.ENUMS.rythmPatterns.H1   , time:2}}
        ],
        toms:[
            {2:{pattern:null   , time:1}}
        ],
        ohs:[
            {0:{pattern:music.ENUMS.rythmPatterns.Trips, time:0.5}, 9:{pattern:music.ENUMS.rythmPatterns.Trips   , time:1}}
        ],
        perc:[
            {0:{pattern:music.ENUMS.rythmPatterns.Eits, time:1 },   8:{pattern:music.ENUMS.rythmPatterns.Eits, time:1 }},
            {0:{pattern:music.ENUMS.rythmPatterns.Fors, time:1 },   4:{pattern:music.ENUMS.rythmPatterns.Eits, time:1 }, 12:{pattern:music.ENUMS.rythmPatterns.Fors, time:1 }}
        ]
    };
    map[music.ENUMS.drumBeats.indoBeat] = {
        kick:[
            {0:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}, 3:{pattern:music.ENUMS.rythmPatterns.D0, time:1}, 6:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}, 9:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}, 11:{pattern:music.ENUMS.rythmPatterns.D0   , time:1}}
        ],
        snare:[
            {4:{pattern:music.ENUMS.rythmPatterns.S1   , time:1}}
        ],
        hat:[
            {0:{pattern:music.ENUMS.rythmPatterns.H1   , time:2}, 8:{pattern:music.ENUMS.rythmPatterns.H1   , time:2}}
        ],
        toms:[
            {2:{pattern:null   , time:1}}
        ],
        ohs:[
            {4:{pattern:music.ENUMS.rythmPatterns.D0   , time:2 }, 12:{pattern:music.ENUMS.rythmPatterns.D0   , time:2}}
        ],
        perc:[
            {0:{pattern:music.ENUMS.rythmPatterns.Eits, time:1 },   8:{pattern:music.ENUMS.rythmPatterns.Eits, time:1 }},
            {0:{pattern:music.ENUMS.rythmPatterns.Fors, time:1 },   4:{pattern:music.ENUMS.rythmPatterns.Eits, time:1 }, 12:{pattern:music.ENUMS.rythmPatterns.Fors, time:1 }}
        ]
    };
    var mapStep = ident % map[mode][drum].length ;
//    console.log("BarId", ident, mapStep, mode, map[mode][drum].length)
    return map[mode][drum][mapStep];
};


