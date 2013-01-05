SequencerUi = function() {

};

SequencerUi.prototype.resetSequencerUi = function() {
    this.visibleKeyOffset = null;
    this.visibleModeOffset = null;
    this.lastPhrase = 15;
    this.lastSection = 3;
};

SequencerUi.prototype.openSequencer = function(parentElement, sequencer) {
    this.sequencer = sequencer;
    this.resetSequencerUi()
    parentElement.innerHTML = "Sequencer";
    this.addKeyOffsetControls(parentElement);
    this.addTempoControls(parentElement);
    this.addArrSetters(parentElement);
    this.addDrumBeatsSetters(parentElement);
    this.addMixSetters(parentElement);
    this.addPhraseSetters(parentElement);
    this.addPhaseBarFeedback(parentElement);
    this.addTrackConfigFeedback(parentElement);
    return this;
};

SequencerUi.prototype.addTrackConfigFeedback = function(parent) {
    this.sectionLights = [];
    this.sectionPhrase = [];
    this.sectionBeat = [];
    this.sectionStyle = [];
    this.sectionMix = [];
    var configContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_track_conf", "", "sequencer_track_config_container");
    for (var i = -1; i < music.musicController.trackSections; i++) {
        var trackStep = ui.domHandler.createDivElement(configContainer.id, configContainer.id+"_step"+i, ""+i, "sequencer_phrase_bar_container");
        trackStep.style.width = "19%";
        this.sectionLights[i] = ui.domHandler.createDivElement(trackStep.id, trackStep.id+"_light"+i, "tempo", "sequencer_phrase_light");
        this.sectionBeat[i] = ui.domHandler.createDivElement(trackStep.id, trackStep.id+"_beat"+i, "beat", "sequencer_phrase_mode");
        this.sectionMix[i] = ui.domHandler.createDivElement(trackStep.id, trackStep.id+"_mix"+i, "mix", "sequencer_phrase_lead");
        this.sectionStyle[i] = ui.domHandler.createDivElement(trackStep.id, trackStep.id+"_style"+i, "style", "sequencer_phrase_key");
        this.sectionPhrase[i] = ui.domHandler.createDivElement(trackStep.id, trackStep.id+"_tempo"+i, "phrase", "sequencer_phrase_octave");
    };

};

SequencerUi.prototype.addPhaseBarFeedback = function(parent) {
    this.phraseLights = [];
    this.phraseOctaves = [];
    this.phraseModes = [];
    this.phraseKeys = [];
    this.phraseLead = [];

    var phrasesLightContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_phrase_lights", "", "sequencer_phrase_structure_container");
    for (var i = -1; i < music.getScore().notesPerBar; i++) {
        var phraseStep = ui.domHandler.createDivElement(phrasesLightContainer.id, phrasesLightContainer.id+"_bar"+i, ""+i, "sequencer_phrase_bar_container");
        this.phraseLights[i] = ui.domHandler.createDivElement(phraseStep.id, phraseStep.id+"_light"+i, "", "sequencer_phrase_light");
    //    this.phraseOctaves[i] = ui.domHandler.createDivElement(phraseStep.id, phraseStep.id+"_octave"+i, "oct", "sequencer_phrase_octave");
        this.phraseModes[i] = ui.domHandler.createDivElement(phraseStep.id, phraseStep.id+"_mode"+i, "mode", "sequencer_phrase_mode");
        this.phraseKeys[i] = ui.domHandler.createDivElement(phraseStep.id, phraseStep.id+"_key"+i, "key", "sequencer_phrase_key");
        this.phraseLead[i] = ui.domHandler.createDivElement(phraseStep.id, phraseStep.id+"_lead"+i, "lead", "sequencer_phrase_lead");

    };

};

SequencerUi.prototype.addDrumBeatsSetters = function(parent) {
    this.drumBeatSelectionButtons = {};
    var modeSelectionContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_drum_mode", "", "sequencer_control_parent");
    modeSelectionContainer.style.left = "53%";
    var drumBeatsLabel = ui.domHandler.createDivElement(modeSelectionContainer.id, modeSelectionContainer.id+"_label", "Drum Beats", "sequencer_control_label");
    for (index in music.ENUMS.drumBeats) {
        var clickFunc = function(e) {
            music.drummerController.setDrummerMode(e.srcElement.value)
        };
        this.drumBeatSelectionButtons[index] = this.addSelectionButton(modeSelectionContainer, music.ENUMS.drumBeats[index] ,index, clickFunc);
    };
};

