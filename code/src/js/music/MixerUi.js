MixerUi = function() {

    this.lastSample = 0;
    this.mixerTracks = {};
    this.analyzerBars = 12;
    this.isVisible = false;
    this.selectedTrack = music.ENUMS.channels.saw;
};
MixerUi.prototype.setupNavigation = function(parent) {
    music.getScore().loadPhrase("posci")
    var navParent = ui.domHandler.createDivElement(parent.id, parent.id+"nav", "", "mixer_navigation");
    var openSynthButton = ui.domHandler.createDivElement(navParent.id, navParent.id+"synth", "track", "mixer_nav_button");
    var openSequencerButton = ui.domHandler.createDivElement(navParent.id, navParent.id+"seq", "seq", "mixer_nav_button");
    var openFXGearButton = ui.domHandler.createDivElement(navParent.id, navParent.id+"fx", "FX", "mixer_nav_button");

    var openInstrument = function() {
        music.mixerUi.activeModule = music.mixerUi.toggleInstrumentCloseupUi(openSynthButton)
    };

    var openSeq = function() {
        music.mixerUi.activeModule = music.mixerUi.toggleSeqUi(openSequencerButton)
    };

    var openFX = function() {
        music.mixerUi.activeModule = music.mixerUi.toggleModuleUi(openFXGearButton, "FX")
    };

    openSequencerButton.addEventListener("click", openSeq, false);
    openSynthButton.addEventListener("click", openInstrument, false);
    openFXGearButton.addEventListener("click", openFX, false);

};

MixerUi.prototype.toggleModuleUi = function(openModuleButton) {
    if (this.moduleParent) {

        ui.domHandler.removeDivElement(this.moduleParent);
        this.activeNavButton.style.borderColor = "#7797ac";
        delete this.moduleParent;
        this.activeModule = null;
        if (this.activeNavButton == openModuleButton)return;
    }
    this.activeNavButton = openModuleButton;
    openModuleButton.style.borderColor = "#def";
    this.moduleParent = ui.domHandler.createDivElement(this.boardParent.id, this.boardParent.id+"moduleParent", "", "mixer_module_parent");
    return music.fxUi.openModule(this.moduleParent)
};

MixerUi.prototype.toggleInstrumentCloseupUi = function(button) {
    if (this.moduleParent) {

        ui.domHandler.removeDivElement(this.moduleParent);
        this.activeNavButton.style.borderColor = "#7797ac";
        delete this.moduleParent;
        this.activeModule = null;
        if (this.activeNavButton == button)return;
    }
    this.activeNavButton = button;
    button.style.borderColor = "#def";
    this.moduleParent = ui.domHandler.createDivElement(this.boardParent.id, this.boardParent.id+"moduleParent", "", "mixer_module_parent");

    return music.instrumentCloseupUi.openChannelCloseup(this.moduleParent)
};

MixerUi.prototype.toggleSeqUi = function(openSequencerButton) {
    if (this.moduleParent) {
        ui.domHandler.removeDivElement(this.moduleParent);
        this.activeNavButton.style.borderColor = "#7797ac";
        delete this.moduleParent;
        this.activeModule = null;
        if (this.activeNavButton == openSequencerButton) return;
    }
    this.activeNavButton = openSequencerButton
    openSequencerButton.style.borderColor = "#def";
    this.moduleParent = ui.domHandler.createDivElement(this.boardParent.id, this.boardParent.id+"moduleParent", "", "mixer_module_parent");
    return music.sequencerUi.openSequencer(this.moduleParent, music.musicSequencer);
};

MixerUi.prototype.setupBoard = function(parent) {
    this.boardParent = parent;
    this.isVisible = true;
    this.setAudioPlayer(client.soundPlayer);
    this.setMusicController(music.musicController)
    var mixerSurface = ui.domHandler.createDivElement(parent.id, parent.id+"mixerBoard", "", "mixer_board");
    var transport = ui.domHandler.createDivElement(parent.id, parent.id+"transport", "", "mixer_transport");
    var navigationParent = this.setupNavigation(parent)
    this.transport = this.setupTransport(transport)
    var tracks = music.musicMix.getTracks();

    this.setupTracks(mixerSurface, tracks);

};

