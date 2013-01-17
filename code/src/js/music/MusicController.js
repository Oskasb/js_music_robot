MusicController = function() {
    this.fadeIn = 12;
    this.fadeOut = 3;
    this.trackSections = 4;
    this.tracks = [];
    this.isPlaying = false;
    this.section = 0;
};

MusicController.prototype.upSection = function() {
    var nextSection = (this.getSection()+1) % (this.trackSections);
    console.log(nextSection, this.getSection(), this.trackSections)
    this.setSection(nextSection);
    var waitTime = music.musicSequencer.getCurrentBarDuration()*500;
    console.log("--- Up Section --- Wait:", waitTime)
    this.sectionTransitiontimeout = setTimeout(function() {
        music.musicController.loadNextBarScoreTrack();
    }, waitTime)


};

MusicController.prototype.setSection = function(section) {
    this.section = section;
};

MusicController.prototype.getSection = function(section) {
    return this.section;
};

MusicController.prototype.loadScoreTracks = function() {
    var trackNr = 0;
    for (index in music.ENUMS.score) {
        this.tracks[trackNr] = music.ENUMS.score[index];
        trackNr += 1;
    }
    music.setArrId(music.ENUMS.arrangements.blipArr);
    music.instrumentRiffMaps.loadRiffs();
    this.setNextBarScoreTrack( music.ENUMS.score.intro);
};

MusicController.prototype.getCurrentTrackId = function() {
    return this.currentTrackId;
};

MusicController.prototype.setNextBarScoreTrack = function(track) {
    this.currentTrackId = track;
};

MusicController.prototype.sectionAdjust = function(section, config) {
    var nextSection = section % config.length;
    return config[nextSection]
};

MusicController.prototype.loadNextBarScoreTrack = function() {
    var trackData = this.getTrackConfiguration(this.getCurrentTrackId());
    var section =  this.getSection();
    music.musicMix.loadMix(this.sectionAdjust(section, trackData.mix));
    music.drummerController.setDrummerMode(this.sectionAdjust(section, trackData.beat));
    music.getScore().loadPhrase(this.sectionAdjust(section, trackData.phrase));
    music.setArrId(this.sectionAdjust(section, trackData.style));
    music.musicSequencer.setScoreNextBarTempo(this.sectionAdjust(section, trackData.tempo));
};


MusicController.prototype.prepareTrack = function(track) {
    var ongoingTrack = this.currentTrackId;
};

MusicController.prototype.pushNextTrackToSequencer = function() {
    var currentNr = this.tracks.indexOf(this.currentTrackId);
    var nextNr = currentNr +1;
    if (nextNr == this.tracks.length) nextNr = 0;
    var trackId = this.tracks[nextNr];
    this.setNextBarScoreTrack(trackId);
    this.loadNextBarScoreTrack();
};

MusicController.prototype.startLoadedMusicSequence = function() {
    if (this.isPlaying) return // this.stopMusicSequence();
    this.isPlaying = true;
    this.loadNextBarScoreTrack();
    music.musicSequencer.startSequence();
};

MusicController.prototype.stopMusicSequence = function() {
    this.isPlaying = false;
    music.musicSequencer.stopSequence();
//    client.soundPlayer.stopMusic(this.tracks[this.currentTrack] , this.fadeOut);

};

MusicController.prototype.getTrackConfiguration = function(track) {
    var tracks = {};
    tracks[music.ENUMS.score.disco] = {
        mix:            [music.ENUMS.mixes.DiscoMix         ],
        beat:           [music.ENUMS.drumBeats.straight     , music.ENUMS.drumBeats.straight     ,music.ENUMS.drumBeats.indoBeat    ,music.ENUMS.drumBeats.metalBeat  ],
        phrase:         [music.ENUMS.phrases.posci          , music.ENUMS.phrases.majHarm        ,music.ENUMS.phrases.posci         ,music.ENUMS.phrases.little       ],
        style:          [music.ENUMS.arrangements.blipArr   , music.ENUMS.arrangements.blipArr   ,music.ENUMS.arrangements.blipArr  ,music.ENUMS.arrangements.blipArr ],
        tempo:          [120                                ]
    };
    tracks[music.ENUMS.score.intro] = {
        mix:            [music.ENUMS.mixes.IntroMix         , music.ENUMS.mixes.IntroMix        , music.ENUMS.mixes.IntroMix       , music.ENUMS.mixes.HeroMix          ],
        beat:           [music.ENUMS.drumBeats.introBeat    , music.ENUMS.drumBeats.introBeat   ],
        phrase:         [music.ENUMS.phrases.intro          , music.ENUMS.phrases.Hero          , music.ENUMS.phrases.Hero         ],
        style:          [music.ENUMS.arrangements.bublArr   , music.ENUMS.arrangements.bublArr  , music.ENUMS.arrangements.blipArr  , music.ENUMS.arrangements.blipArr  ],
        tempo:          [90                                 , 90                                ]
    };
    tracks[music.ENUMS.score.easy] = {
        mix:            [music.ENUMS.mixes.Electro          ],
        beat:           [music.ENUMS.drumBeats.elecBeat     ],
        phrase:         [music.ENUMS.phrases.posci          ],
        style:          [music.ENUMS.arrangements.bublArr   ],
        tempo:          [94                                 ]
    };
    tracks[music.ENUMS.score.Hero] = {
        mix:            [music.ENUMS.mixes.HeroMix          ],
        beat:           [music.ENUMS.drumBeats.introBeat    ],
        phrase:         [music.ENUMS.phrases.Hero           ],
        style:          [music.ENUMS.arrangements.heroArr   ],
        tempo:          [94                                 ]
    };
    tracks[music.ENUMS.score.hard] = {
        mix:            [music.ENUMS.mixes.LilMix          ],
        beat:           [music.ENUMS.drumBeats.rockBeat     ],
        phrase:         [music.ENUMS.phrases.little         ],
        style:          [music.ENUMS.arrangements.lilArr ],
        tempo:          [100                                ]
    };
    tracks[music.ENUMS.score.indo] = {
        mix:            [music.ENUMS.mixes.indoMix          ],
        beat:           [music.ENUMS.drumBeats.indoBeat     ],
        phrase:         [music.ENUMS.phrases.indo           ],
        style:          [music.ENUMS.arrangements.indoArr   ],
        tempo:          [120                                ]
    };

    tracks[music.ENUMS.score.heavy] = {
        mix:            [music.ENUMS.mixes.HeavyMix         ],
        beat:           [music.ENUMS.drumBeats.metalBeat    ],
        phrase:         [music.ENUMS.phrases.shifts         ],
        style:          [music.ENUMS.arrangements.chordyArr ],
        tempo:          [114                                ]
    };
    tracks[music.ENUMS.score.pingo] = {
        mix:            [music.ENUMS.mixes.PingMix         ],
        beat:           [music.ENUMS.drumBeats.elecBeat     ],
        phrase:         [music.ENUMS.phrases.majHarm          , music.ENUMS.phrases.posci      ,music.ENUMS.phrases.majHarm,    music.ENUMS.phrases.Hero],
        style:          [music.ENUMS.arrangements.blipArr   ],
        tempo:          [106                                ]
    };
    return tracks[track];
};