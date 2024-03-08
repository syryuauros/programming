#!/usr/bin/env python3

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json

app = Flask(__name__)
CORS(app)


# Database connection parameters
db_config = {
    'host': 'localhost',
    'user': 'auros',
    'password': 'auros1',
    'database': 'test'
}

@app.route('/insert_data', methods=['POST'])
def insert_data():
    tableName = 'test2'
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Get data from request
        data = request.json
        data_json = [json.dumps(data)]
        print(data_json)

        # Insert data into the database
        for row in data:
            # print(row)
            # cursor.execute(f"DESCRIBE {tableName};")
            # #
            cursor.execute(f"SELECT * FROM {tableName};")
            members = cursor.fetchall()
            for member in members:
                print(member)

            cursor.execute(f"INSERT INTO {tableName} (json_data) VALUES (%s)", data_json)
            #cursor.execute(f"INSERT INTO {tableName} (name, age) VALUES (%s, %s)", row)
            #
            # cursor.execute(f"DELETE FROM {tableName} WHERE name = 'Alice';")
            #
            # cursor.execute(f"DELETE FROM {tableName};")
            # cursor.execute(f"ALTER TABLE {tableName} AUTO_INCREMENT = 1;")

        #Commit changes and close connection
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Data inserted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7100, debug=True)
