DomHandler = function() {

};

DomHandler.prototype.removeDivElement = function(div) {
    div.parentNode.removeChild(div);
};


DomHandler.prototype.addDivClass = function(div, styleClass) {
    div.className += " "+styleClass
};


DomHandler.prototype.createDivElement = function(parentId, id, html, styleClass) {
    var parent = document.getElementById(parentId);
    var index = parent.getElementsByTagName("*");
    var newdiv = document.createElement('div', [index]);
    newdiv.setAttribute('id', id);
    newdiv.className = styleClass;

    if (html) {
        newdiv.innerHTML = html;
    }
    else {
        newdiv.innerHTML = "";
    }
    parent.appendChild(newdiv);

    return newdiv;
};




DomHandler.prototype.createSliderInputElement = function(parentId, id, valueName, parameter, value, min, max, onUpdateFunction, styleClass) {
//    console.log("Slider Value: ", value)
    var parent = document.getElementById(parentId);
    var index = parent.getElementsByTagName("*");
    var slider = document.createElement('input', [index]);
    var updateFunc = onUpdateFunction;

    slider.setAttribute('id', id);
    slider.setAttribute('type', "range");
    slider.setAttribute('min', min);
    slider.setAttribute('max', max);
    slider.setAttribute('value', value);
    slider.valueName = valueName;
    slider.setAttribute('name', parameter);

    sliderUpdate = function(e) {
        var elem = e.srcElement;
        updateFunc(elem.valueName, elem.name, elem.value, elem.max, elem.min);
    };

    slider.addEventListener("change", sliderUpdate);

    slider.className = styleClass;
    parent.appendChild(slider);
    return slider;
};

DomHandler.prototype.removeElement = function(element) {
    if (element.childNodes )
    {
        while ( element.childNodes.length >= 1 )
        {
            element.removeChild(element.firstChild);
        }
    }
    this.removeDivElement(element);
};
