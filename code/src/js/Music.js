Music = function() {
    this.EVENT = this.eventList();
};

Music.prototype.initScript = function() {
    this.ENUMS = new MusicEnums();
    this.musicController = new MusicController();
    this.musicSequencer = new MusicSequencer();
    this.mixerUi = new MixerUi();
    this.instrumentCloseupUi = new ChannelCloseupUi();
    this.sequencerUi = new SequencerUi();
    this.composer = new Composer();
    this.theory = new MusicTheory();
    this.mixData = new MixData();
    this.phraseData = new PhraseData();
    this.riffPatterns = new RiffPatterns();
    this.musicMix = new MusicMix();
    this.musicSequencer.loadInstrumentMetadata();
    this.fxUi = new FxUi();
    this.drummerPatterns = new DrummerPatterns();
    this.drummerController = new DrummerController();
    this.instrumentRiffMaps = new InstrumentRiffMaps();
    this.musicController.loadScoreTracks();
};

Music.prototype.buildMusicUi = function(parent) {
    parent.style.top = "0px";
    parent.style.left = "0px";
    parent.style.right = "0px";
    parent.style.bottom = "0px";
    var rootElement = ui.domHandler.createDivElement(parent.id, "mixer_frame", "", "mixer_parent")
    this.mixerUi.setupBoard(rootElement);
};

Music.prototype.getScore = function() {
    return this.musicSequencer.getScore();
};

Music.prototype.setArrId = function(id) {
    this.getScore().getArrangement().setArrangementId(id);
};

Music.prototype.getArrId = function() {
    return this.getScore().getArrangement().getArrangementId();
};


Music.prototype.triggerEvent = function(event, value) {
    event(value);
};

Music.prototype.addEventListener = function(event, handler) {

};

Music.prototype.triggerPlaySound = function(sound) {
    music.mixerUi.notifyChannelSampleTriggered(sound)
}

Music.prototype.eventList = function() {
    var PLAY_CHANNEL_SOUND = this.triggerPlaySound;

    var eventList = {
        PLAY_CHANNEL_SOUND:PLAY_CHANNEL_SOUND
    };
    return eventList;
};

Music.prototype.tick = function() {
    this.musicSequencer.tick();
    this.mixerUi.tick();
}