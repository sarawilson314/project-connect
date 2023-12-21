# Project Connect
Set up APIs in R, Python, and JavaScript that interact with a MS SQL Server database. Choose your fighter: may the best API win.

## Description
This project demonstrates how to set up APIs in 3 different scripting languages. An API with 3 endpoints was created in each language (R using Plumber, Python using Flask, JavaScript using Express). These APIs interact with a SQL Server database via GET, POST and DELETE endpoints. GET endpoints display records from a database table, POST endpoints write new records to the database table, and DELETE endpoints delete the records from the database table. All APIs, the webpage front-end, and the database are hosted locally, with CORS enabled.

## Scripts and Folders

### images
Contains .png logos for each scripting language.

### api-setup.R
The database connection string and API endpoints built with R Plumber.

### api.R
The script to enable CORS and run the API built with R Plumber.

### api.js
The database connection string and API endpoints built with JavaScript Express.

### api.py
The database connection string and API endpoints built with Python Flask.
<br>dropdown_ui()

### index.html
The webpage front-end with in-line CSS.

### run-api-js.bat
Batch file to run the JavaScript Express API.

### run-api-py.bat
Batch file to run the Python Flask API.

### run-api-r.bat
Batch file to run the R Plumber API.

### script.js
JavaScript code for managing API interactions and displaying results on a webpage via button-click events.
