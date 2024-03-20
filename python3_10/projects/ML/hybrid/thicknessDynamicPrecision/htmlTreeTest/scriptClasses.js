


class arrFunctions {
  constructor() {}

  deepCopy(arr) {
    return [...arr];
  }

  getRange(start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  removeElementFromArray(arr, elem) {
    return arr.filter(function(value) {
      return value !== elem;
    });
  }
}

class strFunctions {
  constructor() {}

  toArray(str) { /** '[0, 1]', space must be include to seperate sementics */
    const strippedStr = str.slice(1, -1);
    const array = JSON.parse("[" + strippedStr + "]");

    return array;
  }

  toBoolean(str) { /** 'true' */
    if (str.toLowerCase() === 'true') {
      return true;
    } else {
      return false;
    }
  }
}


class listObjFunctions {
  constructor() {}
  loadingData = [];
  loadedData;

  findObjByKey(listOfObjects, key, value) {
    return listOfObjects.find(function(obj) {
      if (Array.isArray(obj[key]) && Array.isArray(value)) {
        return JSON.stringify(obj[key]) === JSON.stringify(value);
      } else {
        return obj[key] === value;
      }
    });
  }

  deleteElemByKey(listOfObjects, key, value) {
    for (let i = listOfObjects.length - 1; i >= 0; i--) {
      if (JSON.stringify(listOfObjects[i][key]) === JSON.stringify(value)) {
        listOfObjects.splice(i, 1);
      }
    }
  }
}


class treeFunctions {

  arrF = arrF;
  looF = looF;
  strF = strF;
  //arrF = new arrFunctions();
  // looF = new listObjFunctions();
  // strF = new strFunctions();

  treeContextMenu = 'treeContextMenu';
  treeID = 'treeContainer';
  treeDataIn = [{"text": "DB", "path": [0], "state": "closed", "isFolder": true}];

  loadingDataIn = false;
  loadedDataIn;

  constructor(treeIDName = this.treeID, treeDataInName = this.treeDataIn, treeContextMenuName = this.treeContextMenu) {
    this.treeID = treeIDName,
    this.treeDataIn = treeDataInName,
    this.treeContextMenu = treeContextMenuName
  }

  findNodeByPath(path, treeDataIn = this.treeDataIn) {
    var currentNode = treeDataIn[0];
    var newPath = [0];
    for (var i = 1; i < path.length; i++) {
      var currentNodeSiblings = currentNode.children;
      newPath.push(path[i]);
      currentNode = this.looF.findObjByKey(currentNodeSiblings, 'path', newPath);
    }
    return currentNode;
  }

  findEmptyIndex(path, treeDataIn = this.treeData) {
    let emptyIndex = 0;
    let currentNode = this.findNodeByPath(path, treeDataIn);
    let numChildren = 0;
    if (!currentNode.children) {
    } else {
      numChildren = currentNode.children.length;
    }
    let indicies = this.arrF.getRange(0, numChildren);
    if (numChildren != 0) {
      for(let i = 0; i < numChildren; i++) {
        let pathInfo = this.arrF.deepCopy(currentNode.children[i].path);
        let index = pathInfo.pop();
        indicies = this.arrF.removeElementFromArray(indicies, index);
        console.log("targetIndex: ", indicies, "index: ", index);
      }
      if (indicies == undefined) { emptyIndex = numChildren; }
      else { emptyIndex = indicies[0]; }
    }
    console.log("emptyIndex: ", emptyIndex);
    return emptyIndex;
  }

  addChildAtPath(targetPath, childText, treeDataIn = this.treeDataIn, isFolder = true) {
    let newPath = this.arrF.deepCopy(targetPath);
    let targetIndex = newPath.pop();
    let currentNode = this.findNodeByPath(newPath, treeDataIn);
    if (!currentNode.children) { currentNode.children = []; };

    if (isFolder) { console.log(currentNode); currentNode.children.push({ "text": childText, "path": targetPath, "state": "closed", "isFolder": true}); }
    else { console.log('isFolder is false'); currentNode.children.push({ "text": childText, "path": targetPath, "state": "open", "isFolder": false}); }
  }

  addFolder(currentPath, treeDataIn = this.treeDataIn) {
    var currentNodeAtData = this.findNodeByPath(currentPath, treeDataIn);
    if (currentNodeAtData.isFolder == true) {
      let targetIndex = this.findEmptyIndex(currentPath, treeDataIn);
      let newPath = [ ...currentPath, targetIndex];
      let newFolderInfo = {"text": "NewFolder", "path": newPath, "state": "closed", "isFolder": true};
      this.addChildAtPath(newPath, 'NewFolder', treeDataIn, true);
      this.addFolderIntoDB(newFolderInfo);
    }
  }

