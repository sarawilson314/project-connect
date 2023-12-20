library(plumber)
library(odbc)
library(DBI)

# Connect to the database
con <- dbConnect(odbc::odbc(),
                 Driver = "SQL Server Native Client 11.0",
                 Server = "localhost",
                 Database = "Project_Connect",
                 Trusted_Connection = "Yes")

# GET data from database table
#* @get /api-r
function() {
  
  # Query the table
  data <- dbGetQuery(con, "SELECT * FROM API_Outputs")
  data <- tail(data, n = min(5, nrow(data)))
  
  # Create output for the API to return
  (list(data = data))
       
}

# POST data to database table
#* @post /api-r
function() {

  # Create and insert record into table
  table_record <- data.frame(API_Output = "R is the best!")
  dbAppendTable(con, "API_Outputs", table_record)

  list(message = "Record inserted")  
}

# POST request to delete records from database table
#* @post /delete-r
function() {
  
  # Delete records from the table
  dbExecute(con, "DELETE FROM API_Outputs")
  
  list(message = "Records deleted")
}


#dbExecute(con, "DELETE FROM API_Outputs")
