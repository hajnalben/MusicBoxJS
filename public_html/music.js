var MusicBox = function () {

    // http://en.wikipedia.org/wiki/Piano_key_frequencies

    var self = this;
    var audio = new AudioContext();
    var keyNames = ["G#", "A", "A#", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G"];

    this.doScale = [0, 2, 4, 5, 7, 9, 11, 12];
    this.laScale = [0, 2, 3, 5, 7, 8, 11, 12];

    this.playNote = function (scaleNum, length, type) {

        var freq = getFrequency(scaleNum);

//        console.log("Playing note: " + keyNames[scaleNum % keyNames.length] + "(" + scaleNum + ") on frequency: " + freq);

        var osc = audio.createOscillator();

        osc.frequency.value = freq;
        osc.type = type || "square"; //sine, sawtooth, square, triangle
        osc.connect(audio.destination);
        osc.start(0);

        setTimeout(function () {
            osc.stop(0);
            osc.disconnect(audio.destination);
        }, length);
    };

    this.playMinor = function (scaleNum, length) {
        self.playNote(scaleNum, length);
        self.playNote(scaleNum + 3, length);
        self.playNote(scaleNum + 7, length);
    };

    this.playMajor = function (scaleNum, length) {
        self.playNote(scaleNum, length);
        self.playNote(scaleNum + 4, length);
        self.playNote(scaleNum + 7, length);
    };

    this.playDiminished = function (scaleNum, length) {
        self.playNote(scaleNum, length);
        self.playNote(scaleNum + 3, length);
        self.playNote(scaleNum + 6, length);
    };

    this.playAugmented = function (scaleNum, length) {
        self.playNote(scaleNum, length);
        self.playNote(scaleNum + 4, length);
        self.playNote(scaleNum + 8, length);
    };

    this.playRandomInScale = function () {

        var tempo = 300;
        var activeScale = mb.doScale;
        var counter = 0;
        var length = 30;
        var base = 41;


        var id = setInterval(function () {
            counter++;

            var scaleKey1 = getRandomInt(0, activeScale.length - 1);
            var scaleKey2 = getRandomInt(0, activeScale.length - 1);

            var key1 = base + activeScale[scaleKey1];
            var key2 = base + activeScale[scaleKey2];

            self.playNote(key1, tempo);
            self.playNote(key2 - 12, tempo);

            if (counter >= length) {
                clearInterval(id);
            }

        }, tempo);

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

    this.playSong = function (song) {

        var beat = 60 * 1000 / song.tempo;

        for (var i in song.parts) {

            var part = song.parts[i];

            part.index = part.index++ || 0;

            playNextNote(part);
        }

        function playNextNote(part) {

            var note = part.tune[part.index];

            if (!note) {
                console.log("Part is ended");

                return;
            }

            var notePitch = note[0];
            var noteLength = note[1] * beat;

            if (notePitch !== "-") {
                mb.playNote(notePitch, noteLength, part.type);
            }

            part.index++;

            setTimeout(function () {
                playNextNote(part);
            }, noteLength);
        }
    };

    function getFrequency(scale) {
        return Math.pow(2, (scale - 49) / 12) * 440;
    }
};

var bociboci = {
    tempo: 180,
    parts: [
        {
            tune: [
                [40, 1], [44, 1], [40, 1], [44, 1], [47, 2], [47, 2],
                [40, 1], [44, 1], [40, 1], [44, 1], [47, 2], [47, 2],
                [52, 1], [51, 1], [49, 1], [47, 1], [45, 2], [49, 2],
                [47, 1], [45, 1], [44, 1], [42, 1], [40, 2], [40, 2]
            ],
            type: "square"
        },
        {
            tune: [[35, 15], ["-", 1], [40, 8], [42, 4], [35, 4]],
            type: "sawtooth"
        },
        {
            tune: [[32, 15], ["-", 1], [37, 8], [39, 4], [32, 4]],
            type: "sawtooth"
        },
        {
            tune: [[28, 15], ["-", 1], [33, 8], [35, 4], [28, 4]],
            type: "sawtooth"
        }
    ]
};

var song = {
    tempo: 320,
    parts: [
        {
            tune: [
                [27, 12], [27, 2], [30, 2], 
                
                [28, 12], [36, 2], [35, 2], 
                
                [33, 12], [33, 2], [31, 2], 
                
                [30, 12], [24, 2], [26, 2], 
            ],
            type: "sawtooth"
        },
        {
            tune: [
                [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1],
                [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1],
                
                [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1],
                [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1],
                
                [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1],
                [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1], [52, 1], ["-", 1],
                
                [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1],
                [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1], [51, 1], ["-", 1],
            ],
            type: "square"
        },
        {
            tune: [
                [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1],
                [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1],
                
                [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1],
                [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1], [47, 1], ["-", 1],
                
                [48, 1], ["-", 1], [48, 1], ["-", 1], [48, 1], ["-", 1], [48, 1], ["-", 1],
                [48, 1], ["-", 1], [48, 1], ["-", 1], [48, 1], ["-", 1], [48, 1], ["-", 1],
                
                [49, 1], ["-", 1], [49, 1], ["-", 1], [49, 1], ["-", 1], [49, 1], ["-", 1],
                [49, 1], ["-", 1], [49, 1], ["-", 1], [49, 1], ["-", 1], [49, 1], ["-", 1],
            ],
            type: "square"
        },
        {
            tune: [
                [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1],
                [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1],
                
                [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1],
                [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1],
                
                [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1],
                [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1], [43, 1], ["-", 1],
                
                [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1],
                [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1], [42, 1], ["-", 1],
            ],
            type: "square"
        },
        {
            tune: [
                [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1],
                [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1],
                
                [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1],
                [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1],
                
                [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1],
                [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1], [40, 1], ["-", 1],
                
                [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1],
                [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1], [39, 1], ["-", 1],
            ],
            type: "square"
        }
    ]
};


var mb = new MusicBox();
mb.playSong(song);