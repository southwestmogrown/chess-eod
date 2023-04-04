function findPositions(start, end) {
    return {
        startX: start.getX(),
        startY: start.getY(),
        endX: end.getX(),
        endY: end.getY(),
    }
}

function checkPieceColor(board, endX, endY, startX, startY) {
    
    const endPiece = board[endX][endY].piece;
    const startPiece = board[startX][startY].piece;
    
    return endPiece && endPiece.white === startPiece.white
}

module.exports = {
    findPositions,
    checkPieceColor
}