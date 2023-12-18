from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL

app = Flask(__name__)
CORS(app)

# Establish database connection (outside of the route function)
connection_url = URL.create(
    "mssql+pyodbc",
    host="localhost",
    database="Project_Connect",
    query={"driver": "ODBC Driver 17 for SQL Server",
           "Trusted_Connection": "yes"},
)

engine = create_engine(connection_url, fast_executemany=True)

@app.route('/py-api')
def index():
    try:
        # Query the database
        with engine.connect() as connection:
            result = connection.execute(text("SELECT * FROM API_Outputs"))
            query_results = [dict(row) for row in result]  # Convert rows to dictionaries

        # Create a response dictionary
        response = {
            "message": "Python is the best!",
            "data": query_results  # Include query results in the response
        }

    except Exception as e:
        response = {
            "message": "An error occurred",
            "error": str(e)
        }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)