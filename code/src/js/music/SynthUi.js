SynthUi = function() {
    this.notesPerBar = 16;
    this.barsInGrid = 1;
    this.octavesInGrid = 3;
    this.keysPerOctave = 12;
};

SynthUi.prototype.openSynth = function(synth, parentElement) {
    this.synth = synth;
    var text = ""
    for (index in synth.node) {
        text += index+": "+synth.node[index]+"<br>";
    }
    this.infoElement = ui.domHandler.createDivElement(parentElement.id, "synth_ui_info", "synth info here", "wave_synth_info")
    this.gridFrame = ui.domHandler.createDivElement(parentElement.id, "synth_ui_grid_frame", "", "wave_synth_grid_frame")
    this.createNoteGrid(this.gridFrame)

};

SynthUi.prototype.createNoteGrid = function(parentElement) {
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
                        music.synthUi.triggerNoteFromUi(e.srcElement.keyNote, e.srcElement.octave, 0.2);
                    };
                    var pressFunction = function(e) {

                        music.synthUi.triggerNoteFromUi(e.srcElement.keyNote, e.srcElement.octave, 1);
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

SynthUi.prototype.triggerNoteFromUi = function(key, octave, velocity) {
    console.log("over Note: k/o: "+key, octave)
    this.triggerNotePlayedFeedback(0, octave, 0, key, velocity)
    octave = this.octavesInGrid - octave;
    key = this.keysPerOctave - (key+1);
    this.triggerSynthNote(key, octave, 0.5, velocity);

};

SynthUi.prototype.triggerRandomNote = function() {
    var bar = Math.floor(Math.random()*this.barsInGrid);
    var octave = Math.floor(Math.random()*this.octavesInGrid );
    var note = Math.floor(Math.random()*this.notesPerBar );
    var key = Math.floor(Math.random()*this.keysPerOctave );
    this.triggerNotePlayedFeedback(bar, octave, note, key)
    this.triggerSynthNote(note, octave, 0.5);
};

SynthUi.prototype.triggerNotePlayedFeedback = function(bar, octave, note, key, velocity) {
    var element = this.gridNotes[bar][octave][note][key].element;
    var startColor = element.style.backgroundColor;
    element.className = "key_box key_box_on";

    setTimeout(function() {
        element.className = "key_box";
    }, 1000)




};

SynthUi.prototype.triggerSynthNote = function(key, octave, duration, velocity) {
   var source = this.synth.setNote(key, octave, duration, velocity)
   var freq = Math.round(source.frequency.value*100) / 100;

    this.infoElement.innerHTML = "Key:"+key+", F:"+freq+", Oct: "+octave;


};

SynthUi.prototype.tick = function() {

};