Client = function() {
    this.deviceProperties = {};
};

Client.prototype.initScript = function() {
    this.soundManager = new SoundManager();
    this.renderer = new Renderer();
    this.soundManager.setupContext();
    this.soundPlayer = new webAudioPlayer();
};

Client.prototype.getClientTime = function() {
    return this.soundPlayer.context.currentTime * 1000;
};


Client.prototype.startRenderer = function() {
    this.renderer.setupRenderLoop();
};

Client.prototype.loadGame = function(progressFunction) {
    var initScripts = function() {
        client.initScript();
        input.initScript();
    };
    initScripts();

    var load = function() {
        client.soundManager.loadSoundList(client.soundManager.soundList());
        client.soundPlayer.setupPlayer(client.soundManager.getContext(), client.soundManager.getSounds());
        client.startRenderer();
    };

    this.soundManager.setLoadProgressFunction(progressFunction);
    load();


};