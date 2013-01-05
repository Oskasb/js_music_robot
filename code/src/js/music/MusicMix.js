MusicMix = function() {
    this.tracks = {};
    this.mixTansitionTime = 4;
};

MusicMix.prototype.setContext = function(context) {
    this.context = context;
    this.createEffectSends();
};

MusicMix.prototype.getMixTransitionTime = function() {
    return this.mixTansitionTime;
};

MusicMix.prototype.setCurrentMixId = function(mix) {
    this.currentMixId = mix;
};

MusicMix.prototype.getCurrentMixId = function() {
    return this.currentMixId;
};

MusicMix.prototype.getMixChangeCompletedTime = function() {
    return this.context.currentTime + this.getMixTransitionTime();
};

MusicMix.prototype.loadMix = function(mix) {
    this.setCurrentMixId(mix)
    var mixData = music.mixData.getMixData(music.ENUMS.mixes[mix]);
    var mixChangeTime = this.getMixChangeCompletedTime();
    console.log(mix, mixData)
    for (index in music.ENUMS.channels) {
        if (mixData[music.ENUMS.channels[index]]) {
            this.loadChannelMixData(music.ENUMS.channels[index], mixData[music.ENUMS.channels[index]], mixChangeTime)
        } else {
            this.disableChannel(music.ENUMS.channels[index], mixChangeTime);
        }

    }

};

MusicMix.prototype.disableChannel = function(channelId, mixChangeTime) {
    mixData ={
        mix:{
            gain:0,
            pan:0,
            frequency:20000,
            Q:1
        },
        fx:{}
    }
    this.loadChannelMixData(channelId, mixData, mixChangeTime)
};

MusicMix.prototype.getEffectSends = function() {
    return this.effects;
};

MusicMix.prototype.createEffectSends = function() {
    this.effects = {};
    this.effects[music.ENUMS.fx.Delay1] = this.createDelayEffect(0.3, [1.0, 1.5])
    this.effects[music.ENUMS.fx.Delay2] = this.createDelayEffect(0.15, [0.50, 0.75])
    this.effects[music.ENUMS.fx.Verb1] = this.createReverbTrack("Cave.mp3");
    this.effects[music.ENUMS.fx.Verb2] = this.createReverbTrack("DenseRoom.mp3");
    this.updateBeatTime(2);
};

MusicMix.prototype.updateBeatTime = function(time) {


    this.setDelayTrackTime(music.ENUMS.fx.Delay1, time);
    this.setDelayTrackTime(music.ENUMS.fx.Delay2, time);
};

MusicMix.prototype.createReverbTrack = function(convo) {
    var reverb = this.context.createConvolver();
    var instance = this;
    var request = new XMLHttpRequest();
    request.open("GET", "assets/audio/fx/"+convo, true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        reverb.buffer = instance.context.createBuffer(request.response, false);
    }
    request.send();

//    reverb.buffer = client.soundManager.sounds[convo].buffer
    reverb.connect(client.soundPlayer.channels["music"]);
    return reverb;
};

MusicMix.prototype.createDelayEffect = function(feedbackGain, timings) {
    var effect = this.context.createGainNode();
    effect.timings = timings;
    effect.gain.value = 1;
    effect.splitter = this.context.createChannelSplitter(2);
    effect.delayL = this.context.createDelayNode();
    effect.delayR = this.context.createDelayNode();
    effect.fbGainNode = this.context.createGainNode();
    effect.fbGainNode.gain.value = feedbackGain;
    effect.merger = this.context.createChannelMerger(2);

    effect.connect(effect.splitter);

    effect.splitter.connect(effect.delayL, 0);
    effect.splitter.connect(effect.delayR, 1);

    effect.fbGainNode.connect(effect.splitter)
    effect.delayL.connect(effect.merger, 0, 1);
    effect.delayR.connect(effect.merger, 0, 0);
    effect.delayL.maxValue = 4;
    effect.delayR.maxValue = 4;

//    effect.delayL.connect(effect.fbGainNode)
//    effect.delayR.connect(effect.fbGainNode)
    effect.merger.connect(effect.fbGainNode);
    effect.merger.connect(client.soundPlayer.channels["music"]);
    return effect;
};

