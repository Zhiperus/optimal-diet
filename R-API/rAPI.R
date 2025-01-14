library(plumber)
library(jsonlite)

# CORS filter to handle cross-origin requests
#' @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")  # Allow requests from any origin
  
  if (req$REQUEST_METHOD == "OPTIONS") {  # Handle preflight requests
    res$setHeader("Access-Control-Allow-Methods", "*")  # Allow all methods
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)  # Allow all headers
    res$status <- 200 
    return(list())  # Return an empty response for preflight
  } else {
    plumber::forward()  # Forward other requests to the appropriate route
  }
}

## Dual Simplex Maximization Function ##
## ----------------------------------- ##
#' @post /createmodel
#' @serializer unboxedJSON
#' @param values:[int]
maxDualSimplex <- function(req) {
  # Parse input data from the request body
  data <- req$postBody
  values <- jsonlite::fromJSON(data)
  
  # Extract nutrition list, prices, and food amount
  nutrition_list <- as.vector(unlist(values["data"][[1]][[1]]))
  prices <- as.vector(unlist(values["data"][[1]][[2]]))
  food_amount <- values["data"][[1]][[3]]
  
  # Construct initial tableau
  tableau <- matrix(nutrition_list, nrow = 18, ncol = food_amount, byrow = TRUE)
  tableau <- rbind(tableau, diag(food_amount))  # Add serving constraints
  tableau <- rbind(tableau, prices)  # Add objective function coefficients
  tableau <- cbind(tableau, diag(food_amount + 19))  # Extend tableau for constraints
  
  # Add constraint values
  constraints <- c(2250, -2000, 300, 65, 2400, 300, 100, -25, 100, -50, 50000, -5000, 20000, -50, 1600, -800, 30, -10)
  constraints <- append(constraints, rep(10, food_amount))  # Append slack constraints
  constraints <- append(constraints, 0)  # Append objective function's RHS
  tableau <- cbind(tableau, constraints)  # Append constraints to tableau
  
  iterations <- list()  # Store iterations for debugging and analysis
  
  # Function to find the pivot column
  pivotCol <- function(Z, PR) {
    min <- Inf  # Initialize minimum ratio as infinity
    col <- -1   # Default column index
    
    for (i in 1:length(PR)) {
      if (PR[i] != 0 && Z[i] != 0) {  # Avoid division by zero
        ratio <- Z[i] / PR[i]
        # Update min and column index based on rules
        if ((ratio < min && ratio >= 0) || (ratio >= 0 && min == Inf)) {
          min <- ratio
          col <- i
        }
      }
    }
    
    if (col == -1) {
      print("No valid pivot column found")  # Error handling
      return(NULL)  # Return NULL if no valid pivot column exists
    }
    
    col  # Return the pivot column index
  }
  
  # Function to compute the basic solution from the tableau
  compute_solution <- function(tableau) {
    basic_solution <- numeric(ncol(tableau) - 1)  # Initialize solution vector
    
    for (i in 1:(ncol(tableau) - 1)) {
      nonzero_rows <- which(tableau[, i] != 0)
      
      if (length(nonzero_rows) == 1) {  # Check if variable is basic
        row_index <- nonzero_rows
        basic_solution[i] <- tableau[row_index, ncol(tableau)] / tableau[row_index, i]  # Compute solution
      } else {
        basic_solution[i] <- 0  # Non-basic variables are zero
      }
    }
    
    return(basic_solution)  # Return basic solution
  }
  
  # Dual simplex algorithm loop
  counter <- 1
  while (-1 %in% sign(tableau[, ncol(tableau)]) && 
         -1 %in% sign(tableau[nrow(tableau), 1:(ncol(tableau) - 1)])) {
    PR <- which(tableau[, ncol(tableau)] == -max(-tableau[, ncol(tableau)]))  # Pivot row
    PC <- pivotCol(tableau[nrow(tableau), ], tableau[PR, ])  # Pivot column
    
    if (is.null(PC)) {
      return(list(status = "error", 
                  message = "It is not possible to meet the nutritional constraints with the foods selected."))
    }
    
    # Store iteration details
    iterations <- append(iterations, list(
      iteration = list(
        tableau = tableau, 
        basicSolution = compute_solution(tableau), 
        Z = tableau[nrow(tableau), ncol(tableau)]
      )
    ))
    
    tableau[PR, ] <- tableau[PR, ] / tableau[PR, PC]  # Normalize pivot row
    
    # Update all other rows
    for (i in 1:nrow(tableau)) {
      if (i == PR) next  # Skip pivot row
      tableau[i, ] <- tableau[i, ] - (tableau[PR, ] * tableau[i, PC])  # Row operations
    }
  }

  
  # Store iteration details
  iterations <- append(iterations, list(
    iteration = list(
      tableau = tableau, 
      basicSolution = compute_solution(tableau), 
      Z = tableau[nrow(tableau), ncol(tableau)]
    )
  ))
  
  basic_solution <- compute_solution(tableau)  # Compute final basic solution
  
  # Return final results
  list(
    status = "success", 
    finalTableau = tableau, 
    basicSolution = basic_solution, 
    Z = tableau[nrow(tableau), ncol(tableau)], 
    iterations = iterations
  )
}
