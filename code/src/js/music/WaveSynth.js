/*
 Sine Wave Generator for Web Audio API.
 Currently works on Chrome.

 Mohit Cheppudira - http://0xfe.blogspot.com
 */

/* Create a generator for the given AudioContext. */
WaveSynth = function(context) {
    this.x = 0;
    this.context = context;
    console.log(this.context)
    this.sampleRate = this.context.sampleRate;
    this.frequency = 440;
    this.next_frequency = this.frequency;
    this.amplitude = 0.5;
    this.playing = false;
    this.nr = true; // noise reduction



};

WaveSynth.prototype.setAmplitude = function(amplitude) {
    this.amplitude = amplitude;
};

// Enable/Disable Noise Reduction
WaveSynth.prototype.setNR = function(nr) {
    this.nr = nr;
};

WaveSynth.prototype.setNote = function(key, octave, duration, velocity) {
    var freq = music.theory.getFrequencyByOctaveAndKey(octave, key);
    this.setFrequency(freq)
    var source = this.play(this.next_frequency, duration, velocity)

    return source;
};

WaveSynth.prototype.setFrequency = function(freq) {
    this.next_frequency = freq;

    // Only change the frequency if not currently playing. This
    // is to minimize noise.
    if (!this.playing) this.frequency = freq;
};

WaveSynth.prototype.process = function(e) {
    // Get a reference to the output buffer and fill it up.
    var right = e.outputBuffer.getChannelData(0),
        left = e.outputBuffer.getChannelData(1);

    // We need to be careful about filling up the entire buffer and not
    // overflowing.
    for (var i = 0; i < right.length; ++i) {
        right[i] = left[i] = this.amplitude * Math.sin(
            this.x++ / (this.sampleRate / (this.frequency * 2 * Math.PI)));

        // A vile low-pass-filter approximation begins here.
        //
        // This reduces high-frequency blips while switching frequencies. It works
        // by waiting for the sine wave to hit 0 (on it's way to positive territory)
        // before switching frequencies.
        if (this.next_frequency != this.frequency) {
            if (this.nr) {
                // Figure out what the next point is.
                next_data = this.amplitude * Math.sin(
                    this.x / (this.sampleRate / (this.frequency * 2 * Math.PI)));

                // If the current point approximates 0, and the direction is positive,
                // switch frequencies.
                if (right[i] < 0.001 && right[i] > -0.001 && right[i] < next_data) {
                    this.frequency = this.next_frequency;
                    this.x = 0;
                }
            } else {
                this.frequency = this.next_frequency;
                this.x = 0;
            }
        }
    }
};

WaveSynth.prototype.play = function(frequency, duration, velocity) {
    // Create an audio node for the tone generator
    var velocity = velocity;

    var gainNode = this.context.createGainNode();
    gainNode.gain.value = 0;

    music.musicMix.connectNodeToMixTrack(gainNode, music.ENUMS.channels.ws)

    var source = this.context.createOscillator(0, 1, 1);
    source.frequency.value = frequency;
    source.connect(gainNode);


    var now = this.context.currentTime
    gainNode.gain.linearRampToValueAtTime(0 , now)
    music.triggerEvent(music.EVENT.PLAY_CHANNEL_SOUND, music.ENUMS.channels.ws)
    source.noteOn(0)
    gainNode.gain.linearRampToValueAtTime(0.9 * velocity, now+0.001)

    setTimeout(function(){
        gainNode.gain.linearRampToValueAtTime(0.2*velocity, now+0.5)
    }(now+0.4)*1000);

    setTimeout(function(){
        gainNode.gain.linearRampToValueAtTime(0, now+1.2)

    }(now+duration+1.4)*1000);


    source.noteOff(now+duration+1.2)

    return source;
};

WaveSynth.prototype.pause = function() {
    // Unplug the node.

//    this.node.disconnect();
    this.playing = false;
};