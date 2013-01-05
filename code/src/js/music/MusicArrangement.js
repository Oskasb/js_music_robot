MusicArrangement = function(drummer, rythm) {
    this.rythm = rythm;
    this.drummer = drummer;
};

MusicArrangement.prototype.setArrangementId = function(arrId) {
    this.arrangementId = arrId;
};

MusicArrangement.prototype.getArrangementId = function() {
    return this.arrangementId;
};

MusicArrangement.prototype.getArrangedBar = function(keys, barNr, ident, phaze) {

    var bar = {
        percussion: this.getIdentPercussion(ident, phaze),
        harmony: keys,
        instruments: this.getBarInstruments(ident, phaze)
    };
    return bar;
};

MusicArrangement.prototype.getIdentPercussion = function(ident, phaze) {
    return this.drummer.getArrangedDrumPattern(ident, phaze)
};

MusicArrangement.prototype.getToneInstruments = function(ident, phaze) {
    var riff = music.ENUMS.riffs
    var instruments = {}

    for (tone in music.ENUMS.tones) {
        var arrObj = this.arrangementMap(music.ENUMS.tones[tone], this.getArrangementId());
        var arrdInstrument = {};
        var rythms = {};
        for (notes in arrObj) {
            rythms[notes] = this.rythm.getRiffPattern(arrObj[notes].riff, arrObj[notes].speed, ident, phaze)
        }
        arrdInstrument.rythm = rythms;
        arrdInstrument.octave = arrObj.octave;
        instruments[tone] = arrdInstrument;
    }

    return instruments;
};

MusicArrangement.prototype.getBarInstruments = function(ident, phaze) {
    var instruments =  this.getToneInstruments(ident, phaze);
    return instruments;
};

MusicArrangement.prototype.arrangementMap = function(instrument, arrId) {
    var arr = music.ENUMS.arrangements[arrId];
    var arrangement = music.instrumentRiffMaps.getArrangedInstrumentRiffs(arr, instrument);
    return arrangement;
};



