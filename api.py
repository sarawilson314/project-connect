from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL
import pandas as pd

app = Flask(__name__)

# Enable cross operation resource sharing
CORS(app)

# Establish database connection (outside of the API function)
connection_url = URL.create(
    "mssql+pyodbc",
    host="localhost",
    database="Project_Connect",
    query={"driver": "ODBC Driver 17 for SQL Server",
           "Trusted_Connection": "yes"},
)

@app.route('/api-py')
def index():
    try:

        # Connect to the database
        engine = create_engine(connection_url, fast_executemany=True)

        # Create a record to insert
        table_record = pd.DataFrame({'API_Output': ['Python is the best!']})
        
        # Insert the record into the database table
        table_record.to_sql('API_Outputs', con=engine, if_exists='append', index=False)

        # Query the database table
        query = 'SELECT * FROM API_Outputs'
        data = pd.read_sql(query, engine)

        # Select the last 5 rows based on the number of rows
        if len(data) > 0:
            data = data.tail(min(5, len(data)))

        # Disconnect from the database
        engine.dispose()

        # Create API returns
        response = {
            "message": "Python is the best!",
            "data": data.to_dict(orient='records')
        }

        return jsonify(response)

        # Query the database
        #with engine.connect() as connection:
        #    result = connection.execute(text("SELECT * FROM API_Outputs"))
        #    query_results = [dict(row) for row in result]  # Convert rows to dictionaries

        # Create a response dictionary
        #response = {
        #    "message": "Python is the best!",
        #    #"data": NULL
        #    #"data": query_results  # Include query results in the response
        #}

    except Exception as e:
        response = {
            "message": "An error occurred",
            "error": str(e)
        }
        print(e)
        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)