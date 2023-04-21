const { Node, AvailableMovesList } = require('./available-move-list');

class CompletedMovesList extends AvailableMovesList {


    addToTail(val) {
        const node = new Node(val);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    }

    removeFromTail() {
        if (!this.head) return null;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }

        let curr = this.head;
        let prev = null;

        while(curr.next) {
            prev = curr;
            curr = curr.next;
        }

        prev.next = null;
        this.tail = prev;
        this.length--;

        return curr;
    }
}

module.exports = CompletedMovesList;