SequencerUi.prototype.addPhraseSetters = function(parent) {
    this.phraseSelectionButtons = {};
    var phrasesContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_phrases", "", "sequencer_control_parent");
    phrasesContainer.style.left = "34%";
    var phrasesLabel = ui.domHandler.createDivElement(phrasesContainer.id, phrasesContainer.id+"_label", "Phrases", "sequencer_control_label");
    for (index in music.ENUMS.phrases) {
        var clickFunc = function(e) {
            music.getScore().loadPhrase(e.srcElement.value)
        };
        this.phraseSelectionButtons[index] = this.addSelectionButton(phrasesContainer, music.ENUMS.phrases[index] ,index, clickFunc);
    };
};

SequencerUi.prototype.addMixSetters = function(parent) {
    this.mixSelectionButtons = {};
    var mixesContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_mixes", "", "sequencer_control_parent");
    mixesContainer.style.left = "15%";
    var mixesLabel = ui.domHandler.createDivElement(mixesContainer.id, mixesContainer.id+"_label", "Mixes", "sequencer_control_label");
    for (index in music.ENUMS.mixes) {
        var clickFunc = function(e) {
            music.musicMix.loadMix(e.srcElement.value)
        };
        this.mixSelectionButtons[index] = this.addSelectionButton(mixesContainer,  music.ENUMS.mixes[index] ,index, clickFunc);
    };
};

SequencerUi.prototype.addArrSetters = function(parent) {
    this.arrSelectionButtons = {};
    var arrContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_arrs", "", "sequencer_control_parent");
    arrContainer.style.left = "75%";
    var arrLabel = ui.domHandler.createDivElement(arrContainer.id, arrContainer.id+"_label", "Style", "sequencer_control_label");
    for (index in music.ENUMS.arrangements) {
        var clickFunc = function(e) {
            music.setArrId(e.srcElement.value)
        };
        this.arrSelectionButtons[index] = this.addSelectionButton(arrContainer,  music.ENUMS.arrangements[index] ,index, clickFunc);
    };
};


SequencerUi.prototype.addSelectionButton = function(parent, name, value, clickFunc) {
    console.log("Add mix selection: "+name, value)
    var button = ui.domHandler.createDivElement(parent.id, parent.id+"_button_"+value, name, "sequencer_select_button");
    button.value = value;
    ui.addElementClickFunction(button, clickFunc);
    return button;
};


SequencerUi.prototype.addKeyOffsetControls = function(parent) {
//    var container = ui.domHandler.createDivElement(parent.id, parent.id+"_transpose", "", "sequencer_offsets_parent")
    var transposeControlContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_transpose", "", "sequencer_transpose_button_parent")
    var transposeControlLabel = ui.domHandler.createDivElement(transposeControlContainer.id, transposeControlContainer.id+"_label", "trsp", "sequencer_control_label")
    var modeControlContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_mode", "", "sequencer_mode_button_parent")
    var modeControlLabel = ui.domHandler.createDivElement(modeControlContainer.id, modeControlContainer.id+"_label", "mode", "sequencer_control_label")

    this.offsetKeyButtons = {};
    this.offsetModeButtons = {};

    for (var i = 6; i > -6; i--) {
        var keyButton = ui.domHandler.createDivElement(transposeControlContainer.id, transposeControlContainer.id+"_button_"+i, "K:"+i, "sequencer_offset_ctrl_button")
        keyButton.value = i;
        var keyFunc = function(e) {
            music.composer.setKeyOffset(e.srcElement.value);
        };
        ui.addElementClickFunction(keyButton, keyFunc);
        this.offsetKeyButtons[""+i+""] = keyButton;
    }
    var mode = 0;
    for (index in music.ENUMS.modes) {
        var modeName = music.ENUMS.modes[index]
        var modeButton = ui.domHandler.createDivElement(modeControlContainer.id, modeControlContainer.id+"_button_"+index, modeName, "sequencer_offset_ctrl_button")
        modeButton.value = mode;

        var modeFunc = function(e) {
            music.composer.setMode(e.srcElement.value);
        };
        mode += 1;
        ui.addElementClickFunction(modeButton, modeFunc);
        this.offsetModeButtons[modeName] = modeButton;
    }


};

