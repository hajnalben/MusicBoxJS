var MusicBox = function () {

    // http://en.wikipedia.org/wiki/Piano_key_frequencies

    var self = this;
    var audio = new AudioContext();
    var scale = ["G#", "A", "A#", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G"];

    this.playNote = function (scaleNum, length, type) {

        var freq = getFrequency(scaleNum);

        console.log("Playing note: " + scale[scaleNum % scale.length] + "(" + scaleNum + ") on frequency: " + freq);

        var osc = audio.createOscillator();
        osc.frequency.value = freq;
        osc.type = type || "square";
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

    function getFrequency(scale) {
        return Math.pow(2, (scale - 49) / 12) * 440;
    }
};

var doScale = [0, 2, 4, 5, 7, 9, 11, 12];
var laScale = [0, 2, 3, 5, 7, 8, 11, 12];

var activeScale = doScale;

var mb = new MusicBox();
var tempo = 300;
var counter = 0;

var id = setInterval(function () {
    counter++;

    var scaleKey1 = getRandomInt(0, activeScale.length - 1);
    var scaleKey2 = getRandomInt(0, activeScale.length - 1);

    var key = 40 + activeScale[scaleKey1];
    var key2 = 40 + activeScale[scaleKey2];

    mb.playNote(key, tempo);
//    mb.playNote(key2, tempo);
    mb.playNote(key2 - 12, tempo);

    if (counter === 50) {
        clearInterval(id);
    }

}, tempo);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}