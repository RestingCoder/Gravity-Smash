GBJam.Game = function (game) {

};

// screen height, used for moving the camera to screens 0, 1, and 2.
var SH = 144;
var test = 424;

GBJam.Game.prototype = {

    create: function () {

        balls = 3;
        score = 0;

        this.game.world.setBounds(0, 0, 160, 432);
        table = this.game.add.sprite(0,0,'table');
        ball = this.game.add.sprite(153, SH * 2 + 400, 'ball');
        paddle = this.game.add.sprite(this.game.world.centerX, 500, 'paddle');
        paddle2 = this.game.add.sprite(this.game.world.centerX, 285, 'paddle');

        scoreText = this.game.add.text(this.game.world.centerX,300,'Score: ' + score.toString(),{ font: "12px Arial", fill: "#ff0044", align: "right" });
        scoreText.fixedToCamera = true;

        tableObjects = this.game.add.group();
        var brick;
        bricks = this.game.add.group();

        g = tableObjects.create(143, 306, 'launcherWall');
        g.anchor.setTo(0.5,0.5);
        g.body.bounce.setTo(1,1);
        g.body.immovable = true;


        ball.anchor.setTo(0.5,0.5);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(0.75, 0.6);
        ball.body.gravity.y = 20;

        paddle.anchor.setTo(0.5,0.5);
        paddle.body.collideWorldBounds = true;
        paddle.body.gravity.y = 100;

        paddle2.anchor.setTo(0.5,0.5);
        paddle2.body.immovable = true;

        for (var i = 0; i < 7; i++)
        {
            for (var j = 0; j < 3; j++)
            {
                brick = bricks.create(18 * i + 8, 8 * j + 330, 'brick');
                brick.body.bounce.setTo(1,1);
                brick.body.immovable = true;

                brick = bricks.create(18 * i + 8, 8 * j + 186, 'brick');
                brick.body.bounce.setTo(1,1);
                brick.body.immovable = true;
            }
        }

        // sets the camera to look at the bottom screen of the table.
        this.game.camera.y = SH * 2;

        this.game.input.onDown.add(this.quitGame, this);

    },

    update: function () {

        paddle2.x = paddle.x;

        if(ball.y > test && ball.x < 143)
        {
            if (balls > 1)
            {
                balls--;
                ball.x = 153;
                ball.y = 300;
                console.log(balls);
            }
            else
            {
                this.quitGame(this);
            }
        }

        if (ball.x < 132)
        {
            ball.body.acceleration.x = 0;
        }

        this.game.physics.collide(ball, tableObjects);
        this.game.physics.collide(paddle, tableObjects);
        this.game.physics.collide(ball, paddle, this.paddleHit);
        this.game.physics.collide(ball, paddle2, this.paddleHit);
        this.game.physics.collide(ball, bricks, this.brickHit);

        if (ball.y < SH * 2)
        {
            this.game.camera.y = SH * 1;
        }
        else
        {
            this.game.camera.y = SH * 2;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            paddle.body.velocity.x = -250;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            paddle.body.velocity.x = 250;
        }
        else if (paddle.body.velocity.x > 0)
        {
            paddle.body.velocity.x -= 25;
        }
        else if (paddle.body.velocity.x < 0)
        {
            paddle.body.velocity.x += 25;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.launchBall();
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            paddle.body.velocity.y = 10;
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

    },

    launchBall: function () {
        if(ball.x > 152 && ball.y > 424)
        {
            ball.body.velocity.y = -2000;
            ball.body.acceleration.x = -200;
        }
    },

    paddleHit: function () {

        score += 10;
        scoreText.content = 'Score: ' + score.toString();
        scoreText.update();

        ball.body.acceleration.x = 0;
        ball.body.velocity.y = -700;

        if (ball.x != paddle.x)
        {
            ball.body.velocity.x = (ball.x - paddle.x) * 20;
        }
        else
        {
            ball.body.velocity.x = 2 + Math.random() * 8;
        }
    },

    brickHit: function (_ball, _brick) {
        score += 15;
        scoreText.content = 'Score: ' + score.toString();
        scoreText.update();

        _brick.destroy();
    }
};