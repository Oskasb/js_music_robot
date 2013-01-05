TouchListener = function() {
    this.releaseRange = 20;
};

TouchListener.prototype.registerClickableElement = function(element) {
    var clickEvent = new CustomEvent(
        "touchClick",
        {
            detail: {

            },
            bubbles: false,
            cancelable: true
        }
    );


    element.addEventListener("touchstart", function(e) {
            element.touch = e.touches[0];
            element.active = true;
            text += element.touch.target.id+" "+i+" <br>"


        element.dispatchEvent(clickEvent);
    }, false);

    element.addEventListener("touchend", function(e) {

        var endElem = document.elementFromPoint(element.touch.clientX, element.touch.clientY);
        if (e.srcElement.id == endElem.id) {

            element.dispatchEvent(clickEvent);
        } else {
            //        debug.log("Fire end inactive target")
        }

    }, false);

};

TouchListener.prototype.registerListeningElement = function(element) {
    var cancelEvent = new CustomEvent(
        "touchCancel",
        {
            detail: {},
            bubbles: true,
            cancelable: false
        }
    );

    var pressEvent = new CustomEvent(
        "touchPress",
        {
            detail: {

            },
            bubbles: false,
            cancelable: true
        }
    );

    var moveEvent = new CustomEvent(
        "touchMove",
        {
            detail: { },
            bubbles: false,
            cancelable: false
        }
    );


    element.addEventListener("touchstart", function(e) {
    //    e.stopPropagation();
        var text = ""
        for (var i = 0; i < e.touches.length; i++) {
            element.touch = e.touches[i];
            element.active = true;
            text += element.touch.target.id+" "+i+" <br>"
        }
   //     debug.log("touchstart "+text)
        element.dispatchEvent(pressEvent);

    }, false);

    element.addEventListener("touchmove", function(e) {
    //    var touch = element.touch;
     //   console.log(e)
    //    var targElem = document.elementFromPoint(touch.clientX, touch.clientY);
        element.dispatchEvent(moveEvent);

        /*
        if (targElem.id == element.id) {
        //    debug.log("Still on target!")
            //     debug.log("move steer: x/y "+ element.touch.clientX +" / "+ element.touch.clientY)
           element.dispatchEvent(moveEvent);
        } else {
            element.dispatchEvent(cancelEvent);
            element.active = false;
            console.log("End Touch!")
            debug.log(" --> Not on target!")
        }
        */
    }, false);


    element.addEventListener("touchend", function(e) {

        var endElem = document.elementFromPoint(element.touch.clientX, element.touch.clientY);
        if (e.srcElement.active) {
            element.dispatchEvent(cancelEvent);
        } else {
    //        debug.log("Fire end inactive target")
        }

    }, false);
};