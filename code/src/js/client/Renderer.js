Renderer = function() {
    this.renderedEntities = [];
    this.frame = 0;
};

Renderer.prototype.addEntityToRenderer = function(entity) {
    this.renderedEntities.push(entity.id);
};

Renderer.prototype.setupRenderLoop = function() {
     this.render(client.getClientTime());
};

Renderer.prototype.render = function(lastFrameTime) {
    var instance = this;

    webkitRequestAnimationFrame(function() {
        instance.renderFrame(lastFrameTime);
    })
};

Renderer.prototype.renderFrame = function(lastFrameTime) {
    this.frame += 1;
    var time = client.getClientTime();
    var frameTime = time - lastFrameTime
    this.tick(time)
    this.render(time);
};


Renderer.prototype.tick = function(time) {
    music.tick(time)
};

