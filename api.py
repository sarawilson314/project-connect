from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable cross operation resource sharing

# Establish database connection
connection_url = URL.create(
    "mssql+pyodbc",
    host="localhost",
    database="Project_Connect",
    query={"driver": "ODBC Driver 17 for SQL Server", "Trusted_Connection": "yes"},
)

engine = create_engine(connection_url, fast_executemany=True)

@app.route('/api-py', methods=['POST'])
def post_message():
    try:
        # Create a record to insert
        table_record = pd.DataFrame({'API_Output': ['Python is the best!']})
        
        # Insert the record into the database table
        table_record.to_sql('API_Outputs', con=engine, if_exists='append', index=False)

        response = {
            "message": "Record added successfully!"
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

@app.route('/api-py', methods=['GET'])
def get_last_five_records():
    try:
        # Query the database table
        query = 'SELECT TOP 5 * FROM API_Outputs'
        data = pd.read_sql(query, engine)

        response = {
            "data": data.to_dict(orient='records')
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)