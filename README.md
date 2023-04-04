# Chess Project Planning

## Design a Chess game using OOP

Use Object Oriented Programming to design the multiple components of a game
of Chess. These components include:

1. Square: A single block of an 8x8 grid.
    - Should track the `row` and `col` of the spot
    - Should track whether a `Piece` occupies the spot or not
    - Should set/get the `Piece`, `row`, and `col`
2. Piece: The building block of the game. Each piece will be placed on a `Spot`, and will be able to move according to its type. 
    - `Piece` is an abstract class. 
    - Should track the color of the piece
    - Should track if piece is still in play
    - Should set/get and check whether a piece is white
    - Should set piece to captured and check if a piece is captured
    - Should check whether a piece can make a specific `Move`;
    - Its extended classes should include:
        - `Pawn`
        - `King`
        - `Queen`
        - `Rook`
        - `Knight`
        - `Bishop`
3. Board: The actual game board. A series of 8x8 `Spots`.
    - 