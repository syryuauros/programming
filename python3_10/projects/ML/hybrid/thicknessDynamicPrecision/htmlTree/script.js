// var treeData = [];

// $(document).ready(function() {
// function initializeTree(treeID, treeData, treeContextMenu='treeContextMenu') { // treeID: str, treeData: var, treeContextMenu: str
// var pathID;
// function initializeContextMenu(treeID, treeData, treeContextMenu='treeContextMenu') {
// function refreshEventHandlers(treeID, treeData) {
// async function fetchTableNames() {
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
var treeData1 = [];
treeData1.push({"text": "DataBase1", "path": [0], "state": "closed", "isFolder": true});


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


// $(document).ready(async function() {
//   initializeTree('treeContainer', treeData);
//   initializeContextMenu('treeContainer', treeData);
//   await fetchDB();
// });



function initializeTree(treeID, treeData, treeContextMenu='treeContextMenu') { // treeID: str, treeData: var, treeContextMenu: str
  let treeUI = $('#' + treeID);
  let treeCM = $('#' + treeContextMenu);
  console.log('in refresh end');

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
      updateFolderNameDB(currentNodeAtData.text, selectedNode.path);
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

async function fetchDB() {
  await fetch('http://192.168.12.135:7105/get_table_tree')
    .then(response => response.json())
    .then(data => {
      data.forEach(values => {
        console.log(stringToArray(values[1]), values[0], stringToBoolean(values[3]));
        tree_addChildAtPath(treeData, stringToArray(values[1]), values[0], stringToBoolean(values[3]));
      });
    })
    .catch(error => console.error('Error:', error));
  console.log('treeData: ', treeData);
  await refreshEventHandlers('treeContainer', treeData);
};

async function addFolderIntoDB(newFolderInfo) {
  // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
  const response = await fetch('http://192.168.12.135:7105/add_folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFolderInfo),
  });
};

async function removeNodeFromDB(targetFolderPath) {
  // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
  const response = await fetch('http://192.168.12.135:7105/remove_folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      targetPath: targetFolderPath
    }),
  });
};

async function updateFolderNameDB(newFolderName, targetFolderPath) {
  // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
  const response = await fetch('http://192.168.12.135:7105/update_folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newName: newFolderName,
      targetPath: targetFolderPath
    }),
  });
};

async function addFileIntoDB(newFileInfo) {
  // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
  const response = await fetch('http://192.168.12.135:7105/add_file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFileInfo),
  });
};

async function removeNodeFromDB(targetPath) {
  // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
  const response = await fetch('http://192.168.12.135:7105/remove_folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      targetPath: targetPath,
    }),
  });
};


function refreshEventHandlers(treeID, treeData) {
  let treeUI = $('#' + treeID);
  treeUI.tree('loadData', treeData);
  initializeTree('treeContainer', treeData);
  initializeContextMenu('treeContainer', treeData);
}


async function addFolderIntoDB(newFolderInfo) {
  // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
  const response = await fetch('http://192.168.12.135:7105/add_folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFolderInfo),
  });
};




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


// function fetchTableNames() {
//   fetch('http://192.168.12.135:7105/get_table_tree')
//     .then(response => response.json())
//     .then(data => {
//       let tableNames = '<ul>';
//       data.forEach(tableName => {
//         tableNames += `<li>${tableName}</li>`;
//       });
//       tableNames += '</ul>';
//       document.getElementById('tableNames').innerHTML = tableNames;
//     })
//     .catch(error => console.error('Error:', error));
// };


// window.onload = function() {
//   fetch('http://192.168.12.135:7105/folders')
//     .then(response => response.json())
//     .then(data => {
//       const folderList = document.getElementById('folderList');
//       data.forEach(folder => {
//         const li = document.createElement('li');
//         li.textContent = folder.folder_name;
//         folderList.appendChild(li);
//       });
//     })
//     .catch(error => console.error('Error:', error));
// };





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
  // console.log('currentNode.children: ', currentNode.children);

  if (isFolder) { console.log(isFolder); currentNode.children.push({ "text": childText, "path": targetPath, "state": "closed", "isFolder": true}); }
  else { console.log('isFolder is false'); currentNode.children.push({ "text": childText, "path": targetPath, "state": "open", "isFolder": false}); }
}

