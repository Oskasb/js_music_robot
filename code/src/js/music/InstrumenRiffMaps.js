InstrumentRiffMaps = function() {
    this.arrangementMaps = {};
    this.toneStyleMap = [];
};

InstrumentRiffMaps.prototype.getArrangedInstrumentRiffs = function(arrId, instrumentId) {
    return this.arrangementMaps[arrId][instrumentId];
};



InstrumentRiffMaps.prototype.loadRiffs = function() {
    for (index in music.ENUMS.arrangements) {
        this.arrangementMaps[music.ENUMS.arrangements[index]] = {};
    }

    for (index in music.ENUMS.tones) {
        this.toneStyleMap[music.ENUMS.tones[index]] = {};
    }

    this.loadToneArrMaps();

    for (tone in this.toneStyleMap) {
        var toneStyleMap  = this.getToneStyleMap(tone)
        for (arrId in toneStyleMap) {
            var arrMap = this.getToneStyleMap(tone)[arrId];
            this.mapArrangementInstrumentRiffs(arrId,   tone,  arrMap.octave ,this.riffBarMap(arrMap.style));
        }
    }

};

InstrumentRiffMaps.prototype.getToneStyleMap = function(tone) {
    return this.toneStyleMap[tone];
};

InstrumentRiffMaps.prototype.mapToneArrStyle = function(tone, arrId, style) {
    this.toneStyleMap[tone][arrId] = style
};

InstrumentRiffMaps.prototype.mapArrangementInstrumentRiffs = function(arrId, instrument, octave, subSeqs) {
    this.arrangementMaps[arrId][instrument] = {
        octave:octave
    };
    for (index in subSeqs) {
        this.arrangementMaps[arrId][instrument][index] = subSeqs[index];
    }

};

InstrumentRiffMaps.prototype.riffBarMap = function(style) {
    var styles = {
        evenDoubleBar   :{0:{riff:music.ENUMS.riffs.c1_2,   speed:2 }},
        oddDoubleBar    :{0:{riff:music.ENUMS.riffs.c1_3,   speed:2 }},
        leadArpDown     :{0:{riff:music.ENUMS.riffs.p5,     speed:16}},
        leadArpDisco    :{0:{riff:music.ENUMS.riffs.p7,     speed:16}},
        rythmArpAlter1  :{0:{riff:music.ENUMS.riffs.b1,     speed:18}},
        pingArpAlter1   :{0:{riff:music.ENUMS.riffs.p3,     speed:16},  8:{riff:music.ENUMS.riffs.p4, speed:16}},
        leadChordRiff1  :{0:{riff:music.ENUMS.riffs.r1,     speed:16}},
        leadChordRiff2  :{0:{riff:music.ENUMS.riffs.r2,     speed:20}},
        leadRiff3       :{0:{riff:music.ENUMS.riffs.r3,     speed:34}},
        tripChordRiff3  :{0:{riff:music.ENUMS.riffs.r4,     speed:44}, 6:{riff:music.ENUMS.riffs.r4,     speed:44}, 12:{riff:music.ENUMS.riffs.r4,     speed:44}},
        tripRiffBar5    :{0:{riff:music.ENUMS.riffs.r5,     speed:22}},
        lilRiffBar1     :{0:{riff:music.ENUMS.riffs.lilRiff,speed:32}},
        lilRiffBass1    :{0:{riff:music.ENUMS.riffs.lilBass,speed:22}},

        discoChord      :{0:{riff:music.ENUMS.riffs.dChord, speed:1 }},

        padBarFat1      :{0:{riff:music.ENUMS.riffs.c2,     speed:1 }},
        singleWholeBar  :{0:{riff:music.ENUMS.riffs.c1,     speed:1 }},
        wholeSus4Bar    :{0:{riff:music.ENUMS.riffs.cSus,   speed:1 }},
        bassLineAlt1    :{0:{riff:music.ENUMS.riffs.c1,     speed:6 }, 3:{riff:music.ENUMS.riffs.c1, speed:12}, 5:{riff:music.ENUMS.riffs.c1, speed:8}, 8:{riff:music.ENUMS.riffs.c1, speed:10}, 10:{riff:music.ENUMS.riffs.c1, speed:12}, 14:{riff:music.ENUMS.riffs.c1, speed:8}},
        bassStraight1   :{0:{riff:music.ENUMS.riffs.c1,     speed:6 }, 4:{riff:music.ENUMS.riffs.c1, speed:6},  8:{riff:music.ENUMS.riffs.c1, speed:6}, 12:{riff:music.ENUMS.riffs.c1, speed:6}},
        bassLineArp1    :{0:{riff:music.ENUMS.riffs.b2,     speed:12}},
        bassBubblyArp1  :{0:{riff:music.ENUMS.riffs.b3,     speed:12}},
        bassTrips       :{0:{riff:music.ENUMS.riffs.trip1,  speed:14}, 10:{riff:music.ENUMS.riffs.trip2,  speed:16}}

    };
    return styles[style];
};

