

class CaptureTable {
    constructor() {
        this.whiteCaptures = [];
        this.blackCaptures = [];
    }

    getWhiteCaptures() {
        return this.whiteCaptures;
    }

    addWhiteCapture(piece) {
        this.whiteCaptures.push(piece);
    }

    getBlackCaptures() {
        return this.blackCaptures;
    }

    addBlackCapture(piece) {
        this.blackCaptures.push(piece);
    }
}

module.exports = CaptureTable;