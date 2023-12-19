library(plumber)

source("api-setup.R")

# Create a new plumber router
pr <- plumb("C:/Users/swilson/Desktop/Project Connect/api-setup.R")

# Enable CORS (Cross-Origin Resource Sharing) needed when deploying locally
pr$registerHooks(list(
  'preroute' = function(req, res) {
    if (req$REQUEST_METHOD == "OPTIONS") {
      res$setHeader('Access-Control-Allow-Origin', '*')
      res$setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res$setHeader('Access-Control-Allow-Headers', 'Content-Type')
      plumber::forward()
    }
  },
  'postroute' = function(req, res) {
    res$setHeader('Access-Control-Allow-Origin', '*')
  }
))

# Run the API
pr$run(port=8000)

