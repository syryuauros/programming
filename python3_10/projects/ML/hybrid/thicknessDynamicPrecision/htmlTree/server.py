#!/usr/bin/env python3
from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Function to retrieve table hierarchy from MariaDB
def get_table_hierarchy():
    # Connect to MariaDB
    cnx = mysql.connector.connect(
        host="localhost",
        user="auros",
        password="auros1",
        database="test"
    )
    cursor = cnx.cursor()

    # Query to retrieve table hierarchy
    cursor.execute("SHOW TABLES")

    # Fetch all tables
    tables = cursor.fetchall()

    # Close cursor and connection
    cursor.close()
    cnx.close()

    # Return table names
    return [table[0] for table in tables]

# API endpoint to serve table hierarchy data
@app.route('/api/table-hierarchy')
def table_hierarchy():
    return jsonify(get_table_hierarchy())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7105, debug=True)
