MusicDrummer = function(rythm) {
    this.rythm = rythm;
    this.beatPatterns = this.drumBeatPatterns();

};

MusicDrummer.prototype.setDrumBeatPattern = function(drum, beatPattern) {
    this.beatPatterns[drum] = beatPattern;
};

MusicDrummer.prototype.getDrumBeatPattern = function(drum) {
    return this.beatPatterns[drum];
};

MusicDrummer.prototype.setDrumKit = function(kit) {
    this.kit = kit;
};

MusicDrummer.prototype.getDrumKit = function() {
    return this.kit;
};

MusicDrummer.prototype.getDrummerBeat =function() {
    return music.ENUMS.rythmPatterns.D1;
};

MusicDrummer.prototype.getKickBeatPattern =function() {
    return music.ENUMS.rythmPatterns.D1;
};

MusicDrummer.prototype.buildDrumBar = function(drum) {
    var drumPattern = this.getDrumBeatPattern(drum);
    var pattern = {};
    for (index in drumPattern) {
        var beat = drumPattern[index].pattern;
        var time = drumPattern[index].time;
        pattern[index] = this.rythm.getDrumPattern(drum, beat, time);
    }

    var bar = this.rythm.getNoteRythm(pattern);
    return bar;
};

MusicDrummer.prototype.getArrangedDrumPattern = function(ident, phaze) {
    music.drummerPatterns.updateDrummerPattern();
    var drums = {
        kick: { rythm: this.buildDrumBar(music.ENUMS.instruments.kick)   },
        snare:{ rythm: this.buildDrumBar(music.ENUMS.instruments.snare)  },
        hat:  { rythm: this.buildDrumBar(music.ENUMS.instruments.hat)    },
        ohs:  { rythm: this.buildDrumBar(music.ENUMS.instruments.ohs)    },
        toms: { rythm: this.buildDrumBar(music.ENUMS.instruments.toms)   },
        perc: { rythm: this.buildDrumBar(music.ENUMS.instruments.perc)   }
    };

    return drums;
};

MusicDrummer.prototype.drumBeatPatterns = function() {
    var beatPatterns = {};
    beatPatterns[music.ENUMS.instruments.kick]  = {};
    beatPatterns[music.ENUMS.instruments.snare] = {};
    beatPatterns[music.ENUMS.instruments.toms]  = {};
    beatPatterns[music.ENUMS.instruments.hat]   = {};
    beatPatterns[music.ENUMS.instruments.ohs]   = {};
    beatPatterns[music.ENUMS.instruments.perc]  = {};
    return beatPatterns;
};
