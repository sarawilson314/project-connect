from flask import Flask, jsonify
from flask_cors import CORS

# Create an instance of the Flask class
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing)
CORS(app)

# Define a route for the root URL ("/")
# When you visit the root URL the function index() will be executed.
@app.route('/py-api')
def index():

    # Define a dictionary
    data = ["item1", "item2", "item3"]

    # Create a response dictionary
    response = {
        "message": "Python is the best!",
        "data": data
    }

    # Use jsonify to return a JSON response
    return jsonify(response)

# Check if the executed file is the main program and run the app.
# If you import this script as a module in another script, the app will not run.
if __name__ == '__main__':
    app.run(debug=True)