MixerUi.prototype.closeBoard = function(parent) {
    this.isVisible = false;
    setTimeout(function() {
        ui.domHandler.removeDivElement(parent);
    }, 1000)


};

MixerUi.prototype.setAudioPlayer = function(player) {
    this.audioPlayer = player;
};

MixerUi.prototype.setMusicController= function(nusicController) {
    this.musicController = nusicController;
};


MixerUi.prototype.notifyChannelSampleTriggered = function(channel) {
    if (!this.isVisible) return;
    var mixerTracks = this.mixerTracks;
    mixerTracks[channel].trackLabel.style.backgroundColor = "#afa";
    setTimeout(function() {
        mixerTracks[channel].trackLabel.style.backgroundColor = "#363";
    }, 80)

};

MixerUi.prototype.setupTracks = function(parent, tracks) {
    var mixerTracks = this.mixerTracks;
    var tracks = tracks;

    for (index in tracks) {
        mixerTracks[index] = {
            id:index
        };
        var trackId = index;
        var value = tracks[trackId].gainNode.gain.value.toFixed(2);
        mixerTracks[trackId].trackParent = ui.domHandler.createDivElement(parent.id, parent.id+"_"+index, "", "mixer_track")
        var trackParent = mixerTracks[trackId].trackParent;



        var faderParent = this.addChannelVolumeFader(mixerTracks, trackId, value)
        mixerTracks[trackId].trackLabel = ui.domHandler.createDivElement(trackParent.id, trackParent.id+"_label", trackId, "mixer_track_label");
        mixerTracks[trackId].trackLabel.value = trackId;

        var selectTrackFunc = function(e) {
            music.mixerUi.setSelectedTrack(e.srcElement.value)
        };

        ui.addElementClickFunction(mixerTracks[trackId].trackLabel, selectTrackFunc);

        var panSlider = this.addChannelPanSlider(faderParent, mixerTracks, trackId, tracks[trackId].filterNode)


        this.addFXSendControls(trackParent, mixerTracks, trackId)

        this.addFilterControls(mixerTracks, trackId, tracks[trackId].filterNode)
        this.addAnalyzerBars(mixerTracks, trackId);

    }

};

MixerUi.prototype.addFXSendControls = function(parent, mixerTracks, trackId) {
    mixerTracks[trackId].effectSends = {};
    var sendsContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_fx_sends", "", "mixer_track_fx_sends")
    var effectSends = music.musicMix.getEffectSends();
    for (index in effectSends) {
        this.addEffectSend( sendsContainer, mixerTracks, trackId, index)
    }


};

MixerUi.prototype.addEffectSend = function(parent, mixerTracks, trackId, effectId) {
    mixerTracks[trackId].effectSends[effectId] = {};
    mixerTracks[trackId].effectSends[effectId].state = ui.domHandler.createDivElement(parent.id, parent.id+"_"+effectId, effectId, "mixer_track_fx_control")
    mixerTracks[trackId].effectSends[effectId].state.value = {track: trackId, effect:effectId};

    var max = 100;
    var min = 0;
    var value = 50;

    var clickFunction = function(e) {
        trackId = e.srcElement.value.track;
        effectId = e.srcElement.value.effect;

        var trackFx = music.musicMix.getTrackFx(trackId);
        if (trackFx[effectId]) {
            music.musicMix.disconnectTrackFxSend(trackId, effectId)
        } else {
            music.musicMix.connectTrackToFx(trackId, effectId, e.srcElement.slider.value * 0.01)
        }

    };

    ui.addElementClickFunction(mixerTracks[trackId].effectSends[effectId].state, clickFunction);

    var slideFunc = function(track, param, value, max, min) {

        music.musicMix.setTrackFxSendLevel(track, param, value*0.01)
        var pan = music.musicMix.getTrackPan(track)
        console.log("Pan: ", pan, track, param, value, max, min)
    }
    var levelContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_slot"+effectId, "", "mixer_track_fx_slider_container")
    mixerTracks[trackId].effectSends[effectId].state.slider = ui.domHandler.createSliderInputElement(levelContainer.id, levelContainer.id+"_slider", trackId, effectId, value, min, max, slideFunc, "mixer_pan_slider");
    mixerTracks[trackId].effectSends[effectId].level = ui.domHandler.createDivElement(mixerTracks[trackId].effectSends[effectId].state.id, mixerTracks[trackId].effectSends[effectId].state.id+"_sendlevel", "", "mixer_track_fx_level")


};

