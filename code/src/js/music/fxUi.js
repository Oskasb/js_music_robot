FxUi = function() {

};

FxUi.prototype.openModule = function(parentElement) {
    this.createEffectControls();

    this.infoElement = ui.domHandler.createDivElement(parentElement.id, "synth_ui_info", "synth info here", "wave_synth_info")
    this.gridFrame = ui.domHandler.createDivElement(parentElement.id, "synth_ui_grid_frame", "", "wave_synth_grid_frame")


};

FxUi.prototype.createEffectControls = function() {
    this.effects = music.musicMix.getEffectSends();
};


FxUi.prototype.tick = function() {

};