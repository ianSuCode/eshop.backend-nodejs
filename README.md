# eshop.backend-nodejs

A backend restapi created by Node.js + Express

+ Mongo DB

+ JWT

+ Roles and Permissions (Only users with the "Admin" role can use the admin function.)

+ Middleware:

  + Global Error Handling: Captures Express errors and handles them.

  + Authorization Token Parsing: Reads and validates authorization tokens, extracting user information for HTTP responses.

  + User Role Retrieval: Extracts user role information from HTTP responses.

+ Model:

  + ID Transformation: Converts "_id" fields to "id".

  + Data Relationships: Establishes data relationships between different entities.

+ Seed Data
Provides mock data for easier testing.
	```
	npm run seed-data
	```
+ Logger: Implemented with 3 levels - <font color=green>*info*</font>, <font color=orange>*warn*</font>, and <font color=red>*error*</font>.