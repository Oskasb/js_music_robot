MusicRythm = function() {

};

MusicRythm.prototype.getNoteRythm = function(pattern) {
    var rythm = [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0];

    for (index in pattern) {
        rythm[index] = pattern[index];
    }

    return rythm;
};



MusicRythm.prototype.buildDrumHit = function(velocity, noteDuration, keys) {
    var hit = {
        velocity: velocity,
        duration: noteDuration,
        keys: keys
    };
    return hit;
};

MusicRythm.prototype.getDrumPattern = function(drum, pattern, time) {
    var patterns = {};
    patterns[music.ENUMS.rythmPatterns.D0]    = this.buildPattern(drum, time,  { hits:[0],              velocities:[0.7] });
    patterns[music.ENUMS.rythmPatterns.D1]    = this.buildPattern(drum, time,  { hits:[0, 4, 8, 12],    velocities:[0.9, 0.6, 0.8, 0.7] });
    patterns[music.ENUMS.rythmPatterns.D2]    = this.buildPattern(drum, time,  { hits:[0, 2, 4],        velocities:[0.7, 0.4, 0.5] });
    patterns[music.ENUMS.rythmPatterns.S1]    = this.buildPattern(drum, time,  { hits:[0, 8],           velocities:[0.9, 0.9, 0.8] });
    patterns[music.ENUMS.rythmPatterns.S2]    = this.buildPattern(drum, time,  { hits:[0, 7, 9, 12],    velocities:[0.6, 0.5, 0.9, 0.7] });
    patterns[music.ENUMS.rythmPatterns.S3]    = this.buildPattern(drum, time,  { hits:[0, 8, 9],        velocities:[0.9, 0.9, 0.8] });
    patterns[music.ENUMS.rythmPatterns.H1]    = this.buildPattern(drum, time,  { hits:[0, 4, 8, 12],    velocities:[0.3, 0.5, 0.3, 0.5] });
    patterns[music.ENUMS.rythmPatterns.R1]    = this.buildPattern(drum, time,  { hits:[0, 4, 8, 12],    velocities:[0.3, 0.4, 0.5, 0.6] });

    patterns[music.ENUMS.rythmPatterns.Tamb1] = this.buildPattern(drum, time,  { hits:[0],              velocities:[0.6] });
    patterns[music.ENUMS.rythmPatterns.T1]    = this.buildPattern(drum, time,  { hits:[0, 4],           velocities:[0.2, 0.2] });
    patterns[music.ENUMS.rythmPatterns.Trips] = this.buildPattern(drum, time,  { hits:[0, 1, 2],        velocities:[0.4, 0.5, 0.7]});
    patterns[music.ENUMS.rythmPatterns.Dubs]  = this.buildPattern(drum, time,  { hits:[0, 2],           velocities:[0.8, 0.6]});
    patterns[music.ENUMS.rythmPatterns.Fill1] = this.buildPattern(drum, time,  { hits:[0,1,2,4,5,6,7],  velocities:[0.7,0.8,0.8,0.7,0.8,0.9] });
    patterns[music.ENUMS.rythmPatterns.Eits]  = this.buildPattern(drum, time,  { hits:[0,1,2,3,4,5,6,7],velocities:[0.5,0.6,0.7,0.6,0.5,0.7,0.5,0.6] });
    patterns[music.ENUMS.rythmPatterns.Fors]  = this.buildPattern(drum, time,  { hits:[0,1,2,3],        velocities:[0.5,0.6,0.5,0.7] });

    return patterns[pattern];
};

MusicRythm.prototype.buildPattern = function(drum, time, sequence) {
    var pattern = {};
    for (var i = 0;i < sequence.hits.length; i++) {
        var samples = music.drummerPatterns.getDrumSample(music.ENUMS.instruments[drum], i);
        pattern[sequence.hits[i] / time] = {}
        for (var j = 0; j < samples.length; j++) {
            pattern[sequence.hits[i] / time][samples[j]] = this.buildDrumHit(sequence.velocities[i], 1/time, [0])
        }
    }
    return pattern;
};

MusicRythm.prototype.getRiffPattern = function(pattern, speed, ident, phaze) {
    var riffIdents =  music.riffPatterns.riffData(pattern, speed)
    var riff = riffIdents[ident %  riffIdents.length]
    return riff;
};