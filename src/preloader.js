GBJam.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

GBJam.Preloader.prototype = {

    preload: function () {

        this.background = this.add.sprite(0, 0, 'mainBackground');
        this.progressBackground = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 31, 'progressBackground');
        this.progressBar = this.add.sprite(20, this.game.world.centerY + 35, 'progressBar');
        this.progressBackground.anchor.setTo(0.5,0.5);
        this.progressBar.anchor.setTo(0,0.5);

        this.load.setPreloadSprite(this.progressBar);

        this.load.audio('titleMusic', ['./bin/audio/bgm.mp3']);
        //this.load.bitmapFont('04b', './bin/fonts/04b_0.png', './bin/fonts/04b.xml');

        this.load.image('table', './bin/sprites/table.png');
        this.load.image('ball', './bin/sprites/ball.png');
        this.load.image('launcherWall', './bin/sprites/launcherWall.png');
        this.load.image('paddle', './bin/sprites/paddle.png');
        this.load.image('brick', './bin/sprites/brick.png');
        this.load.image('particle', './bin/sprites/particle.png');
        this.load.image('gravityBar', './bin/sprites/gravityBar.png');

    },

    create: function () {

        this.progressBar.cropEnabled = false;

    },

    update: function () {

        if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        {
            this.ready = false;
            this.game.state.start('MainMenu');
        }

    }

};