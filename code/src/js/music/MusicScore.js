MusicScore = function(arrangement) {
    this.musicArrangement = arrangement;
    this.tempo = 120 // BPM
    this.setNextBarTempo(this.tempo);
    this.timeSig = [4, 4];
    this.notesPerBar = 16;
    this.phazeCycles = 4;
    this.barNr = 0;
    this.phraseBar = 0;
};

MusicScore.prototype.getArrangement = function() {
    return this.musicArrangement;
};

MusicScore.prototype.getTempo = function() {
    return this.tempo;
};
MusicScore.prototype.setTempo = function(tempo) {
    this.tempo = tempo;
};

MusicScore.prototype.getNextBarTempo = function() {
    return this.nextBarTempo;
};
MusicScore.prototype.setNextBarTempo = function(tempo) {
    this.nextBarTempo = tempo;
};

MusicScore.prototype.notifyBarTriggered = function(barNr) {
    this.setTempo(this.getNextBarTempo());
    this.upBarNr();
};



MusicScore.prototype.getNextBar = function(scoreTime) {

    var barNr = this.getBarNr();

    this.setBarNr(barNr);
    var barIdent = this.getBarIdent();
    var scorePhaze = this.getScorePhaze();
    this.setPhraseBar(barIdent + (scorePhaze*4));
//    console.log(barNr, barIdent, scorePhaze)
    var keys = this.getPhraseKeys(barIdent, scorePhaze);
    var bar = this.musicArrangement.getArrangedBar(keys, barNr, barIdent, scorePhaze);
    return bar;
};



MusicScore.prototype.upBarNr = function() {
    this.barNr += 1;
};

MusicScore.prototype.setBarNr = function(barNr) {
//    console.log("SetBarNr: ", barNr)
    this.barNr = barNr;
};

MusicScore.prototype.getBarNr = function() {
    return this.barNr;
};

MusicScore.prototype.setPhraseBar = function(bar) {
    this.phraseBar = bar;
};

MusicScore.prototype.getPhraseBar = function() {
    return this.phraseBar;
};

MusicScore.prototype.getScorePhaze = function() {
    return  Math.floor((this.barNr / this.phazeCycles )% this.timeSig[0])  ;
};

MusicScore.prototype.getBarIdent = function() {
    return this.barNr % this.timeSig[0];
};

MusicScore.prototype.setLoadedPhraseId = function(phraseId) {
    this.loadedPhraseId = phraseId;
};

MusicScore.prototype.getLoadedPhraseId = function() {
    return this.loadedPhraseId;
};

MusicScore.prototype.loadPhrase = function(phraseId) {
    this.setLoadedPhraseId(phraseId);
    this.loadedPhrase = music.phraseData.getPhrase(phraseId);
    console.log(this.loadedPhrase, phraseId)
};

MusicScore.prototype.getLoadedPhrase = function() {
    return this.loadedPhrase;
};

MusicScore.prototype.getPhraseKeys = function(ident, phaze) {
    var phrase = this.getLoadedPhrase();

    var phrazeLead = [
        this.getProgression(phrase.lead[0]),
        this.getProgression(phrase.lead[1]),
        this.getProgression(phrase.lead[2]),
        this.getProgression(phrase.lead[3])
    ];

    var phrazeKeys = [
        this.getProgression(phrase.keys[0]),
        this.getProgression(phrase.keys[1]),
        this.getProgression(phrase.keys[2]),
        this.getProgression(phrase.keys[3])
    ];

    if (ident == this.timeSig[0]-1 && phaze == this.timeSig[1]-1) music.musicController.upSection();

    return {lead:[phrazeLead[phaze][ident], phrase.lead[phaze][ident][1]], keys:[phrazeKeys[phaze][ident], phrase.keys[phaze][ident][1]], mode:phrase.mode[phaze][ident]};
};


MusicScore.prototype.getProgression = function(progression) {
    return [
        [music.composer.getMappedKey(progression[0][0])],
        [music.composer.getMappedKey(progression[1][0])],
        [music.composer.getMappedKey(progression[2][0])],
        [music.composer.getMappedKey(progression[3][0])]
    ]
};