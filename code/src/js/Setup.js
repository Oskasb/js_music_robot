var client;
var ui;
var input;

function setup() {

    client = new Client;
    music = new Music();
    ui = new Ui();
    input = new Input();
    music.initScript();

    ui.initScript();
    ui.setupScreen();
    ui.showLoadingScreen();

};


