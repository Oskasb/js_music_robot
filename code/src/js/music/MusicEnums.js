MusicEnums = function() {
    this.instruments = this.instrumentValues();
    this.channels = this.mixChannels();
    this.mix = this.mixValues();
    this.amKeys = this.aMinorKeys();
    this.aMap = this.aKeyMap();
    this.keyFreqs = this.keyFrequencies();
    this.riffs = this.riffPatterns();
    this.rythmPatterns = this.rythmPatterns();
    this.drumBeats = this.drumBeatModes();
    this.kits = this.drumKits();
    this.modes = this.modeMap();
    this.fx = this.fxNames();
    this.mixes = this.mixNames();
    this.phrases = this.phraseNames();
    this.drums = this.drumInstruments();
    this.tones = this.toneInstruments();
    this.score = this.scoreParts();
    this.arrangements = this.riffArrangements();
};

MusicEnums.prototype.scoreParts = function() {
    var parts = {
        intro:  "intro" ,
        disco:  "disco" ,
        indo:   "indo"  ,
        pingo:  "pingo" ,
        easy:   "easy"  ,
        Hero:   "Hero"  ,
        hard:   "hard"  ,
        heavy:  "heavy"

    };
    return parts;
};

MusicEnums.prototype.riffArrangements = function() {
    var parts = {
        bublArr  : "bublArr"  ,
        blipArr  : "blipArr"  ,
        lilArr   : "lilArr"   ,
        chordyArr: "chordyArr",
        heroArr  : "heroArr"  ,
        indoArr  : "indoArr"
    };
    return parts;
};

MusicEnums.prototype.instrumentValues = function() {
    var instruments = {
        kick:  "kick"  ,
        snare: "snare" ,
        toms:  "toms"  ,
        hat:   "hat"   ,
        ohs:   "ohs"   ,
        perc:  "perc"  ,
        bass:  "bass"  ,
        saw:   "saw"  ,
        arp:   "arp"   ,
        pluck: "pluck" ,
        ping:  "ping" ,
        bell:  "bell"  ,
        pads:  "pads"  ,
        choir: "choir"
    };
    return instruments;
};

MusicEnums.prototype.drumInstruments = function() {
    var instruments = {
        kick:  "kick"  ,
        snare: "snare" ,
        toms:  "toms"  ,
        hat:   "hat"   ,
        ohs:   "ohs"   ,
        perc:  "perc"
    };
    return instruments;
};

MusicEnums.prototype.toneInstruments = function() {
    var instruments = {
        bass:  "bass"  ,
        saw:   "saw"   ,
        gtr:   "gtr"   ,
        hyper: "hyper" ,
        pluck: "pluck" ,
        ping:  "ping"  ,
        bell:  "bell"  ,
        pads:  "pads"  ,
        choir: "choir"
    };
    return instruments;
};


MusicEnums.prototype.mixChannels = function() {
    var channels = {
        kick:  "Kick"    ,
        snare: "Snare"   ,
        toms:  "Toms"    ,
        hat:   "HiHat"   ,
        ohs:   "OvrHds"  ,
        perc:  "Percs"   ,
        bass:  "Bass"    ,
        gtr:   "Guitar"  ,
        saw:   "Saw"     ,
        arp:   "Arps"    ,
        pluck: "Pluck"   ,
        ping:  "Ping"    ,
        bell:  "Bell"    ,
        pads:  "Pads"    ,
        choir: "Choir"   ,
        ws:    "OscSynth"
    };
    return channels;
};

MusicEnums.prototype.mixValues = function() {
    var mix = {
        frequency:"frequency",
        Q:"Q",
        gain:"gain",
        pan:"pan"
    };
    return mix;
};

MusicEnums.prototype.aMinorKeys = function() {
    var keys = {
        k1:0,
        k2:1,
        k3:2,
        k4:3,
        k5:4,
        k6:5,
        k7:6
    };
    return keys;
};

MusicEnums.prototype.modeMap = function() {
    var keys = {
        M0:"Min",
        M1:"Locr",
        M2:"Maj",
        M3:"Dori",
        M4:"Phry",
        M5:"Lydi",
        M6:"Mixo",
        M7:"Harm"
    };
    return keys;
};

