library(plumber)
library(odbc)
library(DBI)

# GET data from database table
#* @get /api-r
function() {
  
  # Connect to the database
  con <- dbConnect(odbc::odbc(),
                   Driver = "SQL Server Native Client 11.0",
                   Server = "localhost",
                   Database = "Project_Connect",
                   Trusted_Connection = "Yes")
  
  # Query the table
  data <- dbGetQuery(con, "SELECT * FROM API_Outputs")
  data <- tail(data, n = min(5, nrow(data)))
  dbDisconnect(con)
  
  # Create output for the API to return
  list(data = data)
       
}

# POST data to database table
#* @post /insert-record-r
function() {
  # Connect to the database
  con <- dbConnect(odbc::odbc(),
                   Driver = "SQL Server Native Client 11.0",
                   Server = "localhost",
                   Database = "Project_Connect",
                   Trusted_Connection = "Yes")

  # Create and insert record into table
  table_record <- data.frame(API_Output = "R is the best!")
  dbAppendTable(con, "API_Outputs", table_record)
  dbDiscconect(con)

  list(message = "Record inserted")  
}

#dbExecute(con, "DELETE FROM API_Outputs")