function tree_addFolder(treeData, currentPath) {
  var currentNodeAtData = tree_findNodeByPath(treeData, currentPath);
  if (currentNodeAtData.isFolder == true) {
    let targetIndex = tree_findEmptyIndex(treeData, currentPath);
    let newPath = [ ...currentPath, targetIndex];
    let newFolderInfo = {"text": "NewFolder", "path": newPath, "state": "closed", "isFolder": true};
    tree_addChildAtPath(treeData, newPath, 'NewFolder', true);
    addFolderIntoDB(newFolderInfo);
  }
}

const dataArray = [
  ['John', 30],
  ['Alice', 25],
  ['Bob', 35]
];

function tree_addFile(treeData, currentPath) {
  var currentNodeAtData = tree_findNodeByPath(treeData, currentPath);
  if (currentNodeAtData.isFolder == true) {
    let targetIndex = tree_findEmptyIndex(treeData, currentPath);
    let newPath = [ ...currentPath, targetIndex];
    let newFileInfo = {"text": "NewFile", "path": newPath, "fileContents": JSON.stringify(dataArray) };
    tree_addChildAtPath(treeData, newPath, 'NewFile', false);
    addFileIntoDB(newFileInfo);
  }
}

async function tree_removeNode(treeID, treeData, selectedNode) {
  let treeUI = $('#' + treeID);
  treeUI.tree('remove', selectedNode.target);
  let targetPathOrigin = arr_deepCopy(selectedNode.path);
  let targetPath = arr_deepCopy(selectedNode.path);
  console.log('targetPath: ', targetPath);
  let numChildToBeDel = targetPath.pop();
  let parentNodeAtData = await tree_findNodeByPath(treeData, targetPath);
  listObj_deleteElementsByKeyValue(parentNodeAtData.children, 'path', targetPathOrigin);
  removeNodeFromDB(targetPathOrigin);
  console.log(parentNodeAtData.children);
  if (parentNodeAtData.children.length === 0) { parentNodeAtData.state = 'closed'; }
  refreshEventHandlers('treeContainer', treeData);
}

let loadingData = false;
async function loadDataFromDB1() {
  openPopUp(popup1, 400,300);
  loadingData = true;
}

let loadedData;
async function loadDataFromDB2(treeID) {
  let treeUI = $('#' + treeID);
  if (loadingData == true) {
    var selectedNode = treeUI.tree('getSelected');
    console.log('selectedNode: ', selectedNode.path);

    const response = await fetch('http://192.168.12.135:7105/load_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetPath: selectedNode.path
      }),
    });

    if (response.ok) {
      loadedData = await response.json();
      console.log('loadedData: ', loadedData);
    } else {
      console.error('Failed to load data. server response is incorrect!');
    }
  }
  loadingData = false;
  closePopUp(popup1);
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

function stringToArray(str) {
    // Remove the brackets from the string
    const strippedStr = str.slice(1, -1);

    // Parse the string into an array using JSON.parse()
    const array = JSON.parse("[" + strippedStr + "]");

    return array;
}

function stringToBoolean(str) {
    // Check if the string is 'true' (case insensitive)
    if (str.toLowerCase() === 'true') {
        return true;
    } else {
        // If the string is not 'true', return false
        return false;
    }
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

function listObj_deleteElementsByKeyValue(listOfObjects, key, value) {
  for (let i = listOfObjects.length - 1; i >= 0; i--) {
    if (JSON.stringify(listOfObjects[i][key]) === JSON.stringify(value)) {
      listOfObjects.splice(i, 1);
    }
  }
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
