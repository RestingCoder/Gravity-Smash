GBJam.Game = function (game) {

};

// screen height, used for moving the camera to screens 0, 1, and 2.
var SH = 144;

GBJam.Game.prototype = {

    create: function () {

        this.game.world.setBounds(0, 0, 160, 432);
        table = this.game.add.sprite(0,0,'table');
        ball = this.game.add.sprite(this.game.world.centerX, SH * 2 + 20, 'ball');
        ball.anchor.setTo(0.5,0.5);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(0.6, 0.2);
        ball.body.gravity.y = 20;
        this.game.input.onDown.add(this.quitGame, this);

        // sets the camera to look at the bottom screen of the table.
        this.game.camera.y = SH * 2;

    },

    update: function () {

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            ball.body.velocity.x = -200;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            ball.body.velocity.x = 200;
        }
        else if (ball.body.velocity.x > 0)
        {
            ball.body.velocity.x -= 2;
        }
        else if (ball.body.velocity.x < 0)
        {
            ball.body.velocity.x += 2;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            ball.body.velocity.y = -400;
        }

    },

    render: function () {

        //this.game.debug.renderSpriteBody(ball);

    },

    quitGame: function (pointer) {

        // TODO: Stop music, delete sprites, purge caches, free resources, all that good stuff.
        table.kill();
        ball.kill();

        this.game.state.start('MainMenu');

    }
};