InstrumentRiffMaps.prototype.loadToneArrMaps = function() {


    var arr = music.ENUMS.arrangements.lilArr;

    this.loadArrTone(music.ENUMS.tones.bass ,   arr,   {octave: 0, style:"lilRiffBass1"       })
    this.loadArrTone(music.ENUMS.tones.gtr  ,   arr,   {octave: 0, style:"lilRiffBar1"        })
    this.loadArrTone(music.ENUMS.tones.saw  ,   arr,   {octave: 0, style:"leadArpDown"        })
    this.loadArrTone(music.ENUMS.tones.hyper,   arr,   {octave: 1, style:"lilRiffBar1"        })
    this.loadArrTone(music.ENUMS.tones.pluck,   arr,   {octave: 1, style:"rythmArpAlter1"     })
    this.loadArrTone(music.ENUMS.tones.ping ,   arr,   {octave: 1, style:"rythmArpAlter1"     })
    this.loadArrTone(music.ENUMS.tones.bell ,   arr,   {octave: 0, style:"evenDoubleBar"      })
    this.loadArrTone(music.ENUMS.tones.pads ,   arr,   {octave: 1, style:"padBarFat1"         })
    this.loadArrTone(music.ENUMS.tones.choir,   arr,   {octave: 1, style:"discoChord"         })

    var arr = music.ENUMS.arrangements.indoArr;

    this.loadArrTone(music.ENUMS.tones.bass ,   arr,   {octave: -1,style:"tripRiffBar5"       })
    this.loadArrTone(music.ENUMS.tones.gtr  ,   arr,   {octave: 0, style:"leadChordRiff2"     })
    this.loadArrTone(music.ENUMS.tones.saw  ,   arr,   {octave: 1, style:"tripRiffBar5"       })
    this.loadArrTone(music.ENUMS.tones.hyper,   arr,   {octave: 0, style:"tripRiffBar5"       })
    this.loadArrTone(music.ENUMS.tones.pluck,   arr,   {octave: 1, style:"leadRiff3"          })
    this.loadArrTone(music.ENUMS.tones.ping ,   arr,   {octave: 1, style:"leadArpDown"        })
    this.loadArrTone(music.ENUMS.tones.bell ,   arr,   {octave: 0, style:"oddDoubleBar"       })
    this.loadArrTone(music.ENUMS.tones.pads ,   arr,   {octave: 1, style:"padBarFat1"         })
    this.loadArrTone(music.ENUMS.tones.choir,   arr,   {octave: 1, style:"wholeSus4Bar"       })

    var arr = music.ENUMS.arrangements.heroArr;

    this.loadArrTone(music.ENUMS.tones.bass ,   arr,   {octave: 0, style:"bassTrips"          })
    this.loadArrTone(music.ENUMS.tones.gtr  ,   arr,   {octave: 0, style:"pingArpAlter1"      })
    this.loadArrTone(music.ENUMS.tones.saw  ,   arr,   {octave: 0, style:"leadArpDown"        })
    this.loadArrTone(music.ENUMS.tones.hyper,   arr,   {octave: 1, style:"leadChordRiff2"     })
    this.loadArrTone(music.ENUMS.tones.pluck,   arr,   {octave: 1, style:"bassBubblyArp1"     })
    this.loadArrTone(music.ENUMS.tones.ping ,   arr,   {octave: 1, style:"leadArpDown"        })
    this.loadArrTone(music.ENUMS.tones.bell ,   arr,   {octave: 0, style:"oddDoubleBar"       })
    this.loadArrTone(music.ENUMS.tones.pads ,   arr,   {octave: 1, style:"padBarFat1"         })
    this.loadArrTone(music.ENUMS.tones.choir,   arr,   {octave: 1, style:"discoChord"         })

    var arr = music.ENUMS.arrangements.bublArr;

    this.loadArrTone(music.ENUMS.tones.bass ,   arr,   {octave: 0, style:"bassTrips"          })
    this.loadArrTone(music.ENUMS.tones.gtr  ,   arr,   {octave: 1, style:"bassBubblyArp1"     })
    this.loadArrTone(music.ENUMS.tones.saw  ,   arr,   {octave: 2, style:"leadChordRiff2"     })
    this.loadArrTone(music.ENUMS.tones.hyper,   arr,   {octave: 1, style:"bassLineArp1"       })
    this.loadArrTone(music.ENUMS.tones.pluck,   arr,   {octave: 1, style:"bassBubblyArp1"     })
    this.loadArrTone(music.ENUMS.tones.ping ,   arr,   {octave: 1, style:"leadArpDown"        })
    this.loadArrTone(music.ENUMS.tones.bell ,   arr,   {octave: 0, style:"evenDoubleBar"      })
    this.loadArrTone(music.ENUMS.tones.pads ,   arr,   {octave: 1, style:"padBarFat1"         })
    this.loadArrTone(music.ENUMS.tones.choir,   arr,   {octave: 1, style:"discoChord"         })

    var arr = music.ENUMS.arrangements.blipArr;

    this.loadArrTone(music.ENUMS.tones.bass ,   arr,   {octave: 0, style:"bassLineArp1"       })
    this.loadArrTone(music.ENUMS.tones.gtr  ,   arr,   {octave: 0, style:"pingArpAlter1"      })
    this.loadArrTone(music.ENUMS.tones.saw  ,   arr,   {octave: 1, style:"leadArpDisco"       })
    this.loadArrTone(music.ENUMS.tones.hyper,   arr,   {octave: 1, style:"tripChordRiff3"     })
    this.loadArrTone(music.ENUMS.tones.pluck,   arr,   {octave: 1, style:"rythmArpAlter1"     })
    this.loadArrTone(music.ENUMS.tones.ping ,   arr,   {octave: 0, style:"leadArpDown"        })
    this.loadArrTone(music.ENUMS.tones.bell ,   arr,   {octave: 1, style:"evenDoubleBar"      })
    this.loadArrTone(music.ENUMS.tones.pads ,   arr,   {octave: 1, style:"padBarFat1"         })
    this.loadArrTone(music.ENUMS.tones.choir,   arr,   {octave: 1, style:"discoChord"         })

    var arr = music.ENUMS.arrangements.chordyArr;

    this.loadArrTone(music.ENUMS.tones.bass ,   arr,   {octave: 0, style:"bassLineAlt1"       })
    this.loadArrTone(music.ENUMS.tones.gtr  ,   arr,   {octave: 0, style:"pingArpAlter1"      })
    this.loadArrTone(music.ENUMS.tones.saw  ,   arr,   {octave: 1, style:"leadArpDown"        })
    this.loadArrTone(music.ENUMS.tones.hyper,   arr,   {octave: 1, style:"leadChordRiff1"     })
    this.loadArrTone(music.ENUMS.tones.pluck,   arr,   {octave: 1, style:"rythmArpAlter1"     })
    this.loadArrTone(music.ENUMS.tones.ping ,   arr,   {octave: 1, style:"rythmArpAlter1"     })
    this.loadArrTone(music.ENUMS.tones.bell ,   arr,   {octave: 0, style:"singleDoubleBar"    })
    this.loadArrTone(music.ENUMS.tones.pads ,   arr,   {octave: 1, style:"singleWholeBar"     })
    this.loadArrTone(music.ENUMS.tones.choir,   arr,   {octave: 1, style:"padBarFat1"         })



};



InstrumentRiffMaps.prototype.loadArrTone = function(tone, arr, style) {
    this.mapToneArrStyle(tone, arr, style)
}








