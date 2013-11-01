GBJam = {};

GBJam.Boot = function (game) {

};

GBJam.Boot.prototype = {

    preload: function () {
        
        this.load.image('mainBackground', './bin/sprites/mainBackground.png');
        this.load.image('progressBackground', './bin/sprites/progressBackground.png')
        this.load.image('progressBar', './bin/sprites/progressBar.png');

    },

    create: function () {

        this.game.input.maxPointers = 1;

        this.game.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.game.stage.scale.pageAlignHorizontally = true;
        }
        else
        {
            this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            this.game.stage.scale.minWidth = 160;
            this.game.stage.scale.minHeight = 144;
            this.game.stage.scale.maxWidth = 160;
            this.game.stage.scale.maxHeight = 144;
            this.game.stage.scale.forceLandscape = true;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.setScreenSize(true);
        }

        this.game.state.start('Preloader');

    }

};