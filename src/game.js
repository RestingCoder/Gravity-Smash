GBJam.Game = function (game) {



};

GBJam.Game.prototype = {

    create: function () {



    },

    update: function () {



    },

    quitGame: function (pointer) {

        // TODO: Stop music, delete sprites, purge caches, free resources, all that good stuff.

        this.game.state.start('MainMenu');

    }

};