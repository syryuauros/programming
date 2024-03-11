// var treeData = [];

// $(document).ready(function() {
// function initializeTree(treeID, treeData, treeContextMenu='treeContextMenu') { // treeID: str, treeData: var, treeContextMenu: str
// var pathID;
// function initializeContextMenu(treeID, treeData, treeContextMenu='treeContextMenu') {
// function refreshEventHandlers(treeID, treeData) {
//
// function tree_findNodeByPath(treeData, path) {
// function tree_findEmptyIndex(treeData, path) {
// function tree_addChildAtPath(treeData, targetPath, childText, isFolder = true) {
// function tree_addFolder(treeData, currentPath) {
// function tree_addFile(treeData, currentPath) {
// function tree_removeNode(treeID, treeData, selectedNode) {
//
// function openPopUp(popUpId, top, left) {
// function closePopUp(popUpId) {
//
// function arr_deepCopy(arr) {
// function arr_getRange(start, end) {
// function arr_removeElementFromArray(arr, elem) {
// function listObj_findObjectWithKeyValue(listOfObjects, key, value) {


var treeData = [];
treeData.push({"text": "DataBase", "path": [0], "state": "closed", "isFolder": true});

// tree_addChildAtPath(treeData, [0, 0], "a");
// tree_addChildAtPath(treeData, [0, 0, 0], "a1");
// tree_addChildAtPath(treeData, [0, 0, 1], "a2");
// tree_addChildAtPath(treeData, [0, 0, 1, 0], "a21");
// // tree_addChildAtPath(treeData, [0, 0, 2], "a3");
// tree_addChildAtPath(treeData, [0, 0, 3], "a4");
// tree_addChildAtPath(treeData, [0, 0, 3, 0], "a41");
// // tree_addChildAtPath(treeData, [0, 0, 3, 1], "a42");
// tree_addChildAtPath(treeData, [0, 0, 4], "a5");
// tree_addChildAtPath(treeData, [0, 1], "b");
// tree_addChildAtPath(treeData, [0, 1, 0], "b1");
// tree_addChildAtPath(treeData, [0, 1, 1], "b2");
// tree_addChildAtPath(treeData, [0, 2], "c");
// tree_addChildAtPath(treeData, [0, 2, 0], "c1");
// tree_addChildAtPath(treeData, [0, 2, 1], "c2");
// tree_addChildAtPath(treeData, [0, 3], "d");


$(document).ready(function() {
  initializeTree('treeContainer', treeData);
  initializeContextMenu('treeContainer', treeData);
});


function initializeTree(treeID, treeData, treeContextMenu='treeContextMenu') { // treeID: str, treeData: var, treeContextMenu: str
  let treeUI = $('#' + treeID);
  let treeCM = $('#' + treeContextMenu);

  treeUI.tree({
    data: treeData,
    onSelect: function(node) {
      var selectedNode = treeUI.tree('getSelected');

      if (selectedNode) {
        var text = selectedNode.text;
        var path = selectedNode.path;
        console.log("Selected node:", text, path, selectedNode.state);
      }
    },

    onContextMenu: function(e, node) {
      e.preventDefault();
      treeCM.menu('show', {
        left: e.pageX,
        top: e.pageY
      });
    },

    onDblClick: function(node) {
      $(this).tree('beginEdit', node.target);
      console.log(treeUI);
    },

    onAfterEdit: function(node) {
      var selectedNode = treeUI.tree('getSelected');
      var currentNodeAtData = tree_findNodeByPath(treeData, selectedNode.path);
      currentNodeAtData.text = selectedNode.text;
      console.log(currentNodeAtData);
    },

    onExpand: function(node) {
      console.log("expending", node.path);
      var currentNodeAtData = tree_findNodeByPath(treeData, node.path);
      currentNodeAtData.state = "open";
    },
    onCollapse: function(node) {
      console.log("collapsed", node.path);
      var currentNodeAtData = tree_findNodeByPath(treeData, node.path);
      currentNodeAtData.state = "closed";
    },
  });
}

var pathID;
function initializeContextMenu(treeID, treeData, treeContextMenu='treeContextMenu') {
  let treeUI = $('#' + treeID);
  let treeCM = $('#' + treeContextMenu);

  treeCM.menu({
    onClick: function(item, node) {

      var selectedNode = treeUI.tree('getSelected');

      if (item.iconCls === 'icon-add') {
        if (selectedNode) {
          var text = selectedNode.text;
          var path = selectedNode.path;
          pathID = arr_deepCopy(path);
          tree_addFolder(treeData, path);
          refreshEventHandlers('treeContainer', treeData);
        }
      } else if (item.iconCls === 'icon-remove') {
        if (selectedNode) {
          tree_removeNode(treeID, treeData, selectedNode );
          refreshEventHandlers('treeContainer', treeData);
        }
      } else if (item.iconCls === 'icon-edit') {
        if (selectedNode) {
          var text = selectedNode.text;
          var path = selectedNode.path;
          pathID = arr_deepCopy(path);
          tree_addFile(treeData, path);
          refreshEventHandlers('treeContainer', treeData);
        }
      }
    }
  });
}

function refreshEventHandlers(treeID, treeData) {
  let treeUI = $('#' + treeID);
  treeUI.tree('loadData', treeData);
  initializeTree('treeContainer', treeData);
  initializeContextMenu('treeContainer', treeData);
}




