@echo off
:: THE EQUAL SIGN BELOW NEEDS RIGHT NEXT TO THE VARIABLE NAME BELOW
:: set /p user_input= Enter Input Here: 
:: user input gets sent to R as character vector (space is the delimiter for the vector)
:: Example: "random input from user 1258" gets to R as c("random", "input", "from", "user", "1258")
:: Rscript "script.R" %user_input%

Rscript "api.R"

pause