class MoveRankingNode {
  constructor(score, move) {
    this.score = score;
    this.moves = [move];
    this.left = null;
    this.right = null;
  }
}

class MoveRankingBST {
  constructor() {
    this.root = null;
  }

  insert(score, move) {
    if (!this.root) {
      this.root = new MoveRankingNode(score, move);
      return;
    }

    let curr = this.root;
    while (curr) {
      if (score === curr.score) {
        curr.moves.push(move);
        return;
      }

      if (score < curr.score) {
        if (!curr.left) {
          curr.left = new MoveRankingNode(score, move);
          return;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = new MoveRankingNode(score, move);
          return;
        }
        curr = curr.right;
      }
    }
  }

  search(score) {
    let curr = this.root;

    while (curr) {
      if (score === curr.score) return curr;
      curr = score < curr.score ? curr.left : curr.right;
    }

    return null;
  }

  getHighestRankedMoves() {
    if (!this.root) return [];

    let curr = this.root;
    while (curr.right) {
      curr = curr.right;
    }

    return curr.moves;
  }
}

module.exports = {
  MoveRankingBST,
  MoveRankingNode,
};
