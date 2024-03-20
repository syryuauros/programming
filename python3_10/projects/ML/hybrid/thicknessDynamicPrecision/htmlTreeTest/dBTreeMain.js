var dataArrayToSave = [
  ['John2', 30],
  ['Alice2', 25],
  ['Bob2', 35]
];

const arrF = new arrFunctions();
const strF = new strFunctions();
const looF = new listObjFunctions();
// const treeF = new treeFunctions();
const dBTree1 = new dBTree('dBTreeTest');

$(document).ready(async function () {
  dBTree1.initializeTree();
  await dBTree1.treeF.fetchDB();
})
