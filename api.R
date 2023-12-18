library(plumber)
library(odbc)
library(DBI)

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
  table_record <- data.frame(API_Output = "R is the best!")
  
  # Insert record into table
  dbAppendTable(con, "API_Outputs", table_record)
  
  # Query the table
  data <- dbGetQuery(con, "SELECT * FROM API_Outputs")
  
  # Create output for the API to return
  if (nrow(data) == 0) {
    data <- ""
  } else if (nrow(data) == 1) {
    data <- data[nrow(data),]
  } else if (nrow(data) == 2) {
    data <- data[(nrow(data)-1):nrow(data),]
  } else if (nrow(data) == 3) {
    data <- data[(nrow(data)-2):nrow(data),]
  } else if (nrow(data) == 4) {
    data <- data[(nrow(data)-3):nrow(data),]
  } else if (nrow(data) >= 5) {
    data <- data[(nrow(data)-4):nrow(data),]
  }
  
  # Disconnect from the database
  dbDisconnect(con)
  
  # Create output for the API to return
  list(message = "R is the best",
       data = data)
       
}

#dbExecute(con, "DELETE FROM API_Outputs")
