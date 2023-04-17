class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class MovesList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addToTail(val) {
        const node = new Node(val);
        this.length++;

        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }
        
        node.next = this.head
        this.tail.next = node
        this.tail = node;

        return this;
    }
}

// const l = new MovesList();

// l.addToTail(1)
// l.addToTail(2)
// l.addToTail(3)
// l.addToTail(4)

// console.log(l)

module.exports = MovesList;