MusicMix.prototype.setDelayTrackTime = function(name, time) {
    if (this.effects[name].delayL.delayTime.value == time*this.effects[name].timings[0]) return;
    this.effects[name].delayL.delayTime.value = time*this.effects[name].timings[0];
    this.effects[name].delayR.delayTime.value = time*this.effects[name].timings[1];

};

MusicMix.prototype.connectNodeToMixTrack = function(node, trackId) {
    node.connect(this.tracks[trackId].filterNode);
};

MusicMix.prototype.addTrackToMix = function(trackId, isPowerful) {
    this.tracks[trackId] = {};

    var track = this.tracks[trackId]

    track.filterNode = this.context.createBiquadFilter();

    if (isPowerful) {
        track.analyzerNode = this.context.createAnalyser();
        track.analyzerNode.frequencyBinCount = 256;
        track.analyzerNode.smoothingTimeConstant = 0.2;
    };

    track.gainNode = this.context.createGainNode();
    track.filterNode.connect(track.gainNode);
    track.gainNode.connect(track.analyzerNode);
    track.panNode = this.buildStereoChannelSplitter(track.gainNode);
    track.panNode.setPosition(0, this.context.currentTime);
  //  track.gainNode.connect(track.panNode);
//    track.gainNode.connect(client.soundPlayer.channels["music"]);
    track.panNode.connect(client.soundPlayer.channels["music"]);
    this.setTrackToDefaultMix(trackId)
};

MusicMix.prototype.buildStereoChannelSplitter = function(source) {
    var splitter = this.context.createChannelSplitter(2);
    source.connect(splitter);
    var gainLeft = this.context.createGainNode();
    var gainRight = this.context.createGainNode();
    splitter.connect(gainLeft, 0);
    splitter.connect(gainRight, 1);
    splitter.right = gainRight;
    splitter.left = gainLeft;

    var merger = this.context.createChannelMerger(2);
    merger.setPosition = function(position, time) {
        if (!time) time = this.context.currentTime;
        splitter.right.gain.linearRampToValueAtTime( 1 - position, time );
        splitter.left.gain.linearRampToValueAtTime( 1 + position, time );
    };
    splitter.left.connect(merger, 0, 0);
    splitter.right.connect(merger, 0, 1);
    return merger;

};

MusicMix.prototype.getTrackMix = function(trackId) {
    var mix = {
        gain:this.getTrackGain(trackId),
        filter:this.getTrackFilterValues(trackId),
        pan:this.getTrackPan(trackId),
        fx:this.getTrackFx(trackId)
    };
    return mix;
};

MusicMix.prototype.getTrack = function(id) {
    return this.tracks[id];
};

MusicMix.prototype.getTracks = function() {
    return this.tracks;
};


MusicMix.prototype.setTrackToDefaultMix = function(track) {
    console.log(track, this.defaultMix())
    var mix = this.defaultMix();
    this.tracks[track].fxSends = {};
    this.setTrackMix(track, mix, this.context.currentTime);
};

MusicMix.prototype.loadChannelMixData = function(track, mixData, time) {
    var mix = mixData.mix;
    var fx = mixData.fx;
    this.setTrackMix(track, mix, time);
    this.setTrackFx(track, fx, time);
}

MusicMix.prototype.setTrackMix = function(track, mix, time) {


//    console.log(track, mix)
    this.setTrackGain(track, mix[music.ENUMS.mix.gain], time);
    this.setTrackPan(track, mix[music.ENUMS.mix.pan], time);
    this.setTrackFilterValue(track , music.ENUMS.mix.frequency, mix.frequency, null, null, time);
    this.setTrackFilterValue(track , music.ENUMS.mix.Q, mix.Q, null, null, time);

};

