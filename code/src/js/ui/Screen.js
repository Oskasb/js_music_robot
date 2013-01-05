Screen = function() {

};

Screen.prototype.setupScreen = function() {

   var struct = ui.getElementStructure("game_screen");
   ui.createElement(struct, "game_screen");

   var struct = ui.getElementStructure("full_size");
   this.background = ui.createElement(struct, "input_parent");
   this.background.style.zIndex = 1;

    var struct = {
        parent:"input_parent",
        class:"full_size"
    };

    var inputSampler = ui.createElement(struct, "input_sampler");

    return inputSampler;
};