MixerUi.prototype.addChannelPanSlider = function(parent, mixerTracks, trackId, node) {
    var panContainer = ui.domHandler.createDivElement(parent.id, parent.id+"_panner", "", "mixer_track_pan_container")
    value = music.musicMix.getTrackPan(trackId);
    min = -100;
    max = 100;
    var slideFunc = function(track, param, value, max, min) {
        music.musicMix.setTrackPan(track, value*0.01)
    }

    var inputElem = ui.domHandler.createSliderInputElement(panContainer.id, panContainer.id+"_slider", trackId, "pan", value, min, max, slideFunc, "mixer_pan_slider");

};

MixerUi.prototype.addFilterControls = function(mixerTracks, trackId, node) {
    var trackParent = mixerTracks[trackId].trackParent;
    mixerTracks[trackId].analyzerParent = ui.domHandler.createDivElement(trackParent.id, trackParent.id+"_filter", "", "mixer_filter_parent")
    var filterKnobBox = ui.domHandler.createDivElement(trackParent.id, trackParent.id+"_knob_box", "", "mixer_knob_container")

//   console.log("Filter Node: ", node)

    mixerTracks[trackId].frequency = this.addKnobControl(filterKnobBox, trackId, music.ENUMS.mix.frequency, node.frequency.value, node.frequency.minValue+2350, node.frequency.maxValue)

    mixerTracks[trackId].Q = this.addKnobControl(filterKnobBox, trackId, music.ENUMS.mix.Q, node.Q.value, node.Q.minValue+2.3, node.Q.minValue+30)

};

MixerUi.prototype.addKnobControl = function(filterKnobBox, trackId, name, value, min, max) {
    var knobBase = ui.domHandler.createDivElement(filterKnobBox.id, filterKnobBox.id+"_"+name, "", "mixer_knob_base")
    var knobFeedback = {
        label:ui.domHandler.createDivElement(knobBase.id, knobBase.id+"_label", value, "mixer_fader_value"),
        knob:ui.domHandler.createDivElement(knobBase.id, knobBase.id+"_knob", "!", "mixer_fader_knob")
    };

    var knobBox = ui.domHandler.createDivElement(knobBase.id, knobBase.id+"_base", "", "mixer_knob_box")

    var knobFunction = function(track, param, value, max, min) {
        var remaining = max - value;
        var proportion = (1 - (remaining)/(max));
        value = max * proportion*proportion*proportion;
        music.musicMix.setTrackFilterValue(track, param, value, max, min)
    };

    var inputElem = ui.domHandler.createSliderInputElement(knobBox.id, knobBox.id+"_knobslider", trackId, name, value, min, max, knobFunction, "knob_slider");

    return knobFeedback;

};

