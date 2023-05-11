/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    if (!this.head) {
      // If there is no head, (linked list is empty) set the head and tail to be the newNode
      this.head = newNode;
      this.tail = this.head;
    } else {
      // The tail node's next references the newNode
      this.tail.next = newNode;
      this.tail = newNode; // Set the tail of the linked list as the newNode
    }
    this.length++;

  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode; // If there is no head, (linked list is empty) set the head to be the newNode
    } else {
      newNode.next = this.head; // Set the newNode's next node to be the head node
      this.head = newNode; // Set the head node as the newNode
    }

    if (this.length === 0) this.tail = this.head;
    this.length++;

  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }
  
  
  /** getNode(idx): gets the node at idx. */
  getNode(idx) {
    let node = this.head;
    let i = 0;

    while (i !== idx && node !== null) {
      i++;
      node = node.next;
    }

    return node;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx > this.length - 1) throw new Error(`Index must be between 0 and ${this.length}`);
    return this.getNode(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx > this.length - 1) throw new Error(`Index must be between 0 and ${this.length}`);
    const node = this.getNode(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) throw new Error(`Index must be between 0 and ${this.length}`);

    //Edgecases beginning and end
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    const before = this.getNode(idx - 1);
    const newNode = new Node(val);
    newNode.next = before.next;
    before.next = newNode;
    this.length++
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx > this.length - 1) throw new Error(`Index must be between 0 and ${this.length}`);
    
    
    if (idx === 0){
      // remove the head node
      const node = this.head;
      this.head = this.head.next;
      this.length--;
      if (this.length < 2) this.tail = this.head // Only one Node in Linked List
      return node.val
    }
    
    const nodeBefore = this.getNode(idx - 1);
    
    if (idx === this.length - 1) {
      // remove the tail node
      const node = nodeBefore.next;
      nodeBefore.next = null;
      this.tail = nodeBefore;
      this.length--;
      return node.val
    }

    const node = nodeBefore.next;
    nodeBefore.next = nodeBefore.next.next;
    this.length--;
    return node.val
    
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0

    let sum = 0;
    let curNode = this.head;

    while (curNode) {
      sum += curNode.val;
      curNode = curNode.next;
    }

    return sum / this.length

  }
}

module.exports = LinkedList;
