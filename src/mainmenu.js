GBJam.MainMenu = function (game) {

    //this.music = null;
    //this.playButton = null;

};

GBJam.MainMenu.prototype = {

    create: function () {

        this.music = this.add.audio('titleMusic', 1, true);
        //this.music.play('', 0, 1, true);

        this.game.stage.backgroundColor = '#91aa9d';

        this.game.add.sprite(0,0,'mainBackground');
        var logo = this.game.add.sprite(this.game.world.centerX,-50,'logo');
        logo.anchor.setTo(0.5,0.5);

        var tween = this.game.add.tween(logo).to({y:40}, 100, Phaser.Easing.Linear.None);
        tween.start();

        var startInfo = this.add.sprite(this.game.world.centerX, 154, 'startInfo');
        startInfo.anchor.setTo(0.5,0.5);

        var tween2 = this.game.add.tween(startInfo).to({y:95}, 100, Phaser.Easing.Linear.None);
        tween2.start();

        var menuDeco = this.game.add.sprite(-20, 118, 'menuDeco');
        menuDeco.anchor.setTo(0.5,0.5);
        var tween3 = this.game.add.tween(menuDeco).to({x:50}, 100, Phaser.Easing.Linear.None);
        tween3.start();


        //text = this.add.bitmapText(100, 100, 'test', { font: '8px 04b', align: 'center' });

    },

    update: function () {

        if (this.input.keyboard.justPressed(Phaser.Keyboard.Z))
        {
            this.startGame();
        }

    },

    startGame: function () {

            this.game.state.start('Game');

    }
};