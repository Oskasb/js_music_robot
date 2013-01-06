Instruments = function() {

};

Instruments.prototype.setupInstrumentMap = function() {
    this.samples = this.setup();
    this.kits = this.drumKits();
};

Instruments.prototype.getInstrumentEnvelope = function(instrument) {
    return this.samples[instrument].envelope;
};

Instruments.prototype.getInstrumentHarmony = function(instrument) {
    return this.samples[instrument].harmony;
};

Instruments.prototype.getInstrumentChannel = function(instrument) {
    return this.samples[instrument].channel;
};


Instruments.prototype.getInstrumentsByChannel = function(channel) {
    var instruments = [];
    for (index in this.samples) {
        var sampleChannel = this.samples[index].channel
        if (sampleChannel == channel) instruments.push(index);
    }
    return instruments;
};

Instruments.prototype.getDrum = function(kit, drum) {
    return this.kits[kit][drum];
};


Instruments.prototype.getInstrumentFrequencyNearestSample = function(instrument, frequency) {
//    console.log(instrument, frequency)
    var instrument = this.samples[instrument];
    var diff = Infinity;
    var sample = null;
    var diffRatio = 0;

    for (var i = 0; i < instrument.samples.length; i++) {

        var sampleFreq = instrument.samples[i].freq;
        var sampleDiff = Math.abs(frequency - sampleFreq);
        if (sampleDiff < diff) {
            sample = instrument.samples[i];
            diff=sampleDiff;


            diffRatio = music.theory.sampleDiffRatio(frequency, sampleFreq);
        }
    };

//    console.log(sample, diffRatio)
    return [sample, diffRatio]
};

Instruments.prototype.drumKits = function() {
    var kits = {};
    kits[music.ENUMS.kits.K1] = {

        kick: {
            channel: music.ENUMS.channels.kick,
            samples:{
                Kk:               "Kick",
                Sk:          "SynthKick"
            }
        },

        snare: {
            channel: music.ENUMS.channels.snare,
            samples:{
                SS:          "SideStick",
                Sr:          "SnareRing",
                Sn:              "Snare"
            }
        },

        hat: {
            channel: music.ENUMS.channels.hat,
            samples:{
                h1:             "HH_closed",
                h2:             "HH_closed_bell",
                h3:             "HH_open",
                h4:             "HH_open_bell"
}
        },

        toms: {
            channel:music.ENUMS.channels.toms,
            samples:{
                T1:              "Tom1",
                T2:              "Tom2",
                T3:              "Tom3",
                T4:              "Tom4"
        }
        },

        ohs: {
            channel: music.ENUMS.channels.ohs,
            samples:{
                Rb:              "RideBell",
                Rl:              "RideLight",
                C1:              "Crash",
                C2:              "Crash2",
                C3:              "CrashSmall"
            }
        },

        perc: {
            channel: music.ENUMS.channels.perc,
            samples:{
                Ta:               "Tamb"         ,
                Sh:               "SynthHat"     ,
                Ts:               "tamb_short"   ,
                Se:               "stick_elec"   ,
                He:               "hat_elec"     ,
                Sp:               "splash_short" ,
                Co:               "cow_light"    ,
                Sc:               "scratch_soft" ,
                Ti:               "tick_soft"    ,
                Cp:               "clap_low"

            }
        }

    };

    return kits;

};

