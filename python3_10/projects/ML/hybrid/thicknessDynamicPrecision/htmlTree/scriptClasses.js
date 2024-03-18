
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

  treeData = [{"text": "DB", "path": [0], "state": "closed", "isFolder": true}];

  loadingDataIn = false;
  loadedDataIn;

  constructor() {}

  findNodeByPath(treeData, path) {
    var currentNode = treeData[0];
    var newPath = [0];
    for (var i = 1; i < path.length; i++) {
      currentNodeSiblings = currentNode.children;
      newPath.push(path[i]);
      currentNode = this.looF.findObjByKey(currentNodeSiblings, 'path', newPath);
    }
    return currentNode;
  }

  findEmptyIndex(treeData, path) {
    let emptyIndex = 0;
    let currentNode = this.findNodeByPath(treeData, path);
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

  addChildAtPath(treeData, targetPath, childText, isFolder = true) {
    let newPath = this.arrF.deepCopy(targetPath);
    let targetIndex = newPath.pop();
    let currentNode = this.findNodeByPath(treeData, newPath);
    if (!currentNode.children) { currentNode.children = []; };

    if (isFolder) { console.log(currentNode); currentNode.children.push({ "text": childText, "path": targetPath, "state": "closed", "isFolder": true}); }
    else { console.log('isFolder is false'); currentNode.children.push({ "text": childText, "path": targetPath, "state": "open", "isFolder": false}); }
  }

  addFolder(treeData, currentPath) {
    var currentNodeAtData = this.findNodeByPath(treeData, currentPath);
    if (currentNodeAtData.isFolder == true) {
      let targetIndex = this.findEmptyIndex(treeData, currentPath);
      let newPath = [ ...currentPath, targetIndex];
      let newFolderInfo = {"text": "NewFolder", "path": newPath, "state": "closed", "isFolder": true};
      this.addChildAtPath(treeData, newPath, 'NewFolder', true);
      addFolderIntoDB(newFolderInfo);
    }
  }

  addFile(treeData, currentPath, fileContents = dataArray) {
    var currentNodeAtData = this.findNodeByPath(treeData, currentPath);
    if (currentNodeAtData.isFolder == true) {
      let targetIndex = this.findEmptyIndex(treeData, currentPath);
      let newPath = [ ...currentPath, targetIndex];
      let newFileInfo = {"text": "NewFile", "path": newPath, "fileContents": JSON.stringify(dataArray) };
      this.addChildAtPath(treeData, newPath, 'NewFile', false);
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


  async removeNode(treeID, treeData, selectedNode) {
    let treeUI = $('#' + treeID);
    treeUI.tree('remove', selectedNode.target);
    let targetPathOrigin = this.arrF.deepCopy(selectedNode.path);
    let targetPath = this.arrF.deepCopy(selectedNode.path);
    console.log('targetPath: ', targetPath);
    let numChildToBeDel = targetPath.pop();
    let parentNodeAtData = await this.findNodeByPath(treeData, targetPath);
    this.looF.deleteElemByKey(parentNodeAtData.children, 'path', targetPathOrigin);
    this.removeNodeFromDB(targetPathOrigin);
    console.log(parentNodeAtData.children);
    if (parentNodeAtData.children.length === 0) { parentNodeAtData.state = 'closed'; }
    refreshEventHandlers('treeContainer', treeData);
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

  async loadDataFromDB1() {
    openPopUp(popup1, 400,300);
    this.loadingDataIn = true;
  }

  async loadDataFromDB2(treeID) {
    let treeUI = $('#' + treeID);
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

  initializeTree(treeID, treeData, treeContextMenu='treeContextMenu') { // treeID: str, treeData: var, treeContextMenu: str
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
        var currentNodeAtData = this.findNodeByPath(treeData, selectedNode.path);
        currentNodeAtData.text = selectedNode.text;
        this.updateFolderNameDB(currentNodeAtData.text, selectedNode.path);
        console.log(currentNodeAtData);
      },

      onExpand: function(node) {
        console.log("expending", node.path);
        var currentNodeAtData = this.findNodeByPath(treeData, node.path);
        currentNodeAtData.state = "open";
      },
      onCollapse: function(node) {
        console.log("collapsed", node.path);
        var currentNodeAtData = this.findNodeByPath(treeData, node.path);
        currentNodeAtData.state = "closed";
      },
    });
  }

  pathID;
  initializeContextMenu(treeID, treeData, treeContextMenu='treeContextMenu') {
    let treeUI = $('#' + treeID);
    let treeCM = $('#' + treeContextMenu);

    treeCM.menu({
      onClick: function(item, node) {

        var selectedNode = treeUI.tree('getSelected');

        if (item.iconCls === 'icon-add') {
          if (selectedNode) {
            var text = selectedNode.text;
            var path = selectedNode.path;
            pathID = this.arrF.deepCopy(path);
            this.addFolder(treeData, path);
            this.refreshEventHandlers('treeContainer', treeData);
          }
        } else if (item.iconCls === 'icon-remove') {
          if (selectedNode) {
            this.removeNode(treeID, treeData, selectedNode );
            refreshEventHandlers('treeContainer', treeData);
          }
        } else if (item.iconCls === 'icon-edit') {
          if (selectedNode) {
            var text = selectedNode.text;
            var path = selectedNode.path;
            pathID = arr_deepCopy(path);
            this.addFile(treeData, path);
            this.refreshEventHandlers('treeContainer', treeData);
          }
        }
      }
    });
  }

  refreshEventHandlers(treeID, treeData) {
    let treeUI = $('#' + treeID);
    treeUI.tree('loadData', treeData);
    this.initializeTree('treeContainer', treeData);
    this.initializeContextMenu('treeContainer', treeData);
  }

  async fetchDB() {
    await fetch('http://192.168.12.135:7105/get_table_tree')
      .then(response => response.json())
      .then(data => {
        data.forEach(values => {
          console.log(this.strF.ToArray(values[1]), values[0], this.strF.ToBoolean(values[3]));
          this.addChildAtPath(treeData, this.strF.ToArray(values[1]), values[0], this.strFToBoolean(values[3]));
        });
      })
      .catch(error => console.error('Error:', error));
    console.log('treeData: ', treeData);
    await this.refreshEventHandlers('treeContainer', treeData);
  };

}




const arrF = new arrFunctions();
const strF = new strFunctions();
const looF = new listObjFunctions();
const treeF = new treeFunctions();
