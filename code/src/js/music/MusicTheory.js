MusicTheory = function() {
    this.halfStepsPerOctave = 12;
    this.centerAFrequency = 440;
    this.centerOctave = 4;
    this.centerKey = 0;
    this.twelfthRootOfTwo = 1.059463094359
};

MusicTheory.prototype.getFrequencyByOctaveAndKey = function(octave, key) {
    var halfStepsAway = ((octave*this.halfStepsPerOctave)+key) - ((this.centerOctave*this.halfStepsPerOctave) + this.centerKey);
    var f =  this.centerAFrequency * this.getFrequencyTransposeByHalfStepsAway(halfStepsAway);
    return f;
};

MusicTheory.prototype.getFrequencyTransposeByHalfStepsAway = function(halfStepsAway) {
    return Math.pow(this.twelfthRootOfTwo, halfStepsAway);
};

MusicTheory.prototype.sampleDiffRatio = function(targetF, sourceF) {
    var diffRatio = targetF / sourceF;
    return diffRatio;
};


MusicTheory.prototype.getOffsetKeys = function(offset) {

    var keys = [
        music.ENUMS.amKeys.k1,
        music.ENUMS.amKeys.k2,
        music.ENUMS.amKeys.k3,
        music.ENUMS.amKeys.k4,
        music.ENUMS.amKeys.k5,
        music.ENUMS.amKeys.k6,
        music.ENUMS.amKeys.k7
    ];

    var shiftUp = keys.splice(offset, keys.length - offset);
    shiftUp = shiftUp.concat(keys);
    return shiftUp;
};

MusicTheory.prototype.keyShiftedKeyMap = function(offset) {
    var keys = [
        music.ENUMS.aMap.A,
        music.ENUMS.aMap.B,
        music.ENUMS.aMap.C,
        music.ENUMS.aMap.D,
        music.ENUMS.aMap.E,
        music.ENUMS.aMap.F,
        music.ENUMS.aMap.G
    ];
    var shiftUp = keys.splice(offset, keys.length - offset);
    shiftUp = shiftUp.concat(keys);
    return shiftUp;
};

MusicTheory.prototype.minorKeyHalfSteps = function(key) {
    var map = {
        0:0,
        1:2,
        2:3,
        3:5,
        4:7,
        5:8,
        6:10
    };
    return map[key];
};

MusicTheory.prototype.modeByNrMap = function(modeNr) {
    var map = [
        music.ENUMS.modes.M0,
        music.ENUMS.modes.M1,
        music.ENUMS.modes.M2,
        music.ENUMS.modes.M3,
        music.ENUMS.modes.M4,
        music.ENUMS.modes.M5,
        music.ENUMS.modes.M6,
        music.ENUMS.modes.M7
    ];
    return map[modeNr];
};

MusicTheory.prototype.modeTransposeMap = function(key) {
    // 0 = minor;
    var transposes = {
        0:[0, 0, 0, 0, 0, 0, 0],
        1:[0,-1, 0, 0,-1, 0, 0],
        2:[0, 0, 1, 0, 0, 1, 1],
        3:[0, 0, 0, 0, 0, 1, 0],
        4:[0,-1, 0, 0, 0, 0, 0],
        5:[0,-1, 0, 0,-1, 0, 0],
        6:[0, 0, 1, 0, 0, 1, 0],
        7:[0, 0, 0, 0, 0, 0, 1]
    };
    var transposeKeys = transposes[key];
    return transposeKeys;
};



