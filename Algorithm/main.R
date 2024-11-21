## main.R ##
## ------ ##
library(plumber)
r <- plumb("C:/Users/Iorie/Desktop/Learning Programming/Projects/OptimalDiet/Algorithm/rAPI.R")
r$run(port=8000)
