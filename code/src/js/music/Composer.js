Composer = function() {
    this.setKeyOffset(0);
    this.setMode(0);
};

Composer.prototype.setKeyOffset = function(offset) {
    this.keyOffset = offset;
};

Composer.prototype.getKeyOffset = function() {
    return this.keyOffset;
};

Composer.prototype.setMode = function(offset) {
    this.modeOffset = offset;
};

Composer.prototype.getMode = function() {
    return this.modeOffset;
};

Composer.prototype.getMappedKey = function(key) {
    var offsetKeys = music.theory.getOffsetKeys(0) // this.getKeyOffset());
    var keyMap = music.theory.keyShiftedKeyMap(0) // this.getKeyOffset());


    var mappedKey = keyMap[offsetKeys[key]]
    return mappedKey;
};



Composer.prototype.getPhrazeKeys = function(ident, phaze) {

    var phrazeKeys = [
        this.getProgression([2, 2, 2, 1]),
        this.getProgression([0, 5, 2, 6]),
        this.getProgression([3, 5, 6, 2]),
        this.getProgression([6, 3, 5, 2])
    ];
    return phrazeKeys[phaze][ident];
};


Composer.prototype.getProgression = function(progression) {
    return [
        [this.getMappedKey(progression[0])],
        [this.getMappedKey(progression[1])],
        [this.getMappedKey(progression[2])],
        [this.getMappedKey(progression[3])]
    ]
};