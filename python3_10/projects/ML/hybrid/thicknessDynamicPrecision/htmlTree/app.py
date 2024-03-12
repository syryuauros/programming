#!/usr/bin/env python3

from flask import Flask, render_template, jsonify
from flask_cors import CORS
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

# Route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch and return table contents as JSON
@app.route('/get_table_tree')
def get_table_tree():
    cursor = db.cursor()
    cursor.execute("SELECT * from htmlTree2")
    # cursor.execute("SHOW TABLES")
    table1 = [table for table in cursor.fetchall()]
    table10 = list(table1[0])
    # cursor.execute("SELECT * from htmlTree2")
    # tables = [table[0] for table in cursor.fetchall()]
    print('table1: ', table1)
    print('table10: ', table10)
    # print('table1[0]: ', table1[0])
    # print('table1[1]: ', table1[1])
    # print('tables: ', tables)
    rows = cursor.fetchall()
    cursor.close()
    return jsonify(table1)

# API endpoint to fetch folder hierarchy data
@app.route('/folders')
def get_folders():
    cursor = db.cursor()
    cursor.execute("SELECT folder_id, folder_name, parent_folder_id FROM folders WHERE parent_folder_id = folder_id")
    folders = [{'folder_id': folder[0], 'folder_name': folder[1], 'parent_folder_id': folder[2]} for folder in cursor.fetchall()]
    cursor.close()
    return jsonify(folders)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7105, debug=True)
