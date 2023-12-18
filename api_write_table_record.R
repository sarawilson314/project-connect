library(plumber)
library(odbc)

# Define the endpoint function
#* @get /r-api

function() {
  
  # Connect to localhost database using SQL Server Native Client 11.0 with Trusted_Connection = "Yes"
  con <- dbConnect(odbc::odbc(),
                   Driver = "SQL Server Native Client 11.0",
                   Server = "localhost",
                   Database = "Project_Connect",
                   Trusted_Connection = "Yes")
  
  # Create record
  table_record <- data.frame(API_Output = "R is the best")
  
  # Insert record into table
  dbAppendTable(con, "API_Outputs", table_record)
  
  # Query the table
  data <- dbGetQuery(con, "SELECT * FROM API_Outputs")
  
  # Disconnect from the database
  dbDisconnect(con)
  
  # Create output for the API to return
  list(message = "R is the best",
       data = data[(nrow(data)-4):nrow(data),])
       
}
