GBJam.GameOver = function (game) {

};

GBJam.GameOver.prototype = {

    create: function () {

    },

    update: function () {

        if (this.input.keyboard.justPressed(Phaser.Keyboard.Z))
        {
            this.returnToMenu();
        }

    },

    returnToMenu: function () {

        this.game.state.start('MainMenu');

    }
};