# eshop.backend-nodejs
A backend restapi created by Node.js + Express
+ Mongo DB
+ JWT
+ Roles and Permissions (Only users with the 'Admin' role can access/administer the 'admin' function.)

# Feature
+ User Registration: Backend API for registering new users.
+ Middleware:
  + Global Error Handling: Captures Express errors and handles them appropriately.
  + Authorization Token Parsing: Reads and validates authorization tokens, extracting user information for HTTP responses.
  + User Role Retrieval: Extracts user role information from HTTP responses.
+ Model:
  + ID Transformation: Converts "_id" fields to "id" for better compatibility.
  + Data Relationships: Establishes data relationships between different entities.
+ Seed Data: Provides mock data for easier testing.
+ Logger: Implemented with three levels - 'info', 'warn', and 'error' for detailed logging and monitoring.
