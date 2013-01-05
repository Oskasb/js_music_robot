MenuCreator = function() {

};

MenuCreator.prototype.createLoadingScreen = function() {
    var rootElement = ui.domHandler.createDivElement("input_parent", "loadingScreen", "", "full_size")
    rootElement.style.zIndex = 1000;
    var imageContainer = ui.domHandler.createDivElement("loadingScreen", "imageContainer", "Loading Music Robot", "loading_screen")
    imageContainer.style.position = "absolute";
    imageContainer.style.color = "#fff";
    imageContainer.style.textAlign = "center";
    imageContainer.style.fontSize = "70px";
    imageContainer.style.paddingTop = "105px";
    var progressContainer = ui.domHandler.createDivElement("loadingScreen", "progressContainer", "", "progress_container")
    var progressBar = ui.domHandler.createDivElement("progressContainer", "progressBar", "", "progress_bar")
    progressBar.style.width = 0+"%";

    setTimeout(function(){
        progressContainer.style.webkitTransform = "translate3d(0px, 0px,0px)";

        progressBar.style.opacity = 1;
    }, 450)

    progressContainer.style.left = "10px";
    progressContainer.style.right = "10px";
    var start = 0;
    var end = 0;
    var progFunc = function(started, ended) {
        start += started;
        end += ended;

        var remaining = start - end;
        var progress = 1 - remaining/start;

        progressBar.style.width = 100*progress+"%";

        if (remaining == 0) {
            finishedCallback();
        }
    };


    var finishedCallback = function() {
        imageContainer.innerHTML = "";
        progressBar.style.backgroundColor = "#f8a";
        progressContainer.style.boxShadow = "0px 0px 15px #745";
        progressContainer.style.border = "3px solid #f7c";
        client.soundPlayer.playSound("open_chord");
        finishedLoading();
    };
    client.loadGame(progFunc);

    return rootElement;
};

