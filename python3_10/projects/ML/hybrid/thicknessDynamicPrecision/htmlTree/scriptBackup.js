var treeData = [];
treeData.push({"text": "DataBase", "path": [0]});

function addChildAtPath(obj, path, childText, isFolder = true) {
  var currentNode = obj;
  for (var i = 0; i < path.length - 1; i++)
  {
    if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
    currentNode = currentNode[path[i]].children;
  }
  if (isFolder) { currentNode.push({ "text": childText, "path": path}); }
  else { currentNode.push({ "text": childText, "path": path}); }
}

function findNumChildren(obj, path) {
  var currentNode = obj;
  for (var i = 0; i < path.length; i++)
  {
    if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
    currentNode = currentNode[path[i]].children;
  }
  return currentNode.length;
}

function findCurrentNode(obj, path) {
  var currentNode = obj;
  for (var i = 0; i < path.length - 1; i++)
  {
    if (!currentNode[path[i]].children) { currentNode[path[i]].children = []; }
    currentNode = currentNode[path[i]].children;
  }
  return currentNode[path[path.length - 1]];
}


function addFolder(path) {
  numChildren = findNumChildren(treeData, path);
  var newPath = arr_deepCopy(path);
  newPath.push(numChildren);
  addChildAtPath(treeData, newPath, "NewFolder", true);

  // console.log("numChildren: ", numChildren);
  // console.log("newPath: ", newPath);
}

function editFolder(path) {
  currentNode = findCurrentNode(treeData, path);
  console.log(currentNode);
}

function findNodeByProperty(treeId, property, valueToBefound) {
  var tree = $('#' + treeId);
  var loggedNodeTexts = new Set(); // Set to track logged node texts
  var queue = [];

  var rootNode = tree.tree('getRoot');
  queue.push(rootNode);

  while (queue.length > 0) {
    var currentNode = queue.shift();
    console.log(treeData);
    // if (loggedNodeTexts.has(currentNode.text)) {
    //   continue;
    // }

    loggedNodeTexts.add(currentNode.text);
    // console.log(currentNode.text);
    var children = tree.tree('getChildren', currentNode.target);
    children.forEach(function(child) {
      queue.push(child);
    });
  }
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

function initializeTree() {
  $('#treeContainer').tree({
    data: treeData,
    onSelect: function(node) {
      var selectedNode = $('#treeContainer').tree('getSelected');

      if (selectedNode) {
        var text = selectedNode.text;
        var path = selectedNode.path;
        console.log("Selected node:", text, path, selectedNode.state);
      }
    },

    onContextMenu: function(e, node) {
      e.preventDefault();
      $('#treeContextMenu').menu('show', {
        left: e.pageX,
        top: e.pageY
      });
    },

    onDblClick: function(node) {
      $(this).tree('beginEdit', node.target);
      console.log($('#treeContainer'));
    },

    onAfterEdit: function(node) {
      var selectedNode = $('#treeContainer').tree('getSelected');
      var currentNodeAtData = findCurrentNode(treeData, selectedNode.path);
      currentNodeAtData.text = selectedNode.text;
      console.log(currentNodeAtData);
    },

    onExpand: function(node) {
      console.log("expending", node.path);
      var currentNodeAtData = findCurrentNode(treeData, node.path);
      currentNodeAtData.state = "open";
    },
    onCollapse: function(node) {
      console.log("collapsed", node.path);
      var currentNodeAtData = findCurrentNode(treeData, node.path);
      currentNodeAtData.state = "closed";
    },
  });

  $('#treeContainer').on('click', function(event, node) {
    // var property = document.getElementById("inputBox1").value;
    // var value = document.getElementById("inputBox2").value;
    // console.log($('#treeContainer'));
    // var nodeStates = findNodeByProperty('treeContainer', property, value);
    // console.log(nodeStates);
  });

  // $('#treeContainer').on('dblclick', function(event, node) {
  //   console.log("I am here");
  //   console.log($('#treeContainer'));
  // });
}

var pathID;
function initializeContextMenu() {
  $('#treeContextMenu').menu({
    onClick: function(item, node) {
      var selectedNode = $('#treeContainer').tree('getSelected');

      if (item.iconCls === 'icon-add') {
        if (selectedNode) {
          var text = selectedNode.text;
          var path = selectedNode.path;
          pathID = arr_deepCopy(path);
          addFolder(path);
          refreshEventHandlers();
        }
      } else if (item.iconCls === 'icon-remove') {
        if (selectedNode) {
          // console.log("remove");
          // $('#treeContainer').tree('remove', selectedNode.target);
          // targetPath = selectedNode.path;
          // numChild = targetPath.pop();
          // var parentNodeAtData = findCurrentNode(treeData, targetPath);
          // console.log(parentNodeAtData);
          // parentNodeAtData.children.splice(numChild, 1);

          removeNode(selectedNode, treeData);
        }
      }
    }
  });
}

function removeNode(selectedNode, treeData) {
  $('#treeContainer').tree('remove', selectedNode.target);
  let targetPathOrigin = arr_deepCopy(selectedNode.path);
  let targetPath = arr_deepCopy(selectedNode.path);
  let numChildToBeDel = targetPath.pop();
  let parentNodeAtData = findCurrentNode(treeData, targetPath);
  let numChildren = parentNodeAtData.children.length;
  console.log(parentNodeAtData);
  console.log(targetPathOrigin);
  console.log(targetPath);
  console.log(numChildToBeDel);
  console.log(numChildren);
  parentNodeAtData.children.splice(numChildToBeDel, 1);
  parentNodeAtData.children[numChildren - 2].path = arr_deepCopy(targetPathOrigin);
  console.log(parentNodeAtData);
  refreshEventHandlers();
}

function refreshEventHandlers() {
  $('#treeContainer').tree('loadData', treeData);
  initializeTree();
  initializeContextMenu();
}


$(document).ready(function() {
  initializeTree();
  initializeContextMenu();
});
