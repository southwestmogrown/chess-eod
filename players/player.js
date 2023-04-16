const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Player {
    constructor(name, isWhiteSide) {
        this.name = name;
        this.isWhiteSide = isWhiteSide;
        this.isHuman;
    }

    getIsWhiteSide() {
        return this.isWhiteSide;
    }

    getIsHuman() {
        return this.isHuman;
    }

    getName() {
        return this.name;
    }

}

module.exports = Player;