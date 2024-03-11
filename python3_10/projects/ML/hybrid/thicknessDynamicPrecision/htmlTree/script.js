var treeData = [];
treeData.push({"text": "DataBase", "path": [0]});

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
      var currentNodeAtData = tree_findCurrentNode(treeData, selectedNode.path);
      currentNodeAtData.text = selectedNode.text;
      console.log(currentNodeAtData);
    },

    onExpand: function(node) {
      console.log("expending", node.path);
      var currentNodeAtData = tree_findCurrentNode(treeData, node.path);
      currentNodeAtData.state = "open";
    },
    onCollapse: function(node) {
      console.log("collapsed", node.path);
      var currentNodeAtData = tree_findCurrentNode(treeData, node.path);
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









function tree_findCurrentNode(treeData, path) {
  var currentNode = treeData;
  for (var i = 0; i < path.length - 1; i++)
  {
    if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
    currentNode = currentNode[path[i]].children;
  }
  return currentNode[path[path.length - 1]];
}

function tree_findNumChildren(treeData, path) {
  var currentNode = treeData;
  for (var i = 0; i < path.length; i++)
  {
    if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
    currentNode = currentNode[path[i]].children;
  }
  return currentNode.length;
}

function tree_addChildAtPath(treeData, path, childText, isFolder = true) {
  var currentNode = treeData;
  for (var i = 0; i < path.length - 1; i++)
  {
    if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
    currentNode = currentNode[path[i]].children;
  }
  if (isFolder) { currentNode.push({ "text": childText, "path": path, "state": "closed"}); }
  else { currentNode.push({ "text": childText, "path": path}); }
}


function tree_addFolder(treeData, path) {
  numChildren = tree_findNumChildren(treeData, path);
  var newPath = arr_deepCopy(path);
  newPath.push(numChildren);
  tree_addChildAtPath(treeData, newPath, "NewFolder", true);
}

function tree_addFile(treeData, path) {
  numChildren = tree_findNumChildren(treeData, path);
  var newPath = arr_deepCopy(path);
  newPath.push(numChildren);
  tree_addChildAtPath(treeData, newPath, "NewFile", false);
}

function tree_removeNode(treeID, treeData, selectedNode) {
  let treeUI = $('#' + treeID);
  treeUI.tree('remove', selectedNode.target);
  let targetPathOrigin = arr_deepCopy(selectedNode.path);
  let targetPath = arr_deepCopy(selectedNode.path);
  let numChildToBeDel = targetPath.pop();
  let parentNodeAtData = tree_findCurrentNode(treeData, targetPath);
  let numChildren = parentNodeAtData.children.length;
  console.log(parentNodeAtData);
  console.log(targetPathOrigin);
  console.log(targetPath);
  console.log(numChildToBeDel);
  console.log(numChildren);
  parentNodeAtData.children.splice(numChildToBeDel, 1);
  for (var i = 0; i < numChildren - 1; i++) {
    let newTargetPath = [...targetPath, i];
    console.log('newTargetPath: ' + newTargetPath);
    parentNodeAtData.children[i].path = newTargetPath;
    console.log(i + 'th path ' + parentNodeAtData.children[i].path);
  }
  console.log(parentNodeAtData);
  refreshEventHandlers('treeContainer', treeData);
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
