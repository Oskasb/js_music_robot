ChannelCloseupUi = function() {
    this.notesPerBar = 16;
    this.barsInGrid = 1;
    this.octavesInGrid = 3;
    this.keysPerOctave = 12;
};

ChannelCloseupUi.prototype.openChannelCloseup = function(parentElement) {
    this.infoElement = ui.domHandler.createDivElement(parentElement.id, "synth_ui_info", "synth info here", "wave_synth_info")
    this.gridFrame = ui.domHandler.createDivElement(parentElement.id, "synth_ui_grid_frame", "", "wave_synth_grid_frame")
    this.createNoteGrid(this.gridFrame)

    return this;
};


ChannelCloseupUi.prototype.setSelectedInstrument = function(instrument) {
    this.selectedInstrument = instrument;
};

ChannelCloseupUi.prototype.getSelectedInstrument = function(instrument) {
    return this.selectedInstrument;
};



ChannelCloseupUi.prototype.createNoteGrid = function(parentElement) {
    this.gridNotes={
        bar:{
            octave:{
                note: {
                    key: {
                        element:null,
                        keyNote:null
                    }
                }
            }
        }
    };
    this.barFrames = {};
    var line = 1;
    var key = 1;
    for (var i = 0; i < this.barsInGrid; i++) {
        this.barFrames[i] = ui.domHandler.createDivElement(parentElement.id, parentElement.id+"_bar"+i, "", "bar_box")
        this.barFrames[i].style.width = 100/this.barsInGrid+"%";
        this.gridNotes[i] = {}
        for (var j = 0; j < this.octavesInGrid; j++) {
            this.gridNotes[i][j] = {}
            var octaveElem = ui.domHandler.createDivElement(this.barFrames[i].id, this.barFrames[i].id+"_octave"+j, "", "octave_box")
            octaveElem.style.height = 100/this.octavesInGrid+"%";

            for (var k = 0; k < this.notesPerBar; k++) {
                this.gridNotes[i][j][k] = {}
                var noteElem = ui.domHandler.createDivElement(octaveElem.id, octaveElem.id+"_note"+k, "", "note_box")
                noteElem.style.width = 100/this.notesPerBar+"%";
                line = -line;

                noteElem.style.backgroundColor = "rgb("+155+", "+220+ (50*line)+", "+220+ (50*-line)+")";
                for (var l = 0; l < this.keysPerOctave; l++) {

                    key = -key;
                    var keyElem = ui.domHandler.createDivElement(noteElem.id, noteElem.id+"_key"+l, "", "key_box")
                    keyElem.style.height = 100/this.keysPerOctave+"%";

                    //   keyElem.style.backgroundColor = "rgba("+155+", "+220+ (50*key)+", "+220+ (50*key)+", 0.2)";

                    keyElem.keyNote = l;
                    keyElem.octave = j;
                    var hoverFunction = function(e) {
                        music.instrumentCloseupUi.triggerNoteFromUi(e.srcElement.keyNote, e.srcElement.octave, 0.2);
                    };
                    var pressFunction = function(e) {

                        music.instrumentCloseupUi.triggerNoteFromUi(e.srcElement.keyNote, e.srcElement.octave, 1);
                    };

                    keyElem.addEventListener("mousedown", pressFunction, false);
                    keyElem.addEventListener("mouseover", hoverFunction, false);
                    this.gridNotes[i][j][k][l] = {
                        element: keyElem,
                        keyNote: l
                    }
                }


            }

        }

    }


};

ChannelCloseupUi.prototype.triggerNoteFromUi = function(key, octave, velocity) {
    console.log("over Note: k/o: "+key, octave)
    this.triggerNotePlayedFeedback(0, octave, 0, key, velocity)
    octave = this.octavesInGrid - octave;
    key = this.keysPerOctave - (key+1);
    this.triggerInstrumentNote(key, octave, 0.5, velocity);

};

ChannelCloseupUi.prototype.triggerRandomNote = function() {
    var bar = Math.floor(Math.random()*this.barsInGrid);
    var octave = Math.floor(Math.random()*this.octavesInGrid );
    var note = Math.floor(Math.random()*this.notesPerBar );
    var key = Math.floor(Math.random()*this.keysPerOctave );
    this.triggerNotePlayedFeedback(bar, octave, note, key)
    this.triggerInstrumentNote(note, octave, 0.5);
};

ChannelCloseupUi.prototype.triggerNotePlayedFeedback = function(bar, octave, note, key, velocity) {
    var element = this.gridNotes[bar][octave][note][key].element;
    var startColor = element.style.backgroundColor;
    element.className = "key_box key_box_on";

    setTimeout(function() {
        element.className = "key_box";
    }, 1000)

};

ChannelCloseupUi.prototype.triggerInstrumentNote = function(key, octave, duration, velocity) {
    var sequencer = music.musicSequencer;
    var freq = Math.round(music.theory.getFrequencyByOctaveAndKey(octave, key)*100) / 100;
    var instrument = this.getSelectedInstrument();
    var channelId = sequencer.instruments.getInstrumentChannel(instrument);

   sequencer.scheduleNote(instrument, channelId, freq, sequencer.getAudioTime()+0.01, velocity, 1)

//    var source = this.synth.setNote(key, octave, duration, velocity)


    this.infoElement.innerHTML = "Key:"+key+", F:"+freq+", Oct: "+octave;


};

ChannelCloseupUi.prototype.showSelectedInstrumentDetails = function() {
    var sequencer = music.musicSequencer;
    var track = music.mixerUi.getSelectedTrack();
    this.setSelectedInstrument(sequencer.instruments.getInstrumentsByChannel(track)[0])

    console.log("Show Instrument details: ", this.getSelectedInstrument());
};

ChannelCloseupUi.prototype.tick = function() {
    this.showSelectedInstrumentDetails()

};