SequencerUi.prototype.addTempoControls = function(parent) {
    var value = this.sequencer.getScoreTempo();
    var tempoControlContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_tempo", "", "sequencer_tempo_controls_parent");

    var tempoControlLabel = ui.domHandler.createDivElement(tempoControlContainer.id, tempoControlContainer.id+"_label", "tempo", "sequencer_control_label");

    var currentTempoLabel = ui.domHandler.createDivElement(tempoControlContainer.id, tempoControlContainer.id+"_current", "current", "sequencer_tempo_value");
    var nextTempoLabel = ui.domHandler.createDivElement(tempoControlContainer.id, tempoControlContainer.id+"_next", "next", "sequencer_tempo_value");
    currentTempoLabel.style.right = 2+"%";
    nextTempoLabel.style.left = 2+"%";

    this.currentBarTempo = ui.domHandler.createDivElement(currentTempoLabel.id, currentTempoLabel.id+"_current_value", value, "sequencer_control_label");
    this.nextBarTempo = ui.domHandler.createDivElement(nextTempoLabel.id, nextTempoLabel.id+"_current_value", value, "sequencer_control_label");



    var sliderUpdateFunction = function(trackId, param, value, max) {
        music.musicSequencer.setScoreNextBarTempo(value);

    };

    var tempoControlSlider = ui.domHandler.createSliderInputElement(tempoControlContainer.id, tempoControlContainer.id+"_slider", "TempoSlider", "tempo", value, 50, 180, sliderUpdateFunction, "sequencer_tempo_slider");

    var barProgressContainer = ui.domHandler.createDivElement(tempoControlContainer.id, tempoControlContainer.id+"_progress", "progress", "sequencer_bar_progress_container");
    this.barProgressBar = ui.domHandler.createDivElement(barProgressContainer.id, barProgressContainer.id+"_bar", "", "sequencer_progress_bar");

};

SequencerUi.prototype.showLoadedTrackConfig = function() {
    var trackData = music.musicController.getTrackConfiguration(music.musicController.getCurrentTrackId());
    this.showCurrentSection();

    for (var i = 0; i < music.musicController.trackSections; i++) {
        this.sectionPhrase[i].innerHTML = music.musicController.sectionAdjust(i, trackData.phrase);
        this.sectionBeat[i].innerHTML = music.musicController.sectionAdjust(i, trackData.beat);
        this.sectionStyle[i].innerHTML = music.musicController.sectionAdjust(i, trackData.style);
        this.sectionMix[i].innerHTML = music.musicController.sectionAdjust(i, trackData.mix);
        this.sectionLights[i].innerHTML = music.musicController.sectionAdjust(i, trackData.tempo);
    }
};

SequencerUi.prototype.showCurrentSection = function() {
    var lastSection = music.musicController.getSection();
//    console.log(this.lastSection, this.sectionLights, lastSection)
    if (this.lastSection == lastSection) return;
    this.sectionLights[this.lastSection].className = "sequencer_phrase_light";
    this.sectionLights[lastSection].className = "sequencer_phrase_light sequencer_light_on";
    this.lastSection = lastSection;
};

SequencerUi.prototype.showCurrentPhraseBar = function() {
    var lastBar = music.getScore().getPhraseBar();
    if (this.lastPhrase == lastBar) return;
    this.phraseLights[this.lastPhrase].className = "sequencer_phrase_light";
    this.phraseLights[lastBar].className = "sequencer_phrase_light sequencer_light_on";
    this.lastPhrase = lastBar;
};

