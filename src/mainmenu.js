GBJam.MainMenu = function (game) {

    //this.music = null;
    //this.playButton = null;

};

GBJam.MainMenu.prototype = {

    create: function () {

        //        We've already preloaded our assets, so let's kick right into the Main Menu itself
        //        Here all we're doing is playing some music and adding a picture and button
        //        Naturally I expect you to do something significantly better :)

        this.music = this.add.audio('titleMusic', 1, true);
        this.music.play('', 0, 1, true);

        this.add.sprite(0, 0, 'mainBackground');
        this.game.input.onDown.add(this.startGame, this);

        //this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');

        //text = this.add.bitmapText(100, 100, 'test', { font: '8px 04b', align: 'center' });

    },

    update: function () {

        //        Do some nice funky main menu effect here

    },

    startGame: function (pointer) {

        //        Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //this.music.stop();

        //        And start the actual game
        this.game.state.start('Game');

    }

};