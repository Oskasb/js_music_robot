SoundManager = function() {
    this.sounds = {};
};

SoundManager.prototype.setupContext = function() {
    this.context = new AudioContext();
    var codec = this.determineCodec()
    this.setCodec(codec);
};

SoundManager.prototype.determineCodec = function() {
    var audio = new Audio();
    var codec;

    var canPlayOgg = !!audio.canPlayType && audio.canPlayType('audio/ogg') != "";
    var canPlayMp3 = !!audio.canPlayType && audio.canPlayType('audio/mp3') != "";
    if (canPlayOgg) {
        codec = "ogg";
        //    codec = "mp3"
    } else if (canPlayMp3) {
        codec = "mp3"
    } else {
        alert("Browser can not play the sounds needed for this game.")
    }
//    debug.log("Codec: "+codec)
    return codec;
};

SoundManager.prototype.setCodec = function(codec) {
    this.codec = codec;
};

SoundManager.prototype.getCodec = function() {
    return this.codec;
};

SoundManager.prototype.getContext = function() {
    return this.context;
};
SoundManager.prototype.getSounds = function() {
    return this.sounds;
};

SoundManager.prototype.soundList = function() {
    var path = "assets/audio/";
    var singleShots="assets/Loops/SingleShots/"

    var codec = "."+this.getCodec();
//    var codec = "."+"ogg";
    var sounds = {



        bass_A0:           {url:singleShots+"Bass/"+"bass_A1"           + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        bass_A1:           {url:singleShots+"Bass/"+"bass_A2"           + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        bass_E0:           {url:singleShots+"Bass/"+"bass_E1"           + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        bass_E1:           {url:singleShots+"Bass/"+"bass_E2"           + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        bass_A0_trig:      {url:singleShots+"Bass/"+"bass_A1_trig"      + codec, gain:1,    channel:"music",      options:{                                                  loop:false}},
        bass_A1_trig:      {url:singleShots+"Bass/"+"bass_A2_trig"      + codec, gain:1,    channel:"music",      options:{                                                  loop:false}},
        bass_E0_trig:      {url:singleShots+"Bass/"+"bass_E1_trig"      + codec, gain:1,    channel:"music",      options:{                                                  loop:false}},
        bass_E1_trig:      {url:singleShots+"Bass/"+"bass_E2_trig"      + codec, gain:1,    channel:"music",      options:{                                                  loop:false}},



        bell_A0:           {url:singleShots+"Bell/"+"bell_A0"            + codec, gain:1,    channel:"music",       options:{grain:{start:0.1,end:0.3},                       loop:false }},
        bell_E0:           {url:singleShots+"Bell/"+"bell_E0"            + codec, gain:1,    channel:"music",       options:{grain:{start:0.1,end:0.3},                       loop:false }},
        bell_A1:           {url:singleShots+"Bell/"+"bell_A1"            + codec, gain:1,    channel:"music",       options:{grain:{start:0.1,end:0.3},                       loop:false }},
        bell_A0_trig:      {url:singleShots+"Bell/"+"bell_A0_trig"       + codec, gain:1,    channel:"music",       options:{                                                 loop:false }},
        bell_E0_trig:      {url:singleShots+"Bell/"+"bell_E0_trig"       + codec, gain:1,    channel:"music",       options:{                                                 loop:false }},
        bell_A1_trig:      {url:singleShots+"Bell/"+"bell_A1_trig"       + codec, gain:1,    channel:"music",       options:{                                                 loop:false }},

        voice_A1:          {url:singleShots+"Voice/"+"voice_A1"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        voice_E1:          {url:singleShots+"Voice/"+"voice_E1"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        voice_C2:          {url:singleShots+"Voice/"+"voice_C2"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        voice_B3:          {url:singleShots+"Voice/"+"voice_B3"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        voice_G3:          {url:singleShots+"Voice/"+"voice_G3"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        voice_D4:          {url:singleShots+"Voice/"+"voice_D4"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        voice_A5:          {url:singleShots+"Voice/"+"voice_A5"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        voice_E5:          {url:singleShots+"Voice/"+"voice_E5"          + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_A0:            {url:singleShots+"Pad/"+"horn_A0"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_E0:            {url:singleShots+"Pad/"+"horn_E0"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_C1:            {url:singleShots+"Pad/"+"horn_C1"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_B2:            {url:singleShots+"Pad/"+"horn_B2"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_G2:            {url:singleShots+"Pad/"+"horn_G2"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_D3:            {url:singleShots+"Pad/"+"horn_D3"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_A4:            {url:singleShots+"Pad/"+"horn_A4"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        pad_E4:            {url:singleShots+"Pad/"+"horn_E4"             + codec, gain:1,    channel:"music",        options:{grain:{start:0.1,end:0.3},                      loop:false}},
        saw_A1:            {url:singleShots+"Saw/"+"saw_A1"              + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        saw_A4:            {url:singleShots+"Saw/"+"saw_A4"              + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        saw_A5:            {url:singleShots+"Saw/"+"saw_A5"              + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        saw_E1:            {url:singleShots+"Saw/"+"saw_E1"              + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        saw_E2:            {url:singleShots+"Saw/"+"saw_E2"              + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},
        saw_C3:            {url:singleShots+"Saw/"+"saw_C3"              + codec, gain:1,    channel:"music",      options:{grain:{start:0.1,end:0.3},                        loop:false}},


        hyper_A1:          {url:singleShots+"Pluck/"+"hyper_A1"          + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        hyper_A4:          {url:singleShots+"Pluck/"+"hyper_A4"          + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        hyper_A3:          {url:singleShots+"Pluck/"+"hyper_A3"          + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        hyper_A2:          {url:singleShots+"Pluck/"+"hyper_A2"          + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        hyper_E1:          {url:singleShots+"Pluck/"+"hyper_E1"          + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        hyper_A1_trig:     {url:singleShots+"Pluck/"+"hyper_A1_trig"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        hyper_A4_trig:     {url:singleShots+"Pluck/"+"hyper_A4_trig"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        hyper_A3_trig:     {url:singleShots+"Pluck/"+"hyper_A3_trig"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        hyper_A2_trig:     {url:singleShots+"Pluck/"+"hyper_A2_trig"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        hyper_E1_trig:     {url:singleShots+"Pluck/"+"hyper_E1_trig"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        gtr_E0:            {url:singleShots+"Gtr/"+"gtr_E0"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G0:            {url:singleShots+"Gtr/"+"gtr_G0"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B1:            {url:singleShots+"Gtr/"+"gtr_B1"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_D1:            {url:singleShots+"Gtr/"+"gtr_D1"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_E1:            {url:singleShots+"Gtr/"+"gtr_E1"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G1:            {url:singleShots+"Gtr/"+"gtr_G1"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B2:            {url:singleShots+"Gtr/"+"gtr_B2"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_D2:            {url:singleShots+"Gtr/"+"gtr_D2"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_E2:            {url:singleShots+"Gtr/"+"gtr_E2"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G2:            {url:singleShots+"Gtr/"+"gtr_G2"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B3:            {url:singleShots+"Gtr/"+"gtr_B3"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_E3:            {url:singleShots+"Gtr/"+"gtr_E3"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G3_:           {url:singleShots+"Gtr/"+"gtr_G3_"             + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B4:            {url:singleShots+"Gtr/"+"gtr_B4"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_D4:            {url:singleShots+"Gtr/"+"gtr_D4"              + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},

        gtr_E0_trig:       {url:singleShots+"Gtr/"+"gtr_E0_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G0_trig:       {url:singleShots+"Gtr/"+"gtr_G0_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B1_trig:       {url:singleShots+"Gtr/"+"gtr_B1_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_D1_trig:       {url:singleShots+"Gtr/"+"gtr_D1_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_E1_trig:       {url:singleShots+"Gtr/"+"gtr_E1_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G1_trig:       {url:singleShots+"Gtr/"+"gtr_G1_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B2_trig:       {url:singleShots+"Gtr/"+"gtr_B2_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_D2_trig:       {url:singleShots+"Gtr/"+"gtr_D2_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_E2_trig:       {url:singleShots+"Gtr/"+"gtr_E2_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G2_trig:       {url:singleShots+"Gtr/"+"gtr_G2_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B3_trig:       {url:singleShots+"Gtr/"+"gtr_B3_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_E3_trig:       {url:singleShots+"Gtr/"+"gtr_E3_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_G3__trig:      {url:singleShots+"Gtr/"+"gtr_G3__trig"        + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_B4_trig:       {url:singleShots+"Gtr/"+"gtr_B4_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},
        gtr_D4_trig:       {url:singleShots+"Gtr/"+"gtr_D4_trig"         + codec, gain:1,    channel:"music",       options:{  grain:{start:0.1,end:0.3},                      loop:false}},



        //       hyper_A1:          {url:singleShots+"Pluck/"+"hyper_A1"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
 //       hyper_A5:          {url:singleShots+"Pluck/"+"hyper_A5"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
 //       hyper_B2:          {url:singleShots+"Pluck/"+"hyper_B2"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
 //       hyper_C4:          {url:singleShots+"Pluck/"+"hyper_C4"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
 //       hyper_E1:          {url:singleShots+"Pluck/"+"hyper_E1"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
 //       hyper_E3:          {url:singleShots+"Pluck/"+"hyper_E3"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
 //       hyper_G2:          {url:singleShots+"Pluck/"+"hyper_G2"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},


        pluck_A1:          {url:singleShots+"Pluck/"+"pluck_A1"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_A5:          {url:singleShots+"Pluck/"+"pluck_A5"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_A6:          {url:singleShots+"Pluck/"+"pluck_A6"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_A7:          {url:singleShots+"Pluck/"+"pluck_A7"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_B2:          {url:singleShots+"Pluck/"+"pluck_B2"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_C4:          {url:singleShots+"Pluck/"+"pluck_C4"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_E1:          {url:singleShots+"Pluck/"+"pluck_E1"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_E3:          {url:singleShots+"Pluck/"+"pluck_E3"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        pluck_G2:          {url:singleShots+"Pluck/"+"pluck_G2"          + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_A1:           {url:singleShots+"Pluck/"+"bellstring_A1"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_A5:           {url:singleShots+"Pluck/"+"bellstring_A5"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_A6:           {url:singleShots+"Pluck/"+"bellstring_A6"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_A7:           {url:singleShots+"Pluck/"+"bellstring_A7"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_B2:           {url:singleShots+"Pluck/"+"bellstring_B2"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_C4:           {url:singleShots+"Pluck/"+"bellstring_C4"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_E1:           {url:singleShots+"Pluck/"+"bellstring_E1"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_E3:           {url:singleShots+"Pluck/"+"bellstring_E3"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
        ping_G2:           {url:singleShots+"Pluck/"+"bellstring_G2"     + codec, gain:1,    channel:"music",       options:{                                                  loop:false}},
         Crash:             {url:singleShots+"Perc/"+"Crash"             + codec, gain:1,    channel:"music",       options:{      mod:{p:0.12,g:0.5},                         loop:false}},
        CrashSmall:        {url:singleShots+"Perc/"+"CrashSmall"         + codec, gain:1,    channel:"music",       options:{      mod:{p:0.12,g:0.5},                         loop:false}},
        Crash2:            {url:singleShots+"Perc/"+"Crash2"             + codec, gain:1,    channel:"music",       options:{      mod:{p:0.12,g:0.5},                         loop:false}},
        RideBell:          {url:singleShots+"Perc/"+"RideBell"           + codec, gain:1,    channel:"music",       options:{      mod:{p:0.01,g:0.5},                         loop:false}},
        RideLight:         {url:singleShots+"Perc/"+"RideLight"          + codec, gain:1,    channel:"music",       options:{      mod:{p:0.01,g:0.5},                         loop:false}},
        HH_closed:         {url:singleShots+"Perc/"+"HH_closed"          + codec, gain:1,    channel:"music",       options:{      mod:{p:0.05,g:0.5},                         loop:false}},
        HH_closed_bell:    {url:singleShots+"Perc/"+"HH_closed_bell"     + codec, gain:1,    channel:"music",       options:{      mod:{p:0.00,g:0.5},                         loop:false}},
        HH_open:           {url:singleShots+"Perc/"+"HH_open"            + codec, gain:1,    channel:"music",       options:{      mod:{p:0.02,g:0.5},                         loop:false}},
        HH_open_bell:      {url:singleShots+"Perc/"+"HH_open_bell"       + codec, gain:1,    channel:"music",       options:{      mod:{p:0.00,g:0.5},                         loop:false}},

        SynthHat:          {url:singleShots+"Perc/"+"SynthHat"           + codec, gain:1,    channel:"music",       options:{      mod:{p:0.00,g:0.5},                         loop:false}},

        stick_elec:        {url:singleShots+"Perc/"+"stick_elec"         +codec , gain:1,    channel:"music",       options:{      mod:{p:0.01,g:0.5},                         loop:false}},
        hat_elec:          {url:singleShots+"Perc/"+"hat_elec"           +codec , gain:1,    channel:"music",       options:{      mod:{p:0.01,g:0.5},                         loop:false}},
        splash_short:      {url:singleShots+"Perc/"+"splash_short"       +codec , gain:1,    channel:"music",       options:{                                                  loop:false}},
        cow_light:         {url:singleShots+"Perc/"+"cow_light"          +codec , gain:1,    channel:"music",       options:{      mod:{p:0.05,g:0.5},                         loop:false}},
        tamb_short:        {url:singleShots+"Perc/"+"tamb_short"         +codec , gain:1,    channel:"music",       options:{      mod:{p:0.00,g:0.5},                         loop:false}},
        scratch_soft:      {url:singleShots+"Perc/"+"scratch_soft"       +codec , gain:1,    channel:"music",       options:{      mod:{p:0.02,g:0.5},                         loop:false}},
        tick_soft:         {url:singleShots+"Perc/"+"tick_soft"          +codec , gain:1,    channel:"music",       options:{      mod:{p:0.00,g:0.5},                         loop:false}},
        clap_low:          {url:singleShots+"Perc/"+"clap_low"           +codec , gain:1,    channel:"music",       options:{      mod:{p:0.00,g:0.5},                         loop:false}},


        Kick:              {url:singleShots+"Perc/"+"Kick"               + codec, gain:1,    channel:"music",       options:{       mod:{p:0.12,g:0.5},                       loop:false}},
        SynthKick:         {url:singleShots+"Perc/"+"SynthKick"          + codec, gain:1,    channel:"music",       options:{       mod:{p:0.12,g:0.5},                       loop:false}},
        SynthClap:         {url:singleShots+"Perc/"+"SynthClap"          + codec, gain:1,    channel:"music",       options:{       mod:{p:0.12,g:0.5},                       loop:false}},

        SideStick:         {url:singleShots+"Perc/"+"SideStick"          + codec, gain:1,    channel:"music",       options:{    mod:{p:0.22,g:0.5},                          loop:false}},
        Snare:             {url:singleShots+"Perc/"+"Snare"              + codec, gain:1,    channel:"music",       options:{    mod:{p:0.22,g:0.5},                          loop:false}},
        SnareRing:         {url:singleShots+"Perc/"+"SnareRing"          + codec, gain:1,    channel:"music",       options:{    mod:{p:0.07,g:0.5},                          loop:false}},
        Tamb:              {url:singleShots+"Perc/"+"Tamb"               + codec, gain:1,    channel:"music",       options:{      mod:{p:0.07,g:0.5},                        loop:false}},
        Tom1:              {url:singleShots+"Perc/"+"TomHi"              + codec, gain:1,    channel:"music",       options:{     mod:{p:0.12,g:0.5},                         loop:false}},
        Tom2:              {url:singleShots+"Perc/"+"TomMid"             + codec, gain:1,    channel:"music",       options:{     mod:{p:0.15,g:0.5},                         loop:false}},
        Tom3:              {url:singleShots+"Perc/"+"TomLo"              + codec, gain:1,    channel:"music",       options:{     mod:{p:0.12,g:0.5},                         loop:false}},
        Tom4:              {url:singleShots+"Perc/"+"TomRoot"            + codec, gain:1,    channel:"music",       options:{     mod:{p:0.15,g:0.5},                         loop:false}},

        open_chord :       {url:path+"ui/"+         "open_chord"            + codec, gain:0.8,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.03,g:0.1},    loop:false}},
        ui_hover   :       {url:path+"ui/"+         "blipp1"                + codec, gain:0.2,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.03,g:0.1},    loop:false}},
        ui_active  :       {url:path+"ui/"+         "blipp2"                + codec, gain:0.1,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.02,g:0.1},    loop:false}},
        ui_click   :       {url:path+"ui/"+         "blipp3"                + codec, gain:0.3,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.02,g:0.1},    loop:false}},
        ui_out     :       {url:path+"ui/"+         "blipp4"                + codec, gain:0.1,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.01,g:0.1},    loop:false}},
        ui_pressed  :      {url:path+"ui/"+         "HudPressed"            + codec, gain:0.3,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.02,g:0.1},    loop:false}},
        ui_zip     :       {url:path+"ui/"+         "HudZip"                + codec, gain:0.3,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.02,g:0.1},    loop:false}},
        ui_trig    :       {url:path+"ui/"+         "Softtrig"              + codec, gain:0.3,  channel:"sfx",          options:{ fx:{reverb:1},            mod:{p:0.02,g:0.1},    loop:false}},



    };

    return sounds;
};

SoundManager.prototype.loadXHR = function(id) {
//    debug.log("start XHR: "+id)
    var instance = this;
    var id = id;
    this.sounds[id].request = new XMLHttpRequest();
    this.sounds[id].request.open('GET', this.sounds[id].data.url, true);
    this.sounds[id].request.responseType = 'arraybuffer';

    // Decode asynchronously
    this.sounds[id].request.onload = function() {
        instance.decodeResponseData(id)
    };
    this.sounds[id].request.onreadystatechange = function() {
  //      debug.log("load progress: "+instance.sounds[id].request.readyState+" "+id)
        if (instance.sounds[id].request.readyState == 4) {
  //          instance.decodeResponseData(id)
        }
    };

    this.sounds[id].request.onError = function() {
  //      debug.log("load Error!: "+id)
    };

    this.sounds[id].request.send();

};

SoundManager.prototype.decodeResponseData = function(id) {
  //  debug.log("Start Decode: "+id)
    var instance = this;
    var id = id;
    var onError = function() {alert(this.getCodec()+" Sound Error!!")}

    this.context.decodeAudioData(instance.sounds[id].request.response, function(buffer) {
        instance.sounds[id].buffer = buffer;
        instance.progressFunction(0, 1);
    }, onError)

};

SoundManager.prototype.loadSound = function(sound, id) {
    var bufferLoad = null;
    var context = this.context;
//    console.log(sound)
    this.sounds[id] = {
        buffer: null,
        data:sound
    };

    this.loadXHR(id)

}

SoundManager.prototype.loadSoundList = function(sounds) {
    for (index in sounds) {
        this.progressFunction(1, 0);
        this.loadSound(sounds[index], index);
    }
};

SoundManager.prototype.setLoadProgressFunction = function(progFunc) {
    this.progressFunction = progFunc;
};
