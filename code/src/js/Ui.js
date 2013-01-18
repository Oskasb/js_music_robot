Ui = function() {

};

Ui.prototype.initScript = function() {
    this.screen = new Screen();
    this.setDomHandler(new DomHandler());
    this.setElementData(new ElementData());
    this.menuCreator = new MenuCreator();
};

Ui.prototype.setDomHandler = function(domHandler) {
    this.domHandler = domHandler;
};

Ui.prototype.setElementData = function(elementData) {
    this.elementData = elementData;
};

Ui.prototype.setScreenListener = function(element) {
    element.style.pointerEvents = "auto";
    element.style.zIndex = 6;
    this.screenListener = element;

};

Ui.prototype.getScreenListener = function() {
    return this.screenListener;
};

Ui.prototype.setupScreen = function() {
    var inputElement = this.screen.setupScreen();
    this.setScreenListener(inputElement);
};

Ui.prototype.showLoadingScreen = function() {
    this.currentMenu = this.menuCreator.createLoadingScreen();
};


Ui.prototype.addElementClickFunction = function(element, cFunc) {
    ui.registerInputSoundElement(element, "ui_hover", "ui_active", "ui_click", "ui_out");
 //   element.onclick = cFunc
    element.addEventListener("click", cFunc)
//    element.addEventListener("touchClick", cFunc)
};

Ui.prototype.getElementStructure = function(elementId) {
    var elemStruct = this.elementData.getElement(elementId);
    return elemStruct;
};

Ui.prototype.createElement = function(elementStructure, elementId) {
    var element = this.buildElement(elementStructure, elementId)
    return element;
};

Ui.prototype.buildElement = function(struct, id) {
    var element = this.domHandler.createDivElement(struct.parent, id, "", struct.class)
    this.domHandler.addDivClass(element, "game_base")
    return element;
};

Ui.prototype.registerInputSoundElement = function(element, hover, active, click, out) {

    element.addEventListener("mouseover", function() {
        client.soundPlayer.playSound(hover);
    }, false)

    element.addEventListener("mousedown", function() {
        client.soundPlayer.playSound(active);
    }, false)

    element.addEventListener("mouseout", function() {
        client.soundPlayer.playSound(out);
    }, false)

    element.addEventListener("click", function() {
        client.soundPlayer.playSound(click);
    }, false)


    element.addEventListener("touchmove", function() {
    //    debug.log("Touch Move "+new Date().getTime())
    //    client.soundPlayer.playSound(hover);
    }, false)

    element.addEventListener("touchstart", function() {
    //    debug.log("Touch Start")
        client.soundPlayer.playSound(active);
    }, false)

    element.addEventListener("touchcancel", function() {
    //    debug.log("Touch Cancel")
        client.soundPlayer.playSound(out);
    }, false)
  /*
    element.addEventListener("click", function() {
        client.soundPlayer.playSound(click);
    })
  */
//   console.log(element)

};

