DrumSamples = function() {
    console.log("Load Lists")
};

DrumSamples.prototype.sampleLists = function() {
    var lists = {
        kick: {
            rock:["Kk"],
            synth:["Sk"],
            fat:["Kk", "Sk"]
        },
        snare: {
            sidestick:["SS"],
            flat:["Sn"],
            ring:["Sr"],
            fat:["Sn", "Sr"],
            dry:["Sn", "SS"]
        },
        hat: {
            closed:["h1"],
            bell:["h2"],
            open:["h3"],
            openBell:["h4"]
        },
        toms: {
            hi:["T1"],
            mid:["T2"],
            low:["T3"],
            floor:["T4"]
        },
        ohs: {
            ridebell:["Rb"],
            ridelight:["Rl"],
            Crash1:["C1"],
            Crash2:["C2"],
            Crash3:["C3"]
        },
        perc: {
            Tamb:["Ta"],
            Sh:  ["Sh"],
            Ts:  ["Ts"],
            Se:  ["Se"],
            He:  ["He"],
            Sp:  ["Sp"],
            Co:  ["Co"],
            Sc:  ["Sc"],
            Ti:  ["Ti"],
            Cp:  ["Cp"]
        }
    };
    console.log(lists);
    return lists;
};

