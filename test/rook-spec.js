const { expect } = require('chai');

const { Rook, King, Piece } = require('../pieces');

describe('The Rook class', () => {
    let r1;
    let r2;

    beforeEach(() => {
        r1 = new Rook(true);
        r2 = new Rook();
    });

    describe('the constructor function', () => {

        it('should inherit from the King class', () => {
            expect(r1 instanceof King).to.be.true;
            expect(r1 instanceof Rook).to.be.true;

            expect(r1).to.have.property('castlingDone');
        });

    });

});