GBJam.MainMenu = function (game) {

    //this.music = null;
    //this.playButton = null;

};

GBJam.MainMenu.prototype = {

    create: function () {

        this.music = this.add.audio('titleMusic', 1, true);
        //this.music.play('', 0, 1, true);

        this.add.sprite(0, 0, 'mainBackground');
        startInfo = this.add.sprite(this.game.world.centerX, 110, 'startInfo');
        startInfo.anchor.setTo(0.5,0.5);

        //text = this.add.bitmapText(100, 100, 'test', { font: '8px 04b', align: 'center' });

    },

    update: function () {

        if (this.input.keyboard.justPressed(Phaser.Keyboard.Z))
        {
            this.startGame();
        }

    },

    startGame: function () {

            this.game.input.keyboard.onDownCallback = null;
            this.game.state.start('Game');

    }

};