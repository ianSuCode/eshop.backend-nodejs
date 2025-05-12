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

## Docker Compose Setup

This project is designed to work with Docker Compose, integrating three main services:

+ `web`: Frontend service (eshop.frontend-react)
  - Runs on port 5173
  - Configured with hot-reload for development
  - Depends on the API service

+ `api`: Backend service (this repository)
  - Runs on port 8000
  - Automatically runs seed data on startup
  - Depends on the MongoDB service
  - Configured with hot-reload for development

+ `db`: MongoDB service
  - Runs on port 27017
  - Persistent volume storage

### Docker Compose Configuration

Place this `compose.yaml` file in the parent directory of both repositories:

```yaml
version: '3.8'

services:
  web:
    depends_on:
      - api
    build: ./eshop.frontend-react
    ports:
      - 5173:5173
    environment:
      - VITE_API_URL=http://localhost:8000
    command: npm run dev -- --host
    develop:
      watch:
        - path: ./eshop.frontend-react/package.json
          action: rebuild
        - path: ./eshop.frontend-react/package-lock.json
          action: rebuild
        - path: ./eshop.frontend-react
          target: /app
          action: sync

  api:
    depends_on:
      - db 
    build: ./eshop.backend-nodejs
    ports:
      - 8000:8000
    environment:
      - PORT=8000
      - DATABASE_URI=mongodb://db:27017/eshop
      - JWT_SECRET=your-secret-key
      - NODE_ENV=development
    command: sh -c "npm run seed-data && npm start"
    develop:
      watch:
        - path: ./eshop.backend-nodejs/package.json
          action: rebuild
        - path: ./eshop.backend-nodejs/package-lock.json
          action: rebuild
        - path: ./eshop.backend-nodejs
          target: /app
          action: sync

  db:
    image: mongo:latest
    ports:
      - 27017:27017
    volumes:
      - eshop:/data/db

volumes:
  eshop: {}
```

To start all services:
```bash
docker compose up
```

## Repository Structure

To use this project with Docker Compose, ensure the following directory structure:

```
parent-directory/
├── compose.yaml
├── eshop.backend-nodejs/    (this repository)
└── eshop.frontend-react/    (frontend repository)
```

## Frontend Integration

This backend is designed to work with [eshop.frontend-react](https://github.com/your-username/eshop.frontend-react) repository. The frontend is a React application built with:

- Vite as the build tool
- React context for state management
- Protected routes for authentication
- Admin and user role separation

The frontend communicates with this backend through RESTful APIs, with the base URL configured through the environment variable `VITE_API_URL`.


