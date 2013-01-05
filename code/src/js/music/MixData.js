MixData = function() {
    this.mixes = {};
    this.buildMixes();

};

MixData.prototype.getMixData = function(mixId) {
    console.log(this.mixes, mixId)
    return this.mixes[mixId];
};

MixData.prototype.buildMixes = function() {
    for (index in music.ENUMS.mixes) {
        this.addMix(music.ENUMS.mixes[index]);
    }
};

MixData.prototype.addMix = function(mixId) {
    this.mixes[mixId] = this.mixChannlels(mixId)
    console.log(mixId, this.mixes[mixId]);
};



MixData.prototype.mixChannlels = function(mixId) {
    var channels = music.ENUMS.channels;
    var mixChannels = {};

    var zeroAll = {};
    for (index in channels) this.addMixValues(zeroAll, channels[index], 0,     0, 22000, 1, {});
    mixChannels[music.ENUMS.mixes.ZeroOut] = zeroAll;

    var maxAll = {};
    for (index in channels) this.addMixValues(maxAll, channels[index], 100,   0, 22000, 1, {Delay1: 1, Delay2:1, Verb2: 1, Verb1: 1});
    mixChannels[music.ENUMS.mixes.MaxOut] = maxAll;

    mixA = {};
    for (index in channels) this.addMixValues(mixA, channels[index], 20, 0, 12000, 1, {});
    mixChannels[music.ENUMS.mixes.Start] = mixA;

    mix1 = {};
    this.addMixValues(mix1, channels.kick , 60,   -0.6, 3000,     3, {Delay1: 0.8, Delay2: 0.8});
    this.addMixValues(mix1, channels.snare, 70,   0.7,  1200,     7, {Delay1: 0.8, Delay2:0.5, Verb2: 0.4, Verb1: 0.6});
    this.addMixValues(mix1, channels.toms ,  0,   0,   14000,     2, {Verb1: 0.4});
    this.addMixValues(mix1, channels.hat  , 22,   -0.4, 3000,     1, {Delay1:0.89, Delay2:0.6});
    this.addMixValues(mix1, channels.ohs  , 50,   0,    3000,     1, {Verb2:0.7} );
    this.addMixValues(mix1, channels.perc , 42,   -0.4, 6000,     1, {Delay1: 0.8, Delay2:0.9});
    this.addMixValues(mix1, channels.bass , 35,   0,     330,     3, {});
    this.addMixValues(mix1, channels.saw  ,  0,   0,    1200,     1, {Delay1:0.4, Delay2:0.7});
    this.addMixValues(mix1, channels.arp  ,  0, 0.7,    9600,     4, {Delay1:0.4, Delay2:0.7});
    this.addMixValues(mix1, channels.pluck, 50,-0.3,    1200,     1, {Delay1:0.6});
    this.addMixValues(mix1, channels.ping ,  0,   0,   12000,     1, {Delay1: 0.5});
    this.addMixValues(mix1, channels.bell , 45,   0,   22000,     1, {});
    this.addMixValues(mix1, channels.pads , 16,-0.3,   16000,     3, {Verb1: 0.7, Delay1:0.4, Delay2:0.7});
    this.addMixValues(mix1, channels.choir, 17, 0.5,   16000,     3, {Verb2: 0.5, Delay1:0.8, Delay2:0.7});
    mixChannels[music.ENUMS.mixes.IntroMix] = mix1;


    hero = {};
    this.addMixValues(hero, channels.kick , 80,   -0.4, 3000,     3, {Delay1: 0.8, Delay2: 0.8});
    this.addMixValues(hero, channels.snare, 60,   0.7,  1200,     7, {Delay1: 0.8, Delay2:0.5, Verb2: 0.4, Verb1: 0.6});
    this.addMixValues(hero, channels.toms ,  0,   0,   14000,     2, {Verb1: 0.4});
    this.addMixValues(hero, channels.hat  , 42,   0.4,  3000,     1, {Delay1:0.39, Delay2:0.4});
    this.addMixValues(hero, channels.ohs  , 50,   0,    3000,     1, {Verb2:0.7} );
    this.addMixValues(hero, channels.perc , 42,   -0.7, 5000,     1, {Delay1: 0.8, Delay2:0.9});
    this.addMixValues(hero, channels.bass , 52,   0,     330,     3, {});
    this.addMixValues(hero, channels.saw  , 12,   0,    3200,     1, {Delay1:0.6, Delay2:0.5});
    this.addMixValues(hero, channels.gtr  ,  8,   0,    1300,   0.8, {Delay1: 0.8, Delay2:0.5, Verb2: 0.4, Verb1: 0.6} );
    this.addMixValues(hero, channels.arp  ,  0,-0.3,    9600,     4, {Delay1:0.4, Delay2:0.7});
    this.addMixValues(hero, channels.pluck, 30, 0.3,   21200,     1, {Delay1:0.7, Delay2:0.5});
    this.addMixValues(hero, channels.ping , 20,   0,   12000,     1, {Delay1: 0.5, Delay1: 0.5});
    this.addMixValues(hero, channels.bell , 70,   0,   22000,     1, {});
    this.addMixValues(hero, channels.pads , 60,-0.3,   16000,     3, {Verb1: 0.5, Delay1:0.4, Delay2:0.7});
    this.addMixValues(hero, channels.choir, 45, 0.5,   16000,     3, {Verb1: 0.5, Delay1:0.8, Delay2:0.7});
    mixChannels[music.ENUMS.mixes.HeroMix] = hero;

    indo = {};
    this.addMixValues(indo, channels.kick ,100,    0,     6200 ,   10,{});
    this.addMixValues(indo, channels.snare, 90,    0,    11000,    11,{});
    this.addMixValues(indo, channels.toms , 50,    0,    12000,    4, {});
    this.addMixValues(indo, channels.hat  , 70, -0.5,    13000,    5, {}       );
    this.addMixValues(indo, channels.ohs  , 50,    0,    10000,    8, {Verb1:0.9, Verb2:0.9} );
    this.addMixValues(indo, channels.perc , 70,    0,     8000,    2, {Delay2:0.7, Delay1:0.6});
    this.addMixValues(indo, channels.bass  ,60,    0,      220,   11, {});
    this.addMixValues(indo, channels.saw  , 60,    0,    10000,    2, {} );
    this.addMixValues(indo, channels.gtr  ,  7,    0,     3000,    1, {Delay1: 0.8, Delay2:0.5, Verb2: 0.4, Verb1: 0.6} );
    this.addMixValues(indo, channels.arp  ,100, -0.4,    11000,    9, {} );
    this.addMixValues(indo, channels.pluck, 20,  0.6,    24000,    1, {Delay2:0.7} );
    this.addMixValues(indo, channels.ping ,  0, -0.8,    6000 ,    5, {Delay1:0.4} );
    this.addMixValues(indo, channels.bell ,  0,    0,    11000,    6, {Verb1:0.7, Verb2: 0.8});
    this.addMixValues(indo, channels.pads ,  0,  0.6,    24000,    1, {}       );
    this.addMixValues(indo, channels.choir,  0, -0.6,    24000,    1, {}       );
    this.addMixValues(indo, channels.ws   , 90,    0,    24000,    1, {Verb2:0.8} );
    mixChannels[music.ENUMS.mixes.indoMix] = indo;

    mix2 = {};
    this.addMixValues(mix2, channels.kick , 50,   -0.4, 3000,     3, {Delay1: 1});
    this.addMixValues(mix2, channels.snare, 50,   0.7,  1200,     7, {Delay1: 0.6, Delay2:0.7, Verb2: 0.4, Verb1: 0.6});
    this.addMixValues(mix2, channels.toms ,  0,   0,   14000,     2, {Verb1: 0.4});
    this.addMixValues(mix2, channels.hat  , 22,   0.4,  5000,     1, {Delay1:0.3, Delay2:0.2});
    this.addMixValues(mix2, channels.ohs  , 30,   0,    7000,     1, {Verb2:0.7} );
    this.addMixValues(mix2, channels.perc , 72,   -0.3, 5000,     1, {Delay1: 0.7, Delay2:0.6});
    this.addMixValues(mix2, channels.bass , 65,   0,    5750,     4, {});
    this.addMixValues(mix2, channels.saw  ,  0,   0,    4200,     1, {});
    this.addMixValues(mix2, channels.arp  , 55, 0.3,    4600,     4, {Delay1:0.8, Delay2:0.7});
    this.addMixValues(mix2, channels.pluck, 60,-0.3,   21200,     1, {Delay1:0.6});
    this.addMixValues(mix2, channels.ping , 70,   0,   12000,     1, {Delay1: 0.5});
    this.addMixValues(mix2, channels.bell , 50,   0,   22000,     1, {Verb2: 0.7});
    this.addMixValues(mix2, channels.pads , 25,   0,   16000,     3, {Verb1: 0.5, Delay1:0.4, Delay2:0.7});
    this.addMixValues(mix2, channels.choir, 35, 0.8,   16000,     3, {Verb1: 0.5, Delay1:0.4, Delay2:0.7});

    mixChannels[music.ENUMS.mixes.Electro] = mix2;

    mix3 = {};
    this.addMixValues(mix3, channels.kick ,100,    0,    8000 ,    8, {});
    this.addMixValues(mix3, channels.snare, 95,    0,    11000,    11,{Verb2:0.2} );
    this.addMixValues(mix3, channels.toms , 90,    0,    12000,    4, {});
    this.addMixValues(mix3, channels.hat  , 35, -0.3,    13000,    5, {}       );
    this.addMixValues(mix3, channels.ohs  , 80,    0,    15000,    8, {Verb1:0.9, Verb2:0.9} );
    this.addMixValues(mix3, channels.perc , 75,    0,     7000,    2, {Delay2:0.7, Verb2:0.6});
    this.addMixValues(mix3, channels.bass , 95,    0,      250,    6, {});
    this.addMixValues(mix3, channels.saw ,  90, -0.1,    11000,    5, {Delay1:0.4, Delay2:0.4} );
    this.addMixValues(mix3, channels.gtr  , 14,  0.4,    1800,   0.8, {Delay1: 0.7, Delay2:0.4, Verb2: 0.8, Verb1: 0.9} );
    this.addMixValues(mix3, channels.arp  , 30, -0.4,    24000,    1, {} );
    this.addMixValues(mix3, channels.pluck, 70,  0.6,    24000,    1, {Delay1:0.8, Delay2:0.7} );
    this.addMixValues(mix3, channels.ping ,  0, -0.8,    6000 ,    5, {Delay1:0.4} );
    this.addMixValues(mix3, channels.bell ,  0,    0,    11000,    6, {Verb1:0.7, Verb2: 0.8});
    this.addMixValues(mix3, channels.pads , 45, -0.3,    24000,    1, {Delay1: 0.7, Delay2:0.4, Verb2: 0.8, Verb1: 0.9} );
    this.addMixValues(mix3, channels.choir, 60,  0.6,    24000,    1, {}       );
    this.addMixValues(mix3, channels.ws   , 90,    0,    24000,    1, {Verb2:0.8} );
    mixChannels[music.ENUMS.mixes.DiscoMix] = mix3;

    mix4 = {};
    this.addMixValues(mix4, channels.kick , 80,    0,    8000 ,    8, {});
    this.addMixValues(mix4, channels.snare, 90,    0,    11000,    11,{Verb1:0.4});
    this.addMixValues(mix4, channels.toms , 50,    0,    12000,    4, {Verb1: 0.4});
    this.addMixValues(mix4, channels.hat  , 70, -0.5,    13000,    5, {}       );
    this.addMixValues(mix4, channels.ohs  , 70,    0,    15000,    8, {Verb1:0.9, Verb2:0.9} );
    this.addMixValues(mix4, channels.perc , 70,    0,     6000,    3, {Verb2:0.6});
    this.addMixValues(mix4, channels.bass , 90,    0,      930,    1, {});
    this.addMixValues(mix4, channels.gtr  , 14,  0.4,     3200,  1.8, {Delay1: 0.7, Delay2:0.4, Verb2: 0.8, Verb1: 0.9} );
    this.addMixValues(mix4, channels.saw ,  40, -0.4,    14000,    2, {Delay2: 0.6});
    this.addMixValues(mix4, channels.arp  , 50,  0.4,    13000,    2, {Delay1:0.7} );
    this.addMixValues(mix4, channels.pluck, 50,  0.6,    24000,    1, {Delay2:0.7} );
    this.addMixValues(mix4, channels.ping ,  0, -0.8,    6000 ,    5, {Delay1:0.4} );
    this.addMixValues(mix4, channels.bell ,  0,    0,    11000,    6, {Verb1:0.7, Verb2: 0.8});
    this.addMixValues(mix4, channels.pads ,  0,  0.6,    24000,    1, {Verb1: 0.4});
    this.addMixValues(mix4, channels.choir,  0, -0.6,    24000,    1, {}       );
    this.addMixValues(mix4, channels.ws   , 90,    0,    24000,    1, {Verb2:0.8} );


    mixChannels[music.ENUMS.mixes.LilMix] = mix4;

    mix5 = {};
    this.addMixValues(mix5, channels.kick ,100,    0,    7400 ,    8, {});
    this.addMixValues(mix5, channels.snare, 90,    0,    11000,    11,{Verb1:0.4});
    this.addMixValues(mix5, channels.toms , 80,    0,     8000,    4, {Verb1: 0.6, Verb2: 0.8});
    this.addMixValues(mix5, channels.hat  , 70, -0.5,    13000,    5, {}       );
    this.addMixValues(mix5, channels.ohs  , 90,    0,    15000,    3, {Verb1:0.9, Verb2:0.9} );
    this.addMixValues(mix5, channels.perc , 70,    0,     7000,    1, {Verb2:0.6});
    this.addMixValues(mix5, channels.bass ,100,    0,      260,    3, {});
    this.addMixValues(mix3, channels.gtr  , 24,  0.4,    1800,   0.8, {Delay1: 0.7, Delay2:0.4, Verb2: 0.8, Verb1: 0.9} );
    this.addMixValues(mix5, channels.saw ,  90,    0,     9000,    5, {Delay2:0.3});
    this.addMixValues(mix5, channels.arp  , 60, -0.4,    24000,    2, {Delay1:0.7} );
    this.addMixValues(mix5, channels.pluck, 50,  0.6,    24000,    1, {Delay2:0.7} );
    this.addMixValues(mix5, channels.ping ,  0, -0.8,    6000 ,    5, {Delay1:0.4} );
    this.addMixValues(mix5, channels.bell ,  0,    0,    11000,    6, {Verb1:0.7, Verb2: 0.8});
    this.addMixValues(mix5, channels.pads ,  0,  0.6,    24000,    1, {Verb1: 0.4});
    this.addMixValues(mix5, channels.choir,  0, -0.6,    24000,    1, {}       );
    this.addMixValues(mix5, channels.ws   , 90,    0,    24000,    1, {Verb2:0.8} );
    mixChannels[music.ENUMS.mixes.HeavyMix] = mix5;

    mix6 = {};
    this.addMixValues(mix6, channels.kick , 60,    0,      140,  0.4, {});
    this.addMixValues(mix6, channels.snare, 50,    0,     2000,    2, {Delay1:0.7, Delay2: 0.8});
    this.addMixValues(mix6, channels.toms , 80,    0,     8000,    4, {Verb1: 0.6, Verb2: 0.8});
    this.addMixValues(mix6, channels.hat  ,  0, -0.5,    13000,    5, {}       );
    this.addMixValues(mix6, channels.ohs  ,  0,    0,    15000,    3, {Verb1:0.9, Verb2:0.9} );
    this.addMixValues(mix6, channels.perc , 40,    0,     4000,    1, {Delay1:0.7, Delay2: 0.8});
    this.addMixValues(mix6, channels.bass ,  0,    0,      360,    1, {});
    this.addMixValues(mix6, channels.saw ,   0,    0,     9000,    5, {Delay2:0.3});
    this.addMixValues(mix6, channels.arp  , 14, -0.4,    24000,    2, {Delay1:0.7, Delay2:0.7} );
    this.addMixValues(mix6, channels.pluck, 45,  0.3,    24000,    1, {Delay2:0.7} );
    this.addMixValues(mix6, channels.ping , 70,  0.4,    16000,    5, {Delay1:0.7, Delay2: 0.8} );
    this.addMixValues(mix6, channels.bell , 50,    0,    13000,    6, {});
    this.addMixValues(mix6, channels.pads , 15,  0.6,    24000,    1, {});
    this.addMixValues(mix6, channels.choir, 35, -0.2,    24000,    1, {}       );
    this.addMixValues(mix6, channels.ws   , 90,    0,    24000,    1, {} );
    mixChannels[music.ENUMS.mixes.PingMix] = mix6;

    mix7 = {};
    this.addMixValues(mix7, channels.kick , 60, 0.6, 2000 ,    2, {Verb1:0.4, Delay1:0.4, Delay2: 0.8});
    this.addMixValues(mix7, channels.snare, 40, 0.5,  4000,    3, {Verb2:0.3, Delay1:1, Delay2: 1});
    this.addMixValues(mix7, channels.toms , 30, 0.7, 3000,     1, {Delay2: 0.8});
    this.addMixValues(mix7, channels.hat  , 30, -0.5, 8000,    5, {}       );
    this.addMixValues(mix7, channels.ohs  , 30, 0,   24000,    1, {Verb2:0.7} );
    this.addMixValues(mix7, channels.perc ,  0, 0,   6000 ,    5, {Verb1:0.2});
    this.addMixValues(mix7, channels.bass , 30, 0,     230,    3, {});
    this.addMixValues(mix7, channels.saw ,  0, 0,   14000,    2, {Verb1: 0.4});
    this.addMixValues(mix7, channels.arp  ,  0, 0,   8000,     5, {}       );
    this.addMixValues(mix7, channels.pluck, 40, -0.9, 4000,    1, {Delay1:0.9 ,Delay2:0.2} );
    this.addMixValues(mix7, channels.ping , 40, 0.8, 16000 ,   5, {Delay2:0.8});
    this.addMixValues(mix7, channels.bell , 90, 0,   6000,    16, {Verb1:0.3, Verb2: 0.4});
    this.addMixValues(mix7, channels.pads , 30, 0.5, 24000,    1, {Verb1: 0.4});
    this.addMixValues(mix7, channels.choir, 50,-0.5, 24000,    1, {Delay1: 0.6});
    this.addMixValues(mix7, channels.ws   , 90, 0,   24000,    1, {Verb2:0.7} );


    mixChannels[music.ENUMS.mixes.SpacyMix] = mix7;

    return mixChannels[mixId]
};



MixData.prototype.addMixValues = function(mix, channelId, gain, pan, freq, Q, fx) {
    mix[channelId] = {};
    mix[channelId].mix = {};
    mix[channelId].mix[music.ENUMS.mix.gain] = gain;
    mix[channelId].mix[music.ENUMS.mix.pan] = pan;
    mix[channelId].mix[music.ENUMS.mix.frequency] = freq;
    mix[channelId].mix[music.ENUMS.mix.Q] = Q;
    mix[channelId].fx = fx;
};
