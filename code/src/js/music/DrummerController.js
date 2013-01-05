DrummerController = function() {
    this.initializeDrummer();
};

DrummerController.prototype.initializeDrummer = function() {
    var drumSamples = new DrumSamples();
    var list = drumSamples.sampleLists();
    console.log("Load list")
    music.drummerPatterns.setSampleList(list);
    this.setDrummerMode(music.ENUMS.drumBeats.introBeat)


};

DrummerController.prototype.getDrummerMode = function() {
    return music.drummerPatterns.getLoadedDrummerMode();
};

DrummerController.prototype.setDrummerMode = function(mode) {
    music.drummerPatterns.loadDrummerMode(mode);
};