MixerUi.prototype.createFaderElements = function(tracksObject, parent, connectionName, value, updateFunc) {
    var faderParent = ui.domHandler.createDivElement(parent.id, parent.id+"_fader", "", "mixer_fader_parent")
    var faderLevelContainer = ui.domHandler.createDivElement(faderParent.id, faderParent.id+"_value", "", "mixer_fader_level_container")
    tracksObject.faderValue = ui.domHandler.createDivElement(faderLevelContainer.id, faderLevelContainer.id+"_value", "", "mixer_fader_level")
    var faderThumbGuide = ui.domHandler.createDivElement(faderParent.id, faderParent.id+"_thumb", "", "mixer_slider_thumb_guide")
    tracksObject.faderThumb = ui.domHandler.createDivElement(faderThumbGuide.id, faderThumbGuide.id+"_guide", "", "mixer_slider_thumb")
    tracksObject.faderThumb.style.bottom = 100*value+"%";
    tracksObject.volumeSlider = ui.domHandler.createSliderInputElement(faderParent.id, faderParent.id+"_slider", connectionName, "volume", value*100, 0, 100, updateFunc, "mixer_slider");
    return faderParent;
}

MixerUi.prototype.addChannelVolumeFader = function(mixerTracks, track, value) {
    var trackParent = mixerTracks[track].trackParent;
    var sliderUpdateFunction = function(trackId, param, value, max) {
        music.musicMix.setTrackGain(trackId, value)
    };
    var faderParent = this.createFaderElements(mixerTracks[track], trackParent, track, value, sliderUpdateFunction);
    return faderParent;
};

MixerUi.prototype.addMasterFader = function(transport, track, value) {
    var trackParent = transport.parent;

    var sliderUpdateFunction = function(trackId, param, value, max) {
        client.soundPlayer.setChannelGain(trackId, value*0.01, 0)
        console.log("TPVolume:", trackId, param, value)

        //    console.log(music.mixerUi.mixerTracks[trackId])

    };
    var faderParent = this.createFaderElements(transport, trackParent, track, value, sliderUpdateFunction);
    return faderParent;
}

MixerUi.prototype.setupTransport = function(parent) {
    var transport = {
        parent:parent,
        master:{}
    };
    this.currentTrack = ui.domHandler.createDivElement(parent.id, parent.id+"_track", "-Track-", "mixer_transport_track_monitor");
    var play = ui.domHandler.createDivElement(parent.id, parent.id+"play", "play", "transport_button");
    var next = ui.domHandler.createDivElement(parent.id, parent.id+"next", "next", "transport_button");
    var stop = ui.domHandler.createDivElement(parent.id, parent.id+"stop", "stop", "transport_button");

    playFunc = function() {
        music.musicController.startLoadedMusicSequence()
    };
    nextFunc = function() {
        music.musicController.pushNextTrackToSequencer()
    };
    stopFunc = function() {
        music.musicController.stopMusicSequence()
    };

    ui.addElementClickFunction(play, playFunc);
    ui.addElementClickFunction(next, nextFunc);
    ui.addElementClickFunction(stop, stopFunc);
    input.touchListener.registerClickableElement(play);
    input.touchListener.registerClickableElement(next);
    input.touchListener.registerClickableElement(stop);

    this.addMasterFader(transport, "music", 0.5);
    return transport;
//    console.log(this.mixerTracks, this.audioPlayer.getTracks())

};

MixerUi.prototype.addAnalyzerBars = function(mixerTracks, trackId) {
    var parent = mixerTracks[trackId].analyzerParent;
    mixerTracks[trackId].bars = {};
    for (var i = 0; i < this.analyzerBars; i++) {
        mixerTracks[trackId].bars[i] = ui.domHandler.createDivElement(parent.id, parent.id+"bar"+i, "", "analyzer_bar");
        mixerTracks[trackId].bars[i].style.left = 100/this.analyzerBars * i+"%";
        mixerTracks[trackId].bars[i].style.width = 2+ (120/this.analyzerBars)+"%";
    }

};

MixerUi.prototype.setSelectedTrack = function(instrument) {
    this.selectedTrack = instrument;
};

MixerUi.prototype.getSelectedTrack = function() {
    return this.selectedTrack;
};


