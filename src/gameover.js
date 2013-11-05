GBJam.GameOver = function (game) {

};

GBJam.GameOver.prototype = {

    create: function () {

        gameOverText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 24, 'GAME OVER!',{ font: "8px PokemonGB", align: "center" });
        gameOverText.anchor.setTo(0.5,0.5);
        endScoreText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 8, "Final Score: " + localStorage.score.toString(),{ font: "8px PokemonGB", align: "center" });
        endScoreText.anchor.setTo(0.5,0.5);
        highScoreText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 8, "High Score: " + localStorage.highScore.toString(),{ font: "8px PokemonGB", align: "center" });
        highScoreText.anchor.setTo(0.5,0.5);

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