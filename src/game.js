GBJam.Game = function (game) {

};

GBJam.Game.prototype = {

    create: function () {

        balls = 3;
        score = 0;
        launched = false;
        gravityJuice = 156;
        currentLevel = 1;

        levels = [[[1,1,1,1,1,1,1,1],
                   [1,1,1,1,1,1,1,1],
                   [1,1,1,1,1,1,1,1]],
                  [[1,1,1,1,1,1,1,1],
                   [0,0,0,0,0,0,0,0],
                   [1,1,1,1,1,1,1,1]],
                  [[1,0,1,1,1,1,0,1],
                   [1,0,1,1,1,1,0,1],
                   [1,1,1,0,0,1,1,1]]];

        this.game.world.setBounds(0, 0, 160, 144);
        table = this.game.add.sprite(0,0,'table');
        ball = this.game.add.sprite(0, 0, 'ball');
        paddle = this.game.add.sprite(this.game.world.centerX, 139, 'paddle');
        gravityBar = this.game.add.sprite(2,2,'gravityBar');

        //scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30,'Score: ' + score.toString(),{ font: "12px Arial", fill: "#ff0044", align: "center" });
        //scoreText.anchor.setTo(0.5,0.5);
        //scoreText.fixedToCamera = true;

        var brick;
        bricks = this.game.add.group();

        emitter = this.game.add.emitter(0,0,400);
        emitter.makeParticles('particle');

        ball.anchor.setTo(0.5,0.5);
        ball.body.collideWorldBounds = true;
        ball.body.gravity.y = 10;
        ball.body.bounce.setTo(0.6,0.6);
        ball.body.maxVelocity.x = 200;
        ball.body.maxVelocity.y = 400;

        paddle.anchor.setTo(0.5,0.5);
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable = true;
        paddle.body.gravity.y = 100;

        gravityBar.cropEnabled = true;

        hitSound = this.game.add.audio('hit');
        noEnergySound = this.game.add.audio('noEnergy');
        crashSound = this.game.add.audio('crash');

        this.loadLevel(currentLevel);

        this.game.input.onDown.add(this.quitGame, this);

    },

    update: function () {

        gravityBar.crop.x = Phaser.Math.clamp(156 - gravityJuice, 0, 156);

        ball.body.maxVelocity.x = (score / 10) + 200;
        ball.body.maxVelocity.y = (score / 10) + 350;

        if (!launched)
        {
            ball.x = paddle.x;
            ball.y = 125;
            ball.body.gravity.y = 0;
        }
        else
        {
            ball.body.gravity.y = 10;
        }

        if(ball.y > 136)
        {
            if (balls > 1)
            {
                crashSound.play();
                //balls--;
                ball.body.velocity.x = 0;
                ball.body.velocity.y = 0;
                ball.x = paddle.x;
                ball.y = paddle.y - 15;
                launched = false;
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

        this.game.physics.collide(ball, paddle, this.paddleHit);
        this.game.physics.collide(ball, bricks, this.brickHit, null, this);
        this.game.physics.collide(emitter, ball);
        this.game.physics.collide(emitter, bricks);
        this.game.physics.collide(emitter, paddle);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            paddle.body.velocity.x = -300;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            paddle.body.velocity.x = 300;
        }
        else if (paddle.body.velocity.x > 0)
        {
            paddle.body.velocity.x -= 25;
        }
        else if (paddle.body.velocity.x < 0)
        {
            paddle.body.velocity.x += 25;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z))
        {
            this.launchBall();
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.X))
        {
            this.reverseGravity();
        }
    },

    render: function () {



    },

    loadLevel: function (c) {
        for (var i = 0; i < 8; i++)
        {
            for (var j = 0; j < 3; j++)
            {
                if(levels[c-1][j][i] == 1)
                {
                    brick = bricks.create(18 * i + 8, 8 * j + 15, 'brick');
                    brick.body.bounce.setTo(1,1);
                    brick.body.immovable = true;
                }
            }
        }
    },

    quitGame: function (pointer) {

        // TODO: Stop music, delete sprites, purge caches, free resources, all that good stuff.
        balls = 3;
        score = 0;
        launched = false;
        gravityJuice = 156;
        currentLevel = 1;

        table.kill();
        ball.kill();
        paddle.kill();
        gravityBar.kill();
        //scoreText.destroy();
        bricks.destroy();
        emitter.kill();

        this.game.state.start('MainMenu');

    },

    launchBall: function () {
        if(!launched)
        {
            ball.body.velocity.y = -400;
            ball.body.velocity.x = -200;
            launched = true;
        }
    },

    reverseGravity: function () {
        if (launched && gravityJuice > 0)
        {
            ball.body.gravity.y = -10;
            gravityJuice -= 1;
        }
        else
        {
            if (!noEnergySound.isPlaying)
                noEnergySound.play();
        }
    },

    paddleHit: function () {

        hitSound.play();
        score += 10;
        //scoreText.content = 'Score: ' + score.toString();
        //scoreText.update();

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

        hitSound.play();
        emitter.x = _brick.x;
        emitter.y = _brick.y;
        emitter.start(true, 2000, null, 50);

        score += 15;
        if (gravityJuice < 156)
        {
            gravityJuice += 15;
            gravityJuice = Phaser.Math.clamp(gravityJuice, 0, 156);
        }

        if(bricks.countLiving() <= 1)
        {
            if (currentLevel + 1 <= levels.length)
            {
                currentLevel++;
            }
            else
            {
                currentLevel = 1;
            }
            this.loadLevel(currentLevel);
            gravityJuice = 156;
        }
        //scoreText.content = 'Score: ' + score.toString();
        //scoreText.update();

        _brick.destroy();
    }
};