MusicMix.prototype.setTrackFx = function(track, fx, time) {
 //   console.log("Set Track FX:", track, fx)
    for (index in music.ENUMS.fx) {
        if (fx[index]) {
            if (!this.tracks[track].fxSends[music.ENUMS.fx[index]]) {
                this.connectTrackToFx(track, music.ENUMS.fx[index], fx[index], time)
            }
        } else {
            if (this.tracks[track].fxSends[music.ENUMS.fx[index]]) {
                this.disconnectTrackFxSend(track, music.ENUMS.fx[index]);
            }
        }

    }
}

MusicMix.prototype.disconnectTrackFxSend = function(track, effectId) {
    this.tracks[track].fxSends[effectId].disconnect(this.effects[effectId])
    this.tracks[track].fxSends[effectId] = null;
};

MusicMix.prototype.connectTrackToFx = function(track, effectId, gain, time) {
    if (!time) time = this.context.currentTime;
    this.tracks[track].fxSends[effectId] = this.context.createGainNode();
    this.tracks[track].fxSends[effectId].connect(this.effects[effectId])
    this.tracks[track].gainNode.connect(this.tracks[track].fxSends[effectId])
    this.tracks[track].fxSends[effectId].gain.linearRampToValueAtTime(gain, time)
};



MusicMix.prototype.setTrackGain = function(track, gain, time) {
//    console.log(track, time, this.tracks)
    if (!time) time = this.context.currentTime;
    this.tracks[track].gainNode.gain.linearRampToValueAtTime( gain*0.01, time);
};

MusicMix.prototype.setTrackFxSendLevel = function(track, effectId, gain, time) {
    if (!this.tracks[track].fxSends[effectId]) return;
    if (!time) time = this.context.currentTime;
    this.tracks[track].fxSends[effectId].gain.linearRampToValueAtTime( gain, time);

};

MusicMix.prototype.getTrackFx = function(track) {
    return this.tracks[track].fxSends;
};

MusicMix.prototype.getTrackGain = function(track) {
    return this.tracks[track].gainNode.gain.value;
};


MusicMix.prototype.setTrackPan = function(track, pan, time) {
//    console.log("Pan time = ", time, track, pan)
    this.tracks[track].panNode.setPosition(pan, time);
    this.tracks[track].panNode.position = pan;
};

MusicMix.prototype.getTrackPan = function(track) {
    return this.tracks[track].panNode;
};

MusicMix.prototype.getNodeParamProportion = function(nodeParam) {
    var prop = 1-nodeParam.uiMin - ((nodeParam.uiMax - nodeParam.value)/(nodeParam.uiMax) -nodeParam.uiMin);
    return prop;
};

MusicMix.prototype.getTrackFilterValues = function(trackId) {
    var filter = this.tracks[trackId].filterNode

    var values = {
        Q:{
            value:filter.Q.value,
            proportion:this.getNodeParamProportion(filter.Q)
        },
        frequency:{
            value:filter.frequency.value,
            proportion:this.getNodeParamProportion(filter.frequency)
        }
    };
    return values;
};

MusicMix.prototype.setTrackFilterValue = function(track, param, value, max, min, time) {
    if (!min) min = this.tracks[track].filterNode[param].minValue;
    if (!max) max = this.tracks[track].filterNode[param].maxValue;
    if (!time) time = this.context.currentTime
    this.tracks[track].filterNode[param].linearRampToValueAtTime( value, time);

    this.tracks[track].filterNode[param].uiMax = max;
    this.tracks[track].filterNode[param].uiMin = min;
};

MusicMix.prototype.defaultMix = function() {
    var defaultMix = {gain: 0 , pan:0, frequency:24000, Q:1}
    return defaultMix;
};



MusicMix.prototype.defaultFx = function() {
    var defaultFx = {};
    return defaultFx;
}