  addFile(currentPath, treeDataIn = this.treeDataIn, fileContents = dataArray) {
    var currentNodeAtData = this.findNodeByPath(currentPath, treeDataIn);
    if (currentNodeAtData.isFolder == true) {
      let targetIndex = this.findEmptyIndex(currentPath, treeDataIn);
      let newPath = [ ...currentPath, targetIndex];
      let newFileInfo = {"text": "NewFile", "path": newPath, "fileContents": JSON.stringify(fileContents) };
      this.addChildAtPath(newPath, 'NewFile', treeDataIn, false);
      this.addFileIntoDB(newFileInfo);
    }
  }

  async addFolderIntoDB(newFolderInfo) {
    // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
    const response = await fetch('http://192.168.12.135:7105/add_folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFolderInfo),
    });
  }

  async addFileIntoDB(newFileInfo) {
    // var newFolderInfo = {"text": "folderInfo", "path": [2], "state": "closed", "isFolder": true};
    const response = await fetch('http://192.168.12.135:7105/add_file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFileInfo),
    });
  }


  async removeNode(selectedNode, treeID = this.treeID, treeDataIn = this.treeDataIn) {
    let treeUI = $('#' + treeID);
    treeUI.tree('remove', selectedNode.target);
    let targetPathOrigin = this.arrF.deepCopy(selectedNode.path);
    let targetPath = this.arrF.deepCopy(selectedNode.path);
    console.log('targetPath: ', targetPath);
    let numChildToBeDel = targetPath.pop();
    let parentNodeAtData = await this.findNodeByPath(targetPath, treeDataIn);
    this.looF.deleteElemByKey(parentNodeAtData.children, 'path', targetPathOrigin);
    this.removeNodeFromDB(targetPathOrigin);
    console.log(parentNodeAtData.children);
    if (parentNodeAtData.children.length === 0) { parentNodeAtData.state = 'closed'; }
    await treeUI.tree({data: treeDataIn});
    // refreshEventHandlers(treeID, treeDataIn);
  }

  async removeNodeFromDB(targetPath) {
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
  }

  // async loadDataFromDB1() {
  //   openPopUp(popup1, 400,300);
  //   this.loadingDataIn = true;
  // }

  async loadDataFromDB(treeID = this.treeID) {
    let treeUI = $('#' + treeID);
    this.loadingDataIn = true;
    if (this.loadingDataIn == true) {
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
        this.loadedDataIn = await response.json();
        console.log('loadedData: ', this.loadedDataIn);
      } else {
        console.error('Failed to load data. server response is incorrect!');
      }
    }
    this.loadingDataIn = false;
    closePopUp(popup1);
  }

  async updateFolderNameDB(newFolderName, targetFolderPath) {
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
  }

  async initDBTree(dataBaseName, treeID = this.treeID, treeDataIn = this.treeDataIn) {
    await this.initDBTreeInside(dataBaseName, treeID, treeDataIn);
  }

  async initDBTreeInside(dataBaseName, treeID = this.treeID, treeDataIn = this.treeDataIn) {
    const response = await fetch('http://192.168.12.135:7105/init_db_tree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataBaseName: dataBaseName,
      }),
    });
  };

  async fetchDB(treeID = this.treeID, treeDataIn = this.treeDataIn) {
    await fetch('http://192.168.12.135:7105/get_table_tree')
      .then(response => response.json())
      .then(data => {
        data.forEach(values => {
          console.log(this.strF.toArray(values[1]), values[0], this.strF.toBoolean(values[3]));
          this.addChildAtPath(this.strF.toArray(values[1]), values[0], treeDataIn, this.strF.toBoolean(values[3]));
        });
      })
      .catch(error => console.error('Error:', error));
    console.log('treeDataIn: ', treeDataIn);

    let treeUI = $('#' + treeID);
    await treeUI.tree({data: treeDataIn});
    // await refreshEventHandlers(treeID, treeDataIn);
  };

}

class dBTree {

  treeContextMenu = 'treeContextMenu';
  treeID = 'treeContainer';
  treeDataIn = [{"text": "DB", "path": [0], "state": "closed", "isFolder": true}];

  treeF = new treeFunctions(this.treeID, this.treeDataIn, this.treeContextMenu);

  constructor(dataBaseName, treeIDName = this.treeID, treeDataInName = this.treeDataIn, treeContextMenuName = this.treeContextMenu) {
    this.treeID = treeIDName;
    this.treeDataIn = treeDataInName;
    this.treeContextMenu = treeContextMenuName;
    this.treeF.initDBTree(dataBaseName);
  }

