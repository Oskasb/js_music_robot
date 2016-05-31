webAudioPlayer = function() {
    this.playingMusicSources = {};
    this.waveSynths = {};
    this.loops = {};
    this.effects = {};
    this.isPowerful = true // this.checkClientPower();
    this.tracks = {}
};

webAudioPlayer.prototype.getTracks = function() {
    return this.tracks;
};

webAudioPlayer.prototype.checkClientPower = function() {
    if (client.getDeviceProperties().DeviceType == "iPad" || client.getDeviceProperties().DeviceType == "iPhone") {
        return false;
    } else {
        return false;
        return true;
    }
};

webAudioPlayer.prototype.setupPlayer = function(context, sounds) {
    this.context = context;
    this.sounds = sounds;
    this.setupChannels();
    this.setupMusicTracks();
    this.createWaveSynth(music.ENUMS.instruments.ws);
    if (this.isPowerful) {
        this.setupEffects();
    }
};

webAudioPlayer.prototype.playAmbientSound = function(id) {
    console.log("Play Ambient: "+id)
    if (this.loops[id]) {
        this.loops[id].start(0)
    } else {
        this.playSound(id)
    }
    return id;
};

webAudioPlayer.prototype.stopAmbientSound = function(id) {
    var now = this.context.currentTime;
    var release = 0.1;
    if (!this.loops[id]) {
        alert("id: "+id+" is not a loop, cant stop")
        return
    }
    var source = this.loops[id]
    source.gain.linearRampToValueAtTime( 0, now+release);
    source.stop( now+release+release);
    delete this.loops[id];
};

webAudioPlayer.prototype.playMusic = function(id, pitchTranspose, time, fadeIn, velocity, duration, env, channelId) {
    var now = this.context.currentTime;
//    console.log(id, this.sounds)
    var opts = this.sounds[id].data.options;

    var source = this.playSound(id, time);
    var channel = music.musicMix.getTrack(channelId).filterNode;

    source.gainNode.connect(channel);
    source.start(time)
    source.playbackRate.value = pitchTranspose;
    source.gain.linearRampToValueAtTime( 0,  now);

    if (opts.grain) {
        fadeIn = env.a;
        var release = env.r;

        setTimeout(function() {
            source.gain.linearRampToValueAtTime( 0, time + duration+release);
            source.stop(time + duration+release)
        }, (time - now + duration)*1000);

    }

    source.gain.linearRampToValueAtTime(velocity, time+ fadeIn );



    if(client.soundPlayer.isPowerful == true) {
        setTimeout(function() {
           music.triggerEvent(music.EVENT.PLAY_CHANNEL_SOUND, channelId)
        }, (time-now)*1000)
    }

    return id;
};

webAudioPlayer.prototype.stopMusic = function(id, time) {

    if (!this.playingMusicSources[id]) return
    var now = this.context.currentTime;
    console.log("Stop Music: "+id)
    this.playingMusicSources[id].gain.linearRampToValueAtTime( 0,  time  )
    var instance = this;
    setTimeout(function() {
        instance.playingMusicSources[id].stop(0);
        instance.stopAmbientSound(id);
        delete instance.playingMusicSources[id];
    }, time*1010);
};

webAudioPlayer.prototype.playSound = function(id, time) {
//    console.log("---->>>playTime: " +id, time)
    if (!time) time = 0;
    var source = this.context.createBufferSource();

    source.buffer = this.sounds[id].buffer;
    var opts = this.sounds[id].data.options;

    source.gainNode = this.context.createGain();
    source.gain = source.gainNode.gain;

    source.connect(source.gainNode);

    source.gain.value = this.sounds[id].data.gain;
    if (opts.loop) {
        source.loop = opts.loop;
        if (this.loops[id]) {
            source = this.loops[id];
        } else {
            this.loops[id] = source;
        }
    }

    if (opts.grain) source.loop = true;

    if (opts.mod) {
        source.playbackRate.value = 1 + ((-opts.mod.p*0.5) + (Math.random()*opts.mod.p));
        source.gain.value = this.sounds[id].data.gain + ((-opts.mod.g*0.5) + (Math.random()*opts.mod.g));
    }
//    console.log("Sound Data: ",this.sounds[id])
    if (opts.fx && this.isPowerful) {
        for (index in opts.fx) {
            this.connectSourceToEffect(source, index, opts.fx[index])
        }

        if (opts.fx.delay) {

        } else {
            this.connectSourceToChannel(source, this.sounds[id].data, time);
        }
    } else {
        this.connectSourceToChannel(source, this.sounds[id].data, time);
    }

    return source;
};

