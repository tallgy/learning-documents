/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList1 = function(head) {
  const nextPoint = [];
  let cur = head;

  while (head) {
    nextPoint.push(head);
    head = head.next;
  }

  let listPro;
  let listN = new listNode();
  for (let i = 0; i < nextPoint.length; i++) {
    listN = new listNode(nextPoint[i].val, listPro);
    listPro = listN;
  }

  return listN;
};





function listNode(val, next) {
  this.val = (val===undefined ? 0 : val);
  this.next = (next===undefined ? null : next)
}


let l1 = new listNode(1);
let l2 = new listNode(2, l1);
let l3 = new listNode(3, l2);
let l4 = new listNode(4, l3);



function outPut(head) {
  while (head) {
    console.log(head.val);
    head = head.next;
  }
}
// outPut(l4);


let l5 = reverseList1(l4);
console.log(l5);
outPut(l5);



// class Solution:
// def reverseList(self, head):
// pre, cur = None, head
// while cur:
// tmp = cur.next
// cur.next = pre
// pre, cur = cur, tmp
// return pre

function a(head) {
  let pre = null, cur = head;
  while (cur) {
    let tmp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = tmp;
  }
  return pre;
}

var reverseList = function(head) {
  let cur = head, next = null;

  while (cur) {
    let tmp = cur.next;
    cur.next = next;
    next = cur;
    cur = tmp;
  }

  return next;
};