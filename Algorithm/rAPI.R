library(plumber)
library(jsonlite)

#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
  
}

## functions.R ##
## ----------- ##
#* @post /createmodel
#* @serializer unboxedJSON
#* @param values:[int]
maxDualSimplex <- function(req){
  data <- req$postBody
  values <- jsonlite::fromJSON(data)
  
  nutrition_list <- as.vector(unlist(values["data"][[1]][[1]]))
  prices <- as.vector(unlist(values["data"][[1]][[2]]))
  food_amount <- values["data"][[1]][[3]]

  tableau <- matrix(nutrition_list, nrow=18, ncol=food_amount, byrow=TRUE)
  tableau <- rbind(tableau, diag(food_amount))
  tableau <- rbind(tableau, unlist(prices))
  tableau <- cbind(tableau, diag(food_amount + 19))
  constraints <- c(2250, -2000 ,300 ,65 ,2400 ,300 ,100 ,-25  ,100 ,-50 ,50000 ,-5000 ,20000, -50 , 1600 , -800 ,   30 ,  -10)
  for(i in 1:food_amount){
   constraints <- append(constraints, 10)
  }
  constraints <- append(constraints, 0)
  tableau <- cbind(tableau, unlist(constraints))

  pivotCol <- function(Z, PR) {
    # Initialize variables
    min <- Inf  # Start with infinity for comparison
    col <- -1   # Default value for column index
    
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
      print("No valid pivot column found")
      return(NULL)  # Return NULL if no valid pivot column
    }
    
    col  # Return the pivot column index
  }

  # Function to compute the basic solution from the tableau
  compute_solution <- function(tableau){
    nonzero_counter <- 0  # Counter for non-zero elements
    basic_solution <- c(1:(ncol(tableau)-1))  # Initialize basic solution
    for(i in 1:(ncol(tableau)-1)){  # Loop through the columns
      for(j in 1:nrow(tableau)){  # Loop through the rows
        if(tableau[j,i] != 0){  # If the element is non-zero
          nonzero_counter = nonzero_counter + 1  # Increment counter
          nonzero_value <- tableau[j,i]  # Store the non-zero value
          nonzero_index <- j  # Store the row index
        }

        if(nonzero_counter > 1){  # If more than one non-zero found, break
          basic_solution[i] = 0  # Set to 0
          break
        }
      }
      if(nonzero_counter == 1){  # If exactly one non-zero found
        basic_solution[i] = tableau[nonzero_index, ncol(tableau)] / tableau[nonzero_index, i]  # Compute basic solution
      }
      nonzero_counter <- 0  # Reset counter for the next column

    }

    basic_solution  # Return the basic solution vector
  }

 counter <- 1;
  while(-1 %in% sign(tableau[, ncol(tableau)]) && -1 %in% sign(tableau[nrow(tableau), 1:ncol(tableau)-1])){  # While there are negative elements in the last row
    PR <- which(tableau[, ncol(tableau)] == -1* max(-1*tableau[, ncol(tableau)]))
    PC <- pivotCol(tableau[nrow(tableau), ], tableau[PR, ])  # Find the pivot column
    if(is.null(PC)){
      return (list(status="error", message="It is not possible to meet the nutritional constraints with the foods that you have selected."))
    }
    tableau[PR, ] <- tableau[PR, ] / tableau[PR,PC]  # Normalize the pivot row

    for(i in 1:nrow(tableau)){  # Update the tableau
      if(i == PR)  # Skip the pivot row
        next
      tableau[i, ] = tableau[i, ] - (tableau[PR, ] * tableau[i, PC])  # Apply the pivot row operation
    }
  }

  basic_solution <- compute_solution(tableau)  # Compute basic solution if maximizing

  # Return a list containing the final tableau, basic solution, and objective value
  list(status="success", finalTableau = tableau, basicSolution = basic_solution, Z = tableau[nrow(tableau), ncol(tableau)])
}