SequencerUi.prototype.showCurrentLoadedPhrase = function() {
    var currentLoadedPhrase = music.getScore().getLoadedPhraseId();
    this.showCurrentPhraseBar()
    if (this.currentLoadedPhrase == currentLoadedPhrase) return;
    console.log("Switch mix button ", currentLoadedPhrase, this.phraseSelectionButtons)
    this.switchActiveButtonVisuals(this.phraseSelectionButtons[currentLoadedPhrase], this.phraseSelectionButtons[this.currentLoadedPhrase])
    this.currentLoadedPhrase = currentLoadedPhrase;

    var loadedPhrase = music.getScore().getLoadedPhrase();
  //  var phaze = music.getScore().getScorePhaze();
  //  var ident = music.getScore().getBarIdent();
    for (var i = 0; i <  loadedPhrase.keys.length; i++) {
        var phaze = i;
        for (var j = 0; j <  loadedPhrase.keys[phaze].length; j++) {
            var step = i*4 +j
        //    this.phraseOctaves[step].innerHTML = loadedPhrase.octs[phaze][j];
            this.phraseModes[step].innerHTML = music.theory.modeByNrMap(loadedPhrase.mode[phaze][j]);
            this.phraseKeys[step].innerHTML = loadedPhrase.keys[phaze][j];
            this.phraseLead[step].innerHTML = loadedPhrase.lead[phaze][j];
        }
    }
};



SequencerUi.prototype.showCurrentLoadedMix = function() {
    var currentLoadedMix = music.musicMix.getCurrentMixId();
    if (this.currentLoadedMix == currentLoadedMix) return;
    this.switchActiveButtonVisuals(this.mixSelectionButtons[currentLoadedMix], this.mixSelectionButtons[this.currentLoadedMix])
    this.currentLoadedMix = currentLoadedMix;
};

SequencerUi.prototype.showCurrentLoadedBeat = function() {
    var currentLoadedBeat = music.drummerController.getDrummerMode();
    if (this.currentLoadedBeat == currentLoadedBeat) return;
    this.switchActiveButtonVisuals(this.drumBeatSelectionButtons[currentLoadedBeat], this.drumBeatSelectionButtons[this.currentLoadedBeat])
    this.currentLoadedBeat = currentLoadedBeat;
};

SequencerUi.prototype.showCurrentLoadedArr = function() {
    var currentLoadedArr = music.getArrId();
    if (this.currentLoadedArr == currentLoadedArr) return;
    this.switchActiveButtonVisuals(this.arrSelectionButtons[currentLoadedArr], this.arrSelectionButtons[this.currentLoadedArr])
    this.currentLoadedArr = currentLoadedArr;
};

SequencerUi.prototype.showCurrentTempo = function() {
    this.currentBarTempo.innerHTML = this.sequencer.getScoreTempo();
    this.nextBarTempo.innerHTML = music.musicSequencer.getScoreNextBarTempo();
    if (!this.sequencer.playing) return;
    var barStartTime = this.sequencer.getPushedBarStartTime();
    var endTime = this.sequencer.getPushedBarEndTime();
    var currentTime = this.sequencer.getScoreTime();
    var progress = (currentTime - barStartTime) / (endTime - barStartTime);
    this.barProgressBar.style.width = progress*100+"%"
};

SequencerUi.prototype.showKeyOffset = function(offset) {
    if (this.visibleKeyOffset == offset) return;
    this.switchActiveButtonVisuals(this.offsetKeyButtons[offset], this.offsetKeyButtons[this.visibleKeyOffset])
    this.visibleKeyOffset = offset;
};

SequencerUi.prototype.switchActiveButtonVisuals = function(onButton, offButton) {
    if (offButton) {
        offButton.style.boxShadow = "0px 0px 3px #000";
        offButton.style.color = "#726354"
        offButton.style.backgroundColor = "#CDD7DB"
    }

    onButton.style.boxShadow = "0px 0px 3px #def";
    onButton.style.color = "#FC8441"
    onButton.style.backgroundColor = "#FFFAD5"
}

SequencerUi.prototype.showModeOffset = function(offset) {
    if (this.visibleModeOffset == offset) return;
    this.switchActiveButtonVisuals(this.offsetModeButtons[music.theory.modeByNrMap(offset)], this.offsetModeButtons[music.theory.modeByNrMap(this.visibleModeOffset)]);
    this.visibleModeOffset = offset;
};

SequencerUi.prototype.updateSequencerFeedback = function() {
    this.showKeyOffset(music.composer.getKeyOffset());
    this.showModeOffset(music.composer.getMode());
    this.showCurrentTempo();
    this.showCurrentLoadedMix();
    this.showCurrentLoadedPhrase();
    this.showCurrentLoadedBeat();
    this.showCurrentLoadedArr();
    this.showLoadedTrackConfig();
};

SequencerUi.prototype.tick = function() {
    this.updateSequencerFeedback();

};