RiffPatterns = function() {

};

RiffPatterns.prototype.buildRiffTone = function(velocity, noteDuration, keys) {
    var tone = {
        velocity: velocity,
        duration: noteDuration,
        keys: keys
    };
    return tone;
};

RiffPatterns.prototype.riffData = function(pattern, speed) {
    var patterns = {};
    patterns[music.ENUMS.riffs.c1] = [{

        0:{
            0:this.buildRiffTone(0.6, 1/speed, [0])
        }

    }];
    patterns[music.ENUMS.riffs.c1_2] = [
        {
            0:{
                0:this.buildRiffTone(0.6, 1/speed, [0])
            }
        },
        {}
    ];
    patterns[music.ENUMS.riffs.c1_3] = [
        {},
        {
            0:{
                0:this.buildRiffTone(0.6, 1/speed, [0])
            }
        }
    ];
    patterns[music.ENUMS.riffs.c2] = [
        {
            0:{
                0:this.buildRiffTone(0.6, 1/speed, [2]   ),
                1:this.buildRiffTone(0.3, 1/speed, [0, 4])
            }
        }
    ];

    patterns[music.ENUMS.riffs.c3] = [
        {
            0:{

                0:this.buildRiffTone(0.5, 1/speed, [0, 4]),
                1:this.buildRiffTone(0.3, 1/speed, [2])
            }
        }
    ];

    patterns[music.ENUMS.riffs.c4] = [
            {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0, 3])
            }
        }
    ];

    patterns[music.ENUMS.riffs.cSus] = [
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[2]),
                2:this.buildRiffTone(0.3, 1/speed,[4]),
                3:this.buildRiffTone(0.2, 1/speed,[0])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0]),
                2:this.buildRiffTone(0.3, 1/speed,[2]),
                3:this.buildRiffTone(0.2, 1/speed,[3])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[2]),
                2:this.buildRiffTone(0.3, 1/speed,[4]),
                3:this.buildRiffTone(0.2, 1/speed,[2])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[3]),
                2:this.buildRiffTone(0.3, 1/speed,[5]),
                3:this.buildRiffTone(0.2, 1/speed,[3])
            }
        }

    ];


    patterns[music.ENUMS.riffs.dChord] = [
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                1:this.buildRiffTone(0.3, 0.6/speed,[4])
            },
            5:{
                1:this.buildRiffTone(0.2, 0.4/speed,[2])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                1:this.buildRiffTone(0.3, 0.6/speed,[2])
            },
            3:{
                1:this.buildRiffTone(0.2, 0.4/speed,[4])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            4:{
                1:this.buildRiffTone(0.3, 0.6/speed,[4])
            },
            2:{
                1:this.buildRiffTone(0.2, 0.4/speed,[2])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                1:this.buildRiffTone(0.3, 0.6/speed,[4])
            },
            1:{
                1:this.buildRiffTone(0.2, 0.4/speed,[2])
            }
        }

    ];

    patterns[music.ENUMS.riffs.r1] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                2:this.buildRiffTone(0.5, 1/speed,[2])

            },
            4:{
                1:this.buildRiffTone(0.5, 1/speed,[0,4]),
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },

            6:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            8:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            10:{
                1:this.buildRiffTone(0.5, 1/speed,[2]),
                2:this.buildRiffTone(0.5, 1/speed,[0,5])
            },
            12:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            },
            13:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            14:{
                1:this.buildRiffTone(0.5, 1/speed,[4]),
                2:this.buildRiffTone(0.5, 1/speed,[2,6])
            }
        }
    ];
    patterns[music.ENUMS.riffs.r2] = [
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.5, 1/speed,[0, 4])
            },
            4:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },

            6:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            8:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            9:{
                0:this.buildRiffTone(0.5, 1/speed,[2])
            },
            10:{
                0:this.buildRiffTone(0.5, 1/speed,[0,4])
            },

            12:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            13:{
                0:this.buildRiffTone(0.5, 1/speed,[2])
            },
            14:{
                0:this.buildRiffTone(0.5, 1/speed,[0, 6])
            },
            15:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            }
        }
    ];
    patterns[music.ENUMS.riffs.r3] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[6])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            4:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            8:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            9:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            10:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            11:{
                0:this.buildRiffTone(0.5, 1/speed,[5])
            },

            12:{
                0:this.buildRiffTone(0.5, 1/speed,[6])
            },
            13:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            14:{
                0:this.buildRiffTone(0.5, 1/speed,[3])
            },
            15:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            }
        }
    ];

    patterns[music.ENUMS.riffs.r4] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2]),
                2:this.buildRiffTone(0.4, 1/speed,[4])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[0, 4]),
                1:this.buildRiffTone(0.4, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2])
            }
        }
    ];

    patterns[music.ENUMS.riffs.r5] = [
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[1])
            },
            4:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            8:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            9:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            10:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            11:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },

            12:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            13:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            14:{
                1:this.buildRiffTone(0.5, 1/speed,[1])
            },
            15:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            }
        }
    ];

    patterns[music.ENUMS.riffs.p1] = [
            {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            9:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            }
        }
    ];

    patterns[music.ENUMS.riffs.trip1] = [
        {
            0:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.45, 1/speed,[0])
            },
            2:{
                0:this.buildRiffTone(0.5, 1.5/speed,[0])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.45, 1/speed,[0])
            },
            2:{
                1:this.buildRiffTone(0.3, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.45, 1.5/speed,[0])
            }
        }
    ];

    patterns[music.ENUMS.riffs.trip2] = [
        {
            0:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.45, 1.5/speed,[0])
            },
            2:{
                1:this.buildRiffTone(0.3, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.45, 1.5/speed,[0])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.45, 1/speed,[0])
            },
            2:{
                0:this.buildRiffTone(0.5, 1.5/speed,[0])
            }
        }
    ];

    patterns[music.ENUMS.riffs.p2] = [
            {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            4:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                0:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            }
        }
    ];

    patterns[music.ENUMS.riffs.p3] = [
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            4:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            5:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            7:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            }
        }
    ];

    patterns[music.ENUMS.riffs.p4] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            4:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            }
        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            2:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            4:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            }
        }
    ];
    patterns[music.ENUMS.riffs.b1] = [
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            4:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                "-1":this.buildRiffTone(0.5, 1/speed,[0])
            },
            6:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            8:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            9:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            10:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            11:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            12:{
              "-1":this.buildRiffTone(0.5, 1/speed,[0])
            },
            13:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            14:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            15:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            4:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                "-1":this.buildRiffTone(0.5, 1/speed,[0])
            },
            6:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            8:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            9:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            10:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            11:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            12:{
                "-1":this.buildRiffTone(0.5, 1/speed,[0])
            },
            13:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            14:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            15:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            }


        }

    ];

    patterns[music.ENUMS.riffs.b2] = [
        {
            0:{
                0:this.buildRiffTone(0.9, 1/(speed*1.5),[0])
            },
            1:{
                0:this.buildRiffTone(0.8, 1/speed,[0])
            },
            2:{
                1:this.buildRiffTone(0.4, 1/speed,[4])
            },
            3:{
                1:this.buildRiffTone(0.6, 1/(speed*1.5),[0])
            },
            4:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                "-1":this.buildRiffTone(0.7, 1/speed,[4])
            },
            6:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            8:{
                0:this.buildRiffTone(0.6, 1/(speed*1.5),[0])
            },
            9:{
                0:this.buildRiffTone(0.8, 1/speed,[0])
            },
            10:{
                "-1":this.buildRiffTone(0.5, 1/speed,[4])
            },
            11:{
                0:this.buildRiffTone(0.6, 1/speed,[4])
            },
            12:{
                0:this.buildRiffTone(0.5, 1/(speed*1.5),[0])
            },
            13:{
                1:this.buildRiffTone(0.7, 1/speed,[0])
            },
            14:{
                0:this.buildRiffTone(0.5, 1/(speed*1.5),[4])
            },
            15:{
                0:this.buildRiffTone(0.5, 1/(speed*1.5),[0])
            }
        }
    ];

    patterns[music.ENUMS.riffs.b3] = [
        {
            0:{
                0:this.buildRiffTone(0.9, 1/(speed*1.5),[0])
            },
            1:{
                0:this.buildRiffTone(0.8, 1/speed,[0])
            },
            2:{
                1:this.buildRiffTone(0.4, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.6, 1/(speed*1.5),[0])
            },
            4:{
             "-1":this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            }
        },
        {
            0:{
                0:this.buildRiffTone(0.9, 1/(speed*1.5),[0])
            },
            1:{
                "-1":this.buildRiffTone(0.8, 1/speed,[0])
            },
            2:{
                1:this.buildRiffTone(0.4, 1/speed,[0])
            },

            14:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            15:{
                0:this.buildRiffTone(0.6, 1/speed,[0])
            }
        }
    ];


    patterns[music.ENUMS.riffs.p6] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            0.5:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.5, 1/speed,[2])
            },
            4:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },
            4.5:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            5.5:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            }
        }
    ];

    patterns[music.ENUMS.riffs.p5] = [
            {
            0:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },
            1:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                3:this.buildRiffTone(0.45, 1/speed,[2])
            },
            4:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                1:this.buildRiffTone(0.56, 1/speed,[0])
            },
            8:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            9:{
                1:this.buildRiffTone(0.56, 1/speed,[2])
            },
            10:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            11:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },
            12:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            13:{
                0:this.buildRiffTone(0.56, 1/speed,[2])
            },
            14:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            15:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            }
        },
        {
            0:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },
            1:{
                2:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                3:this.buildRiffTone(0.45, 1/speed,[2])
            },
            4:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            7:{
                2:this.buildRiffTone(0.5, 1/speed,[4])
            },
            8:{
                1:this.buildRiffTone(0.56, 1/speed,[0])
            },
            9:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            10:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            11:{
                3:this.buildRiffTone(0.45, 1/speed,[0])
            },
            12:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            13:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            14:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            15:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            }
        }


    ];
    patterns[music.ENUMS.riffs.p7] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                2:this.buildRiffTone(0.45, 1/speed,[2])
            },
            4:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            7:{
                1:this.buildRiffTone(0.56, 1/speed,[0])
            },
            8:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            9:{
                1:this.buildRiffTone(0.56, 1/speed,[2])
            },
            10:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            11:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            12:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            13:{
                1:this.buildRiffTone(0.56, 1/speed,[2])
            },
            14:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            15:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            }
        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                2:this.buildRiffTone(0.45, 1/speed,[2])
            },
            4:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            5:{
                1:this.buildRiffTone(0.5, 1/speed,[4])
            },
            6:{
                2:this.buildRiffTone(0.5, 1/speed,[0])
            },
            7:{
                1:this.buildRiffTone(0.56, 1/speed,[4])
            },
            8:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            9:{
                1:this.buildRiffTone(0.56, 1/speed,[4])
            },
            10:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            11:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            12:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            },
            13:{
                0:this.buildRiffTone(0.5, 1/speed,[4])
            },
            14:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            15:{
                1:this.buildRiffTone(0.5, 1/speed,[2])
            }
        }
    ];

    patterns[music.ENUMS.riffs.lilRiff] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },

            6:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1, 6]),
                2:this.buildRiffTone(0.4, 1/speed,[1, 6])
            },
            7:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1, 6]),
                2:this.buildRiffTone(0.4, 1/speed,[1, 6])
            },
            8:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1, 6]),
                2:this.buildRiffTone(0.4, 1/speed,[1, 6])
            },
            9:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1]),
                2:this.buildRiffTone(0.4, 1/speed,[0, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[0])
            }


        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },

            6:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1, 6]),
                2:this.buildRiffTone(0.4, 1/speed,[1, 6])
            },
            7:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1, 6]),
                2:this.buildRiffTone(0.4, 1/speed,[1, 6])
            },
            8:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1, 6]),
                2:this.buildRiffTone(0.4, 1/speed,[1, 6])
            },
            9:{
                0:this.buildRiffTone(0.5, 1/speed,[4]),
                1:this.buildRiffTone(0.4, 1/speed,[1]),
                2:this.buildRiffTone(0.4, 1/speed,[0, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[0])
            }
        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },

            6:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            8:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            9:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            }
        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            1:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            2:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 3, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[3, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[3])
            },

            6:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            7:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            8:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 3, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[3, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[3])
            },

            10:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            11:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            12:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 2, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[2, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[2])
            },
            13:{
                1:this.buildRiffTone(0.5, 1/speed,[0, 3, 4]),
                2:this.buildRiffTone(0.4, 1/speed,[3, 4]),
                3:this.buildRiffTone(0.4, 1/speed,[3])
            },
        }
    ];

    patterns[music.ENUMS.riffs.lilBass] = [
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },

            6:{
                0:this.buildRiffTone(0.4, 1/speed,[4])
            },
            7:{
                0:this.buildRiffTone(0.4, 1/speed,[4])
            },
            8:{
                0:this.buildRiffTone(0.4, 1/speed,[4])
            },
            9:{
                0:this.buildRiffTone(0.4, 1/speed,[5])
            }


        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },

            6:{
                0:this.buildRiffTone(0.4, 1/speed,[5])
            },
            7:{
                0:this.buildRiffTone(0.4, 1/speed,[5])
            },
            8:{
                0:this.buildRiffTone(0.4, 1/speed,[5])
            },
            9:{
                0:this.buildRiffTone(0.4, 1/speed,[6])
            }

        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },

            6:{
                1:this.buildRiffTone(0.4, 1/speed,[0])
            },
            7:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            8:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            9:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            }
        },
        {
            0:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },
            1:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            2:{
                0:this.buildRiffTone(0.5, 1/speed,[0])
            },
            3:{
                1:this.buildRiffTone(0.5, 1/speed,[0])
            },

            6:{
                1:this.buildRiffTone(0.4, 1/speed,[0])
            },
            7:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            8:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            9:{
                1:this.buildRiffTone(0.4, 1/speed,[0])
            },
            11:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            12:{
                0:this.buildRiffTone(0.4, 1/speed,[0])
            },
            13:{
                1:this.buildRiffTone(0.4, 1/speed,[1])
            }
        }
    ];

    return patterns[pattern];
};