webAudioPlayer.prototype.connectSourceToEffect = function(source, effect, level) {
    effect = this.effects[effect];
    //   console.log("connect: ",effect)
    source.gainNode.connect(effect);
};

webAudioPlayer.prototype.connectSourceToChannel = function(source, data, time) {
    var channel;
    if (data.channel == "music") {


        return source;
    } else {
        channel = this.channels[data.channel]
        source.gainNode.connect(channel);
        source.start(time);
    }
//    console.log("channel: ",data, channel)


};

webAudioPlayer.prototype.setupMusicTracks = function() {
    music.musicMix.setContext(this.context);
    var instance = this;
    var channels = music.ENUMS.channels;

    for (index in channels) {
        this.tracks[index] = {};
        music.musicMix.addTrackToMix(music.ENUMS.channels[index], this.isPowerful);
    }

};

webAudioPlayer.prototype.setTrackGain = function(track, gain) {
    this.tracks[track].gainNode.gain.value = gain*0.01;
};



webAudioPlayer.prototype.setChannelGain = function(channel, gain, time) {
    var now = this.context.currentTime;
    console.log("Set chan gain: ", channel, gain, time)
    this.channels[channel].gain.linearRampToValueAtTime( gain,  now+time );
};

webAudioPlayer.prototype.getChannelGain = function(channel) {
    return this.channels[channel].gain.value;
}

webAudioPlayer.prototype.setupChannels = function() {

    this.channels = {
        music: this.context.createGain(),
        sfx: this.context.createGain()
    };
    for (index in this.channels) {
        this.channels[index].connect(this.context.destination);
        this.channels[index].gain.value = 0.5

    }


};


webAudioPlayer.prototype.setupEffects = function() {
    this.setupReverb();
    this.setupDelay();
//  this.tracks["ohs"].gainNode.connect(this.effects.reverb)
//  this.tracks["bell"].gainNode.connect(this.effects.reverb)
//  this.tracks["snare"].gainNode.connect(this.effects.reverb)
//  his.tracks["choir"].gainNode.connect(this.effects.reverb)
//    this.channels["sfx"].connect(this.effects.reverb)

};


webAudioPlayer.prototype.setupDelay = function() {
    this.effects.delay = this.context.createDelay();
    this.effects.delay2 = this.context.createDelay();
//    this.effects.delay.gain.value = 0.5;
//    this.effects.delay2.gain.value = 0.5;
    this.effects.left = this.context.createPanner();
    this.effects.left.setPosition(1, 0, 0.1)
    this.effects.right = this.context.createPanner();
    this.effects.right.setPosition(-1, 0, 0.1)
//    this.effects.delay = this.context.createPanner();
//    this.effects.delay.setPosition(0, 0, 0.1)


    this.effects.delay.delayTime.value = 0.000;
    this.effects.delay2.delayTime.value = 0.012;

    //
    //   this.effects.left = this.context.createGainNode();

    //   this.effects.delay.connect(this.effects.right)
    this.effects.delay.connect(this.effects.delay2);
    this.effects.delay.connect(this.effects.left)
//    this.effects.delay2.connect(this.effects.left)

    this.effects.delay2.connect(this.effects.right);

    this.effects.right.connect(this.context.destination);
    this.effects.left.connect(this.context.destination);



    //   console.log(this.effects)
}


webAudioPlayer.prototype.setupReverb = function() {
    this.effects.reverb = this.context.createConvolver();
    this.effects.reverbGain = this.context.createGain();
    this.effects.reverbGain.gain.value = 0.4;
    var instance = this;
    var request = new XMLHttpRequest();
    request.open("GET", "assets/audio/fx/Church-Schellingwoude.mp3", true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var audioData = request.response;
        instance.context.decodeAudioData(audioData, function(buffer) {
            concertHallBuffer = buffer;
            soundSource = instance.context.createBufferSource();
            soundSource.buffer = concertHallBuffer;
            instance.effects.reverb.buffer = buffer;
        }, function(e){"Error with decoding audio data" + e.err});
    }
    request.send();

    this.effects.reverb.connect(this.effects.reverbGain);
    this.effects.reverbGain.connect(this.context.destination);
};


webAudioPlayer.prototype.getWaveSynth = function(id) {
    return this.waveSynths[id];
};

webAudioPlayer.prototype.createWaveSynth = function(id) {

    this.waveSynths[id] = new WaveSynth(this.context);
    return this.waveSynths[id];
};