MixerUi.prototype.updateTrackAnalyserFeedback = function(track) {
    var analyzer = music.musicMix.getTracks()[track].analyzerNode;


    // Get the frequency-domain data
    var data = new Uint8Array(analyzer.frequencyBinCount);
//    console.log(analyzer.frequencyBinCount)
    analyzer.getByteFrequencyData(data);


    /*
    var bandSize = [
        2,  4,  5,  6,
        7,  8,  9,  10,
        12, 16, 20, 24,
        28, 32, 36, 40,
        52, 64, 92, 128,
        186, 256, 316, 512]
     */
    var bandSize = [1,  3,  6,  10, 14 ,20 , 26, 40, 64, 128, 256, 342, 1024]

    var volumesum = 0;
    for (var i = 0; i < this.analyzerBars; i++) {
        var bandSum = 0;
        for (var j = 0; j < bandSize[i]; j++) {

            var binData = data[bandSize[i] + j];

            bandSum += binData;
        }
        var average = 0.003 * (bandSum /  bandSize[i]);
        //    this.mixerTracks[track].bars[i].style.backgroundColor = "#"+average+"e"+average*0.5

        this.mixerTracks[track].bars[i].style.webkitTransform = "scale3d(1, "+average+", 1)"
    //    this.mixerTracks[track].bars[i].style.webkitTransform = "translate3d(0, "+50*average+"px, 0)"
        volumesum += average
    }

    var volumesum = Math.min(2 * volumesum / this.analyzerBars, 1)
    music.mixerUi.mixerTracks[track].faderValue.style.webkitTransform = "scale3d(1, "+volumesum+", 1)"


};

MixerUi.prototype.updateTransportVisuals = function() {
    this.transport.faderThumb.style.bottom = client.soundPlayer.getChannelGain("music")*100+"%"
    this.currentTrack.innerHTML = music.musicController.getCurrentTrackId();
};

MixerUi.prototype.showCurrentSelectedTrack = function() {
    if (this.visibleSelectedTrack == this.selectedTrack) return;

    this.mixerTracks[this.selectedTrack].trackLabel.style.color = "#bfb";
    if (this.visibleSelectedTrack) this.mixerTracks[this.visibleSelectedTrack].trackLabel.style.color = "";
    this.visibleSelectedTrack = this.selectedTrack;

};

MixerUi.prototype.updateTrackControlVisuals = function(track) {
    var mixValues = music.musicMix.getTrackMix(track.id);
    track.faderThumb.style.bottom = mixValues.gain*100+"%"


    for (index in mixValues.filter) {
        var proportion = mixValues.filter[index].proportion;
        var turn = 0.32 + (1.84*Math.PI*proportion) + Math.PI
        track[index].knob.style.webkitTransform = "rotate3d(0, 0, 0, "+turn+"rad)";
        track[index].label.innerHTML = Math.round(mixValues.filter[index].value*10) / 10;
    }

    for (index in mixValues.fx) {
        var node = mixValues.fx[index];

        if (node) {
            track.effectSends[index].state.style.backgroundColor = "#18AA4A";
            track.effectSends[index].state.style.color = "#EFFFEE";
            track.effectSends[index].level.style.height = node.gain.value*100+"%";
        } else {

            track.effectSends[index].state.style.backgroundColor = "#141";
            track.effectSends[index].level.style.height = 0+"%";
            track.effectSends[index].state.style.color = "#91c5c5";
        }
    }
};

MixerUi.prototype.updateControlVisuals = function() {
    for (index in this.mixerTracks) {
        this.updateTrackControlVisuals(this.mixerTracks[index]);

    };
    this.showCurrentSelectedTrack();
    this.updateTransportVisuals();
    if (!client.soundPlayer.isPowerful) return;
    for (index in this.mixerTracks) {

        this.updateTrackAnalyserFeedback(index)
    };
};

MixerUi.prototype.tick = function() {
    if (this.isVisible) {
        this.updateControlVisuals();
        if (this.activeModule) this.activeModule.tick();
    }
};