## main.R ##
## ------ ##
library(plumber)
r <- plumb("C:/Users/chuai/Desktop/Learning Programming/Projects/OptimalDiet/optimal-diet/R-API/rAPI.r")
r$run(port=8000)