MusicEnums.prototype.riffPatterns = function() {
    var keys = {
        b1:"bassLine",
        b2:"bassArpLine2",
        b3:"bassArpHalf",
        trip1:"tripLine1",
        trip2:"tripLine2",
        r1:"rythmJump",
  //      r2:"rythmBar",
 //       r3:"rythmBarIndo",
        r4:"rythmTripChord",
        r5:"rythmTripRiff",
        lilRiff:"lilRiff",
        lilBass:"lilBass",
        c1:"baseNote",
        c1_2:"baseEven",
        c1_3:"baseOdd",
        c2:"fifth",
        c3:"triTone",
        c4:"fourth",
        cSus:"sus4tone",
        dChord:"discoChord",
        p1:"arpPluck",
        p2:"arpDown",
        p3:"arpUp",
        p4:"arpUp2",

        p5:"arpDownFull",
        p6:"arpDrills",
        p7:"discoArp"
    };
    return keys;
};

MusicEnums.prototype.drumKits = function() {
    var keys = {
        K1:"regularKit",
        K2:"synthKit"
    };
    return keys;
};

MusicEnums.prototype.drumBeatModes = function() {
    var keys = {
        introBeat :"introBeat" ,
        straight  :"straight"  ,
        rockBeat  :"rockBeat"  ,
        chillBeat :"chillBeat" ,
        metalBeat :"metalBeat" ,
        elecBeat  :"elecBeat"  ,
        indoBeat  :"indoBeat"
    };
    return keys;
};

MusicEnums.prototype.rythmPatterns = function() {
    var keys = {
        D0:"singleHit",
        D1:"straightBeat",
        D2:"doubleKicks",
        S1:"straightSnare",
        S2:"pushSnare",
        S3:"tailSnare",
        H1:"straightHat",
        R1:"straightRide",
        T1:"straightToms",
        Tamb1:"straightTamb",
        Fors:"fours",
        Eits:"eights",
        Trips:"tripples",
        Dubs:"doubles",
        Fill1:"fillOne"

    };
    return keys;
};

MusicEnums.prototype.aKeyMap = function() {
    var keys = {
        A:this.amKeys.k1,
        B:this.amKeys.k2,
        C:this.amKeys.k3,
        D:this.amKeys.k4,
        E:this.amKeys.k5,
        F:this.amKeys.k6,
        G:this.amKeys.k7
    };
    return keys;
};

MusicEnums.prototype.fxNames = function() {
    var keys = {
        Delay1:"Delay1",
        Delay2:"Delay2",
        Verb1:"Verb1",
        Verb2:"Verb2"
    };
    return keys;
};

MusicEnums.prototype.mixNames = function() {
    var keys = {
        ZeroOut:"ZeroOut",
        MaxOut:"MaxOut",
        Start:"Start",
        IntroMix:"IntroMix",
        HeroMix:"HeroMix",
        indoMix:"indoMix",
        Electro:"Electro",
        DiscoMix:"DiscoMix",
        LilMix:"LilMix",
        HeavyMix:"HeavyMix",
        PingMix:"PingMix",
        SpacyMix:"SpacyMix"
    };
    return keys;
};

MusicEnums.prototype.keyFrequencies = function() {
    var keys = {
        A0:27.5,
        E0:41.2,
        G0:49,
        A1:55,
        B1:61.74,
        D1:73.42,
        E1:82.41,
        F1:87.31,
        G1:98,
        A2:110,
        B2:123.47,
        E2:164.82,
        D2:146.83,
        G2:196,
        A3:220,
        B3:246.94,
        D3:293.66,
        E3:329.63,
        G3:392,
        G3_:415.3,
        A4:440,
        B4:493.88,
        C4:523.25,
        D4:587.32,
        E4:659.32,
        A5:880,
        E5:1318.64,
        A6:1760,
        A7:3520
    };
    return keys;
};

MusicEnums.prototype.phraseNames = function() {
    var keys = {
        intro   : "intro"  ,
        shifts  : "shifts" ,
        posci   : "posci"  ,
        majHarm : "majHarm",
        little  : "little" ,
        Hero    : "Hero"   ,
        indo    : "indo"
    };
    return keys;
};