function tree_findNodeByPath(treeData, path) {
  var currentNode = treeData[0];
  var newPath = [0];
  // console.log(path, ',' , newPath);
  for (var i = 1; i < path.length; i++) {
    currentNodeSiblings = currentNode.children;
    // console.log('currentNodeSiblings: ', i, 'th ', currentNodeSiblings);
    newPath.push(path[i]);
    // console.log('newPath: ', newPath);
    currentNode = listObj_findObjectWithKeyValue(currentNodeSiblings, 'path', newPath);
    // console.log('pickedNode: ', i, 'th ', currentNode, 'path: ', path);
  }
  return currentNode;
}

function tree_findEmptyIndex(treeData, path) {
  let emptyIndex = 0;
  let currentNode = tree_findNodeByPath(treeData, path);
  let numChildren = 0;
  if (!currentNode.children) {
  } else {
    numChildren = currentNode.children.length;
  }
  let indicies = arr_getRange(0, numChildren);
  if (numChildren != 0) {
    for(let i = 0; i < numChildren; i++) {
      let pathInfo = arr_deepCopy(currentNode.children[i].path);
      let index = pathInfo.pop();
      indicies = arr_removeElementFromArray(indicies, index);
      console.log("targetIndex: ", indicies, "index: ", index);
    }
  if (indicies == undefined) { emptyIndex = numChildren; }
    else { emptyIndex = indicies[0]; }
  }
  console.log("emptyIndex: ", emptyIndex);
  return emptyIndex;
}

function tree_addChildAtPath(treeData, targetPath, childText, isFolder = true) {
  let newPath = arr_deepCopy(targetPath);
  let targetIndex = newPath.pop();
  let currentNode = tree_findNodeByPath(treeData, newPath);
  if (!currentNode.children) { currentNode.children = []; };
  console.log('currentNode.children: ', currentNode.children);

  if (isFolder) { currentNode.children.push({ "text": childText, "path": targetPath, "state": "closed", "isFolder": true}); }
  else { currentNode.children.push({ "text": childText, "path": targetPath, "isFolder": false}); }
}

function tree_addFolder(treeData, currentPath) {
  var currentNodeAtData = tree_findNodeByPath(treeData, currentPath);
  if (currentNodeAtData.isFolder == true) {
    let targetIndex = tree_findEmptyIndex(treeData, currentPath);
    let newPath = [ ...currentPath, targetIndex];
    tree_addChildAtPath(treeData, newPath, 'NewFolder', true);
  }
}

function tree_addFile(treeData, currentPath) {
  var currentNodeAtData = tree_findNodeByPath(treeData, currentPath);
  if (currentNodeAtData.isFolder == true) {
    let targetIndex = tree_findEmptyIndex(treeData, currentPath);
    let newPath = [ ...currentPath, targetIndex];
    tree_addChildAtPath(treeData, newPath, 'NewFile', false);
  }
}

function tree_removeNode(treeID, treeData, selectedNode) {
  let treeUI = $('#' + treeID);
  treeUI.tree('remove', selectedNode.target);
  let targetPathOrigin = arr_deepCopy(selectedNode.path);
  let targetPath = arr_deepCopy(selectedNode.path);
  let numChildToBeDel = targetPath.pop();
  let parentNodeAtData = tree_findNodeByPath(treeData, targetPath);
  let numChildren = parentNodeAtData.children.length;
  // console.log(parentNodeAtData);
  // console.log(targetPathOrigin);
  // console.log(targetPath);
  // console.log(numChildToBeDel);
  // console.log(numChildren);
  parentNodeAtData.children.splice(numChildToBeDel, 1);
  // for (var i = 0; i < numChildren - 1; i++) {
  //   let newTargetPath = [...targetPath, i];
  //   console.log('newTargetPath: ' + newTargetPath);
  //   parentNodeAtData.children[i].path = newTargetPath;
  //   console.log(i + 'th path ' + parentNodeAtData.children[i].path);
  // }
  console.log(parentNodeAtData);
  // refreshEventHandlers('treeContainer', treeData);
}


function openPopUp(popUpId, top, left) {
  topPosition = top + 'px';
  leftPosition = left + 'px';
  popUpId.style.top = topPosition;
  popUpId.style.left = leftPosition;
  popUpId.style.display = 'block';
}

function closePopUp(popUpId) {
  popUpId.style.display = 'none';
}

function arr_deepCopy(arr) {
  return [...arr];
}

function arr_getRange(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
      result.push(i);
  }
  return result;
}

function arr_removeElementFromArray(arr, elem) {
    return arr.filter(function(value) {
        return value !== elem;
    });
}

function listObj_findObjectWithKeyValue(listOfObjects, key, value) {
  return listOfObjects.find(function(obj) {
    if (Array.isArray(obj[key]) && Array.isArray(value)) {
      return JSON.stringify(obj[key]) === JSON.stringify(value);
    } else {
      return obj[key] === value;
    }
  });
}




// function tree_findCurrentNode(treeData, path) {
//   var currentNode = treeData;
//   for (var i = 0; i < path.length - 1; i++)
//   {
//     if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
//     currentNode = currentNode[path[i]].children;
//   }
//   return currentNode[path[path.length - 1]];
// }

// function tree_findNumChildren(treeData, path) {
//   var currentNode = treeData;
//   for (var i = 0; i < path.length; i++)
//   {
//     if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
//     currentNode = currentNode[path[i]].children;
//   }
//   return currentNode.length;
// }
