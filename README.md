![1](https://github.com/user-attachments/assets/e3c2a265-2faf-4e69-b810-8cc8e994cc78)# Diet Optimization App

This app provides an intuitive solution for optimizing diet costs while meeting macronutrient requirements using the simplex method. It also allows logged-in users to save and manage their personalized diets for future reference.

## Features
- **Cost Optimization**: Determine the most cost-efficient diet plan tailored to your macronutrient goals.
- **Diet Management**: Save, access, and update your custom diets through a user-friendly interface.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, React
- **State Management**: Redux
- **Backend**: Express.js, MongoDB
- **Optimization Engine**: R (Simplex method)

## Screenshots

### Food Selection Page
![1](https://github.com/user-attachments/assets/bf1ce051-5618-4308-9093-59d7dcafccd3)

### Optimization Results Page
![2](https://github.com/user-attachments/assets/320d7e95-9e03-4423-bce5-859ed8b50fba)

### Saved Diets Page
![3](https://github.com/user-attachments/assets/adae4dde-81e5-4b12-8487-c02f54c935f0)

## Getting Started

### Prerequisites
1. [Node.js](https://nodejs.org/) (for the frontend and backend)
2. [R](https://www.r-project.org/) (for the optimization engine)
3. MongoDB (as the database)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/diet-optimization-app.git
   cd diet-optimization-app
   ```

2. Install dependencies for the client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Start the R API:
   - Install necessary R packages for optimization.
   - Run the R server script (instructions specific to your R setup).

4. Run the app:
   - Start the frontend:
     ```bash
     cd client
     npm run dev
     ```
   - Start the backend:
     ```bash
     cd server
     npm run start
     ```

5. Open your browser and navigate to `http://localhost:5173` to use the app.