  initializeTree(treeContextMenu=this.treeContextMenu, treeID = this.treeID, treeDataIn = this.treeDataIn ) { // treeID: str, treeData: var, treeContextMenu: str
    let treeUI = $('#' + treeID);
    let treeCM = $('#' + treeContextMenu);
    let treeF = this.treeF;
    let pathID;
    console.log('in refresh end');

    treeUI.tree({
      data: treeDataIn,
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
          top: e.pageY,
          onClick: async function(item, node) {
            console.log('I am in');

            var selectedNode = treeUI.tree('getSelected');

            if (item.iconCls === 'icon-add') {
              if (selectedNode) {
                var text = selectedNode.text;
                var path = selectedNode.path;
                pathID = treeF.arrF.deepCopy(path);
                treeF.addFolder(path, treeDataIn);
                await treeUI.tree({data: treeDataIn});
              }
            } else if (item.iconCls === 'icon-remove') {
              if (selectedNode) {
                treeF.removeNode(selectedNode, treeID, treeDataIn );
              }
            } else if (item.iconCls === 'icon-edit') {
              if (selectedNode) {
                var text = selectedNode.text;
                var path = selectedNode.path;
                pathID = treeF.arrF.deepCopy(path);
                treeF.addFile(path, treeDataIn);
                await treeUI.tree({data: treeDataIn});
              }
            }
          }
        });
      },

      onDblClick: function(node) {
        $(this).tree('beginEdit', node.target);
        console.log(treeUI);
      },

      onAfterEdit: function(node) {
        var selectedNode = treeUI.tree('getSelected');
        var currentNodeAtData = treeF.findNodeByPath(selectedNode.path, treeDataIn);
        currentNodeAtData.text = selectedNode.text;
        treeF.updateFolderNameDB(currentNodeAtData.text, selectedNode.path);
        console.log(currentNodeAtData);
      },

      onExpand: function(node) {
        console.log("expending", node.path);
        var currentNodeAtData = treeF.findNodeByPath(node.path, treeDataIn);
        currentNodeAtData.state = "open";
      },
      onCollapse: function(node) {
        console.log("collapsed", node.path);
        var currentNodeAtData = treeF.findNodeByPath(node.path, treeDataIn);
        currentNodeAtData.state = "closed";
      },
    });
  }

  // initializeContextMenu(treeContextMenu=this.treeContextMenu, treeID = this.treeID, treeDataIn = this.treeDataIn, ) {
  //   let treeUI = $('#' + treeID);
  //   let treeCM = $('#' + treeContextMenu);
  //   let treeF = this.treeF;
  //   let initializeTree = this.initializeTree;
  //   var pathID;

  //   treeCM.menu({
  //     onClick: function(item, node) {

  //       var selectedNode = treeUI.tree('getSelected');

  //       if (item.iconCls === 'icon-add') {
  //         if (selectedNode) {
  //           var text = selectedNode.text;
  //           var path = selectedNode.path;
  //           pathID = treeF.arrF.deepCopy(path);
  //           treeF.addFolder(path, treeDataIn);
  //           treeUI.tree({data: treeDataIn});
  //         }
  //       } else if (item.iconCls === 'icon-remove') {
  //         if (selectedNode) {
  //           treeF.removeNode(selectedNode, treeID, treeDataIn );
  //           treeUI.tree({data: treeDataIn});
  //         }
  //       } else if (item.iconCls === 'icon-edit') {
  //         if (selectedNode) {
  //           var text = selectedNode.text;
  //           var path = selectedNode.path;
  //           pathID = treeF.arrF.deepCopy(path);
  //           treeF.addFile(path, treeDataIn);
  //           treeUI.tree({data: treeDataIn});
  //         }
  //       }
  //     }
  //   });
  // }
}

// function refreshEventHandlers(treeID, treeDataIn) {
//   let treeUI = $('#' + treeID);
//   console.log('treeDataIn in refresh: ', treeDataIn);
//   treeUI.tree('loadData', treeDataIn);
//   dBTree1.initializeTree();
//   // dBTree1.initializeContextMenu();
// }

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

var dataArray = [
  ['John2', 30],
  ['Alice2', 25],
  ['Bob2', 35]
];

const arrF = new arrFunctions();
const strF = new strFunctions();
const looF = new listObjFunctions();
// const treeF = new treeFunctions();
const dBTree1 = new dBTree('test5');

$(document).ready(async function () {
  dBTree1.initializeTree();
  await dBTree1.treeF.fetchDB();
})
