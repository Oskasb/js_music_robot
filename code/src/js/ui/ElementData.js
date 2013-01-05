ElementData = function() {
    this.setupElementStructure();
};

ElementData.prototype.getElement = function(elementId) {
    var element = this.elementStructure[elementId];
    return element;
}

ElementData.prototype.setupElementStructure = function() {
    this.elementStructure = {
        game_screen:{
            parent:"viewport",
            class:"client"
        },
        full_size:{
            parent:"game_screen",
            class:"full_size"
        }
    }
}