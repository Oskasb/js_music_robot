MusicSequencer = function() {
    this.tracks = {};
    var rythm = new MusicRythm();
    this.drummer = new MusicDrummer(rythm);
    this.setScore(new MusicScore(new MusicArrangement(this.drummer, rythm)));


    this.beatsPerBar = this.getScore().timeSig[0];

};

MusicSequencer.prototype.loadInstrumentMetadata = function() {
    this.instruments = new Instruments();
    this.instruments.setupInstrumentMap();
};



MusicSequencer.prototype.setScoreNextBarTempo = function(tempo) {
    this.score.setNextBarTempo(tempo);
};

MusicSequencer.prototype.getScoreNextBarTempo = function() {
    return this.score.getNextBarTempo();
};

MusicSequencer.prototype.getScoreTempo = function() {
    return this.score.getTempo();
};

MusicSequencer.prototype.setPushedBarEndTime = function(time) {
    this.pushedBarEndTime = time;
};

MusicSequencer.prototype.getPushedBarEndTime = function() {
    return this.pushedBarEndTime;
};

MusicSequencer.prototype.setPushedBarStartTime = function(time) {
    this.pushedBarStartTime = time;
};

MusicSequencer.prototype.getPushedBarStartTime = function() {
    return this.pushedBarStartTime;
};

MusicSequencer.prototype.setScore = function(score) {
    this.score = score;
};

MusicSequencer.prototype.getScore = function(score) {
    return this.score;
};

MusicSequencer.prototype.getCurrentBarDuration = function() {
    return this.getBarDuration(this.getScoreTempo());
};

MusicSequencer.prototype.getBarDuration = function(tempo) {
    var spb = this.secondsPerBeat(tempo);
    var bpb = this.getScore().timeSig[0];
    return spb*bpb;
};

MusicSequencer.prototype.secondsPerBeat = function(tempo) {
    return 60 / tempo;
};

MusicSequencer.prototype.getScoreTime = function() {
    return this.getAudioTime() - this.sequenceStartTime;
};


MusicSequencer.prototype.getAudioTime = function() {
    return client.soundPlayer.context.currentTime
};

MusicSequencer.prototype.setSequenceStartTime = function(time) {
    this.sequenceStartTime = time;
};
MusicSequencer.prototype.getSequenceStartTime = function() {
    return this.sequenceStartTime;
};

MusicSequencer.prototype.startSequence = function() {
    this.playing = true;
    this.getScore().setBarNr(-1)

    client.soundPlayer.setChannelGain("music", 0.3, 0);

    this.setSequenceStartTime(this.getAudioTime());
    this.setupBar(this.getScoreTime());
};


MusicSequencer.prototype.stopSequence = function() {
    client.soundPlayer.setChannelGain("music", 0, 1);
    this.cancelSequence();
};

MusicSequencer.prototype.cancelSequence = function() {
    this.playing = false;
};

MusicSequencer.prototype.prepareNextSynchronizedBar = function(time) {
        music.musicMix.updateBeatTime(this.secondsPerBeat(this.getScoreNextBarTempo()));
        this.setupBar(time);


};

MusicSequencer.prototype.setupBar = function(scoreTime) {
    this.getScore().notifyBarTriggered(this.getScore().getBarNr());
    var bar = this.getScore().getNextBar(scoreTime)
    this.loadBar(bar, this.getScore().getBarNr(), scoreTime);
};

MusicSequencer.prototype.loadBar = function(bar, nrInSeq, scoreTime) {
    var barStartTime = this.getSequenceStartTime() +scoreTime;
    music.composer.setMode(bar.harmony.mode)
    this.scheduleBar(bar, barStartTime )
};

MusicSequencer.prototype.getBarNoteStartTime = function(note, barStartTime) {
    var noteTime = (note * this.beatsPerBar) / this.getScore().notesPerBar ;
    return barStartTime + (this.secondsPerBeat(this.getScoreTempo())*noteTime);
};

MusicSequencer.prototype.getKeyTransposeValue = function(key) {
    var modeNr = music.composer.getMode();
    var keyShift = music.composer.getKeyOffset();
    var modeHalfStepTransposes = music.theory.modeTransposeMap(modeNr);
    var keyId = music.theory.keyShiftedKeyMap(keyShift).indexOf(key)
    var modeTranspose = modeHalfStepTransposes[keyId];

    var transpose = music.theory.getFrequencyTransposeByHalfStepsAway(keyShift+modeTranspose)

    return transpose;

};



MusicSequencer.prototype.pushHarmonyChordPattern = function(harmony, octave, startNote, chordPattern, instrument, barTime) {
    var barStartTime = barTime
    for(var step in chordPattern) {

        var patternStep = chordPattern[step];

        for (var stepOctave in patternStep) {
            var riffTone = patternStep[stepOctave];
            var beatScaleKeys = riffTone.keys;
            var duration = riffTone.duration * this.secondsPerBeat(this.getScoreNextBarTempo())*4;
            var stepOctaveShift = parseFloat(stepOctave);

            var delayedStart = parseFloat(startNote)+parseFloat(step);
            var noteStartTime = this.getBarNoteStartTime(delayedStart, barStartTime)

            for (var j = 0; j < beatScaleKeys.length; j++) {
                var toneAdd = beatScaleKeys[j]

                var harm = harmony.keys
                var tones = harmony[this.instruments.getInstrumentHarmony(instrument)]
        //        console.log(harm, tones, harmony, this.instruments.getInstrumentHarmony(instrument))

                for (var k = 0; k < harm[0].length; k++) {
                    var sumKey = tones[k][0]+toneAdd
                    var addOctaves = Math.floor(sumKey / 7)+ stepOctaveShift +  tones[1];
                    var remainder = sumKey % 7;
                    var key = remainder // sumKey - (addOctaves*7)
                    var pitchTranspose = this.getKeyTransposeValue(key);

         //           console.log(pitchTranspose, addOctaves, key, stepOctaveShift, tones[1])
                    var mappedHalfStep = music.theory.minorKeyHalfSteps(key);
                    var targetFrequency = music.theory.getFrequencyByOctaveAndKey(octave+addOctaves, mappedHalfStep) * pitchTranspose;
                    var nearestSample = this.instruments.getInstrumentFrequencyNearestSample(instrument, targetFrequency);
                    var env = this.instruments.getInstrumentEnvelope(instrument);

                    var channelId = this.instruments.getInstrumentChannel(instrument);

        //            console.log(targetFrequency, nearestSample, channelId, mappedHalfStep)

                    var sample = nearestSample[0].sample;

                    var pitchAdjust = nearestSample[1];

                    this.streamInstrumentSound(sample, pitchAdjust, noteStartTime, riffTone.velocity, duration, env, channelId);
                    if (nearestSample[0].trig) {

                        this.streamInstrumentSound(nearestSample[0].trig, pitchAdjust, noteStartTime, riffTone.velocity, duration, env, channelId);
                    }

                }
            }
        }
    }
};

MusicSequencer.prototype.pushBarHarmonyInstruments = function(bar, instrument, barStartTime) {
    var barTime = barStartTime;
    var rythm = bar.instruments[instrument].rythm;
    var octave = bar.instruments[instrument].octave;
    for (var i = 0; i < this.getScore().notesPerBar; i++) {
        var startNote = i;
        if (rythm[startNote]) {
            var chordPattern = rythm[startNote];
            var harmony = bar.harmony;
            this.pushHarmonyChordPattern(harmony, octave, startNote , chordPattern, instrument, barTime)
        }
    }
};

MusicSequencer.prototype.pushBarPercussion = function(bar, drum, barStartTime) {

    var duration = 1;
    var rythm = bar.percussion[drum].rythm;

    for (var i = 0; i < this.getScore().notesPerBar; i++) {
        var note = i;
        if (rythm[note]) {

            for (var sequence in rythm[note]) {
            var drumHit = rythm[note][sequence]
                var noteStartTime = this.getBarNoteStartTime(i+parseFloat(sequence), barStartTime)
                for (index in drumHit) {
                     var drumData = this.instruments.getDrum(music.musicSequencer.drummer.getDrumKit(), drum);
                    var sound = drumData.samples[index]
                    var velocity = drumHit[index].velocity;
                    var channelId = drumData.channel;
           //         console.log("stream: ",drumHit, index, drum)
                    this.streamInstrumentSound(sound, 1 ,noteStartTime, velocity, duration, null, channelId)
                }
            }
        }
    }
};

MusicSequencer.prototype.scheduleBar = function(bar, barStartTime) {
//    console.log("BarStartTime = "+barStartTime)

    for (index in bar.instruments) {
        this.pushBarHarmonyInstruments(bar, index, barStartTime)
    }

    for (index in bar.percussion) {
        this.pushBarPercussion(bar, index, barStartTime)
    }

    var now = this.getScoreTime();
    var barTime = this.getBarDuration(this.getScoreTempo());
    var barEndTime = now + barTime;
    var waitTime = barEndTime - barStartTime;

    this.setPushedBarEndTime(barStartTime + barTime - this.sequenceStartTime);
    this.setPushedBarStartTime(barStartTime - this.sequenceStartTime);


};

MusicSequencer.prototype.streamInstrumentSound = function(sound, pitchTranspose, noteStartTime, velocity, duration, env, channelId) {
//    console.log( "Note Start Time = ", noteStartTime)
    var fadeIn = 0;
    client.soundPlayer.playMusic(sound, pitchTranspose, noteStartTime, fadeIn, velocity, duration, env, channelId);
};


MusicSequencer.prototype.updateBarState = function() {
    if (this.playing == false) return;
    var remainingTime = this.getPushedBarEndTime() - this.getScoreTime();
    if (remainingTime < 0.3) {

        var startNextAtTime = this.getPushedBarEndTime();
        this.prepareNextSynchronizedBar(startNextAtTime);
    }


};

MusicSequencer.prototype.tick = function() {
    this.updateBarState();
};