Instruments.prototype.setup = function() {
    music.musicSequencer.drummer.setDrumKit(music.ENUMS.kits.K1);
    var instruments = {

        bass: {
            harmony: "keys",
            channel: music.ENUMS.channels.bass,
            envelope:{a:0.03, d:0, s:1, r:0.05},
            samples:[
                {freq:music.ENUMS.keyFreqs.A0, sample:"bass_A0", trig:"bass_A0_trig"},
                {freq:music.ENUMS.keyFreqs.A1, sample:"bass_A1", trig:"bass_A1_trig"},
                {freq:music.ENUMS.keyFreqs.E0, sample:"bass_E0", trig:"bass_E0_trig"},
                {freq:music.ENUMS.keyFreqs.E1, sample:"bass_E1", trig:"bass_E1_trig"}
            ]
        },

        gtr: {
            harmony: "keys",
            channel: music.ENUMS.channels.gtr,
            envelope:{a:0, d:0, s:1, r:0.07},
            samples:[
                {freq:music.ENUMS.keyFreqs.E0, sample:"gtr_E0", trig:"gtr_E0_trig"},
                {freq:music.ENUMS.keyFreqs.G0, sample:"gtr_G0", trig:"gtr_G0_trig"},
                {freq:music.ENUMS.keyFreqs.B1, sample:"gtr_B1", trig:"gtr_B1_trig"},
                {freq:music.ENUMS.keyFreqs.D1, sample:"gtr_D1", trig:"gtr_D1_trig"},
                {freq:music.ENUMS.keyFreqs.E1, sample:"gtr_E1", trig:"gtr_E1_trig"},
                {freq:music.ENUMS.keyFreqs.G1, sample:"gtr_G1", trig:"gtr_G1_trig"},
                {freq:music.ENUMS.keyFreqs.B2, sample:"gtr_B2", trig:"gtr_B2_trig"},
                {freq:music.ENUMS.keyFreqs.D2, sample:"gtr_D2", trig:"gtr_D2_trig"},
                {freq:music.ENUMS.keyFreqs.E2, sample:"gtr_E2", trig:"gtr_E2_trig"},
                {freq:music.ENUMS.keyFreqs.G2, sample:"gtr_G2", trig:"gtr_G2_trig"},
                {freq:music.ENUMS.keyFreqs.B3, sample:"gtr_B3", trig:"gtr_B3_trig"},
                {freq:music.ENUMS.keyFreqs.E3, sample:"gtr_E3", trig:"gtr_E3_trig"},
                {freq:music.ENUMS.keyFreqs.G3_,sample:"gtr_G3_",trig:"gtr_G3__trig"},
                {freq:music.ENUMS.keyFreqs.B4, sample:"gtr_B4", trig:"gtr_B4_trig"},
                {freq:music.ENUMS.keyFreqs.D4, sample:"gtr_D4", trig:"gtr_D4_trig"}
            ]
        },

        saw: {
            harmony: "lead",
            channel: music.ENUMS.channels.saw,
            envelope:{a:0, d:0, s:1, r:0.03},
            samples:[
                {freq:music.ENUMS.keyFreqs.A1,   sample:"saw_A1"},
                {freq:music.ENUMS.keyFreqs.A4,   sample:"saw_A4"},
                {freq:music.ENUMS.keyFreqs.A5,   sample:"saw_A5"},
                {freq:music.ENUMS.keyFreqs.E1,   sample:"saw_E1"},
                {freq:music.ENUMS.keyFreqs.E2,   sample:"saw_E2"},
                {freq:music.ENUMS.keyFreqs.C3,   sample:"saw_C3"}
            ]
        },

        hyper: {
            harmony: "keys",
            channel: music.ENUMS.channels.arp,
            envelope:{a:0, d:0, s:1, r:0.05},
            samples:[
                {freq:music.ENUMS.keyFreqs.A1,   sample:"hyper_A1",   trig:"hyper_A1_trig"},
                {freq:music.ENUMS.keyFreqs.A4,   sample:"hyper_A4",   trig:"hyper_A4_trig"},
                {freq:music.ENUMS.keyFreqs.A3,   sample:"hyper_A3",   trig:"hyper_A3_trig"},
                {freq:music.ENUMS.keyFreqs.A2,   sample:"hyper_A2",   trig:"hyper_A2_trig"},
                {freq:music.ENUMS.keyFreqs.E1,   sample:"hyper_E1",   trig:"hyper_E1_trig"}
            ]
        },

        pluck: {
            harmony: "keys",
            channel: music.ENUMS.channels.pluck,
            envelope:{a:0, d:0, s:1, r:0.1},
            samples:[
                {freq:music.ENUMS.keyFreqs.A1,   sample:"pluck_A1"},
                {freq:music.ENUMS.keyFreqs.A5,   sample:"pluck_A5"},
                {freq:music.ENUMS.keyFreqs.A6,   sample:"pluck_A6"},
                {freq:music.ENUMS.keyFreqs.A7,   sample:"pluck_A7"},
                {freq:music.ENUMS.keyFreqs.B2,   sample:"pluck_B2"},
                {freq:music.ENUMS.keyFreqs.C4,   sample:"pluck_C4"},
                {freq:music.ENUMS.keyFreqs.E1,   sample:"pluck_E1"},
                {freq:music.ENUMS.keyFreqs.E3,   sample:"pluck_E3"},
                {freq:music.ENUMS.keyFreqs.G2,   sample:"pluck_G2"}
            ]
        },
        ping: {
            harmony: "keys",
            channel: music.ENUMS.channels.ping,
            envelope:{a:0, d:0, s:1, r:0.1},
            samples:[
                {freq:music.ENUMS.keyFreqs.A1,   sample:"ping_A1"  },
                {freq:music.ENUMS.keyFreqs.A5,   sample:"ping_A5"  },
                {freq:music.ENUMS.keyFreqs.A6,   sample:"ping_A6"  },
                {freq:music.ENUMS.keyFreqs.A7,   sample:"ping_A7"  },
                {freq:music.ENUMS.keyFreqs.B2,   sample:"ping_B2"  },
                {freq:music.ENUMS.keyFreqs.C4,   sample:"ping_C4"  },
                {freq:music.ENUMS.keyFreqs.E1,   sample:"ping_E1"  },
                {freq:music.ENUMS.keyFreqs.E3,   sample:"ping_E3"  },
                {freq:music.ENUMS.keyFreqs.G2,   sample:"ping_G2"  }
            ]
        },

        pads: {
            harmony: "keys",
            channel: music.ENUMS.channels.pads,
            envelope:{a:0.3, d:0, s:1, r:1.8},
            samples:[
                {freq:music.ENUMS.keyFreqs.A0,   sample:"pad_A0" },
                {freq:music.ENUMS.keyFreqs.E0,   sample:"pad_E0" },
                {freq:music.ENUMS.keyFreqs.C1,   sample:"pad_C1" },
                {freq:music.ENUMS.keyFreqs.B2,   sample:"pad_B2" },
                {freq:music.ENUMS.keyFreqs.G2,   sample:"pad_G2" },
                {freq:music.ENUMS.keyFreqs.D3,   sample:"pad_D3" },
                {freq:music.ENUMS.keyFreqs.A4,   sample:"pad_A4" },
                {freq:music.ENUMS.keyFreqs.E4,   sample:"pad_E4" }
            ]
        },

        choir: {
            harmony: "lead",
            channel: music.ENUMS.channels.choir,
            envelope:{a:1.7, d:0, s:1, r:1.9},
            samples:[
                {freq:music.ENUMS.keyFreqs.A1,   sample:"voice_A1"},
                {freq:music.ENUMS.keyFreqs.E1,   sample:"voice_E1"},
                {freq:music.ENUMS.keyFreqs.C2,   sample:"voice_C2"},
                {freq:music.ENUMS.keyFreqs.B3,   sample:"voice_B3"},
                {freq:music.ENUMS.keyFreqs.G3,   sample:"voice_G3"},
                {freq:music.ENUMS.keyFreqs.D4,   sample:"voice_D4"},
                {freq:music.ENUMS.keyFreqs.A5,   sample:"voice_A5"},
                {freq:music.ENUMS.keyFreqs.E5,   sample:"voice_E5"}
            ]
        },

        bell: {
            harmony: "keys",
            channel: music.ENUMS.channels.bell,
            envelope:{a:0, d:0, s:1, r:3.1},
            samples:[
                {freq:music.ENUMS.keyFreqs.A1,   sample:"bell_A0",   trig:"bell_A0_trig"},
                {freq:music.ENUMS.keyFreqs.E1,   sample:"bell_E0",   trig:"bell_E0_trig"},
                {freq:music.ENUMS.keyFreqs.A2,   sample:"bell_A1",   trig:"bell_A1_trig"},
            //    {freq:music.ENUMS.keyFreqs.E2,   sample:"bell_E1",   trig:"bell_E1_trig"},

            ]
        }
    };
    return instruments;
};