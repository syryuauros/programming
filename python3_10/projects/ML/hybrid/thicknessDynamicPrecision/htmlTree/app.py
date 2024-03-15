#!/usr/bin/env python3

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection configuration
db = mysql.connector.connect(
    host="localhost",
    user="auros",
    password="auros1",
    database="test"
)

tableName = "htmlTree2"
dbTableName = "htmlTree2DB"

# Route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch and return table contents as JSON
@app.route('/get_table_tree')
def get_table_tree():
    cursor = db.cursor()
    cursor.execute(f"SELECT * FROM {tableName} ORDER BY path DESC")
    table1 = [table for table in cursor.fetchall()]
    print('table1: ', table1)
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(table1)

@app.route('/add_folder', methods=['POST'])
def add_folder():
    tr_json = request.get_json()
    text = tr_json['text']
    path = tr_json['path']
    state = tr_json['state']
    isFolder = 'true'

    cursor = db.cursor()
    cursor.execute(f"INSERT INTO {tableName} (text, path, state, isFolder) VALUES ('{text}', '{path}', '{state}', '{isFolder}');")
    db.commit()
    cursor.close()
    return jsonify({ })

@app.route('/remove_folder', methods=['POST'])
def remove_folder():
    tr_json = request.get_json()
    targetPath = str(tr_json['targetPath'])
    print(targetPath)
    targetPathIncluding = targetPath[:-1]

    cursor = db.cursor()
    cursor.execute(f"DELETE FROM {tableName} WHERE path LIKE '%{targetPathIncluding}%';")
    cursor.execute(f"DELETE FROM {dbTableName} WHERE path LIKE '%{targetPathIncluding}%';")
    db.commit()
    cursor.close()
    return jsonify({ })

@app.route('/add_file', methods=['POST'])
def add_file():
    tr_json = request.get_json()
    text = tr_json['text']
    path = tr_json['path']
    state = 'open'
    isFolder = 'false'
    fileContents = tr_json['fileContents']

    cursor = db.cursor()
    cursor.execute(f"INSERT INTO {tableName} (text, path, state, isFolder) VALUES ('{text}', '{path}', '{state}', '{isFolder}');")
    cursor.execute(f"INSERT INTO {dbTableName} (path, fileContents) VALUES ('{path}', '{fileContents}');")
    db.commit()
    cursor.close()
    return jsonify({ })


@app.route('/update_folder', methods=['POST'])
def update_folder():
    tr_json = request.get_json()
    newName = tr_json['newName']
    targetPath = tr_json['targetPath']

    cursor = db.cursor()
    print(f"UPDATE htmlTree2 SET text = '{newName}' WHERE path = '{targetPath}';")
    cursor.execute(f"UPDATE {tableName} SET text = '{newName}' WHERE path = '{targetPath}';")
    db.commit()
    cursor.close()
    return jsonify({ })




# API endpoint to fetch folder hierarchy data
@app.route('/folders')
def get_folders():
    cursor = db.cursor()
    cursor.execute("SELECT folder_id, folder_name, parent_folder_id FROM folders WHERE parent_folder_id = folder_id")
    folders = [{'folder_id': folder[0], 'folder_name': folder[1], 'parent_folder_id': folder[2]} for folder in cursor.fetchall()]
    cursor.close()
    return jsonify(folders)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7105, debug=False)


#create table htmlTree2 (     text VARCHAR(30),     path VARCHAR(50) PRIMARY KEY,     state VARCHAR(30),   isFolder VARCHAR(10), fileContents Json );
#DROP TABLE htmlTree;
#CREATE USER 'auros'@'localhost' IDENTIFIED BY 'auros1';
#GRANT ALL PRIVILEGES ON *.* TO 'auros'@'localhost';
#FLUSH PRIVILEGES;
#create table htmlTree2DB ( path VARCHAR(50) PRIMARY KEY, fileContents JSON );
