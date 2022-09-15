# Storefront-Backend-API

## Database and Application Setup

### Database Setup and User Creation
- From inside psql shell,
- The following databases need to be created: `store` and `store_test`
- To create them run the following SQL commands:
- `CREATE DATABASE store;`
- `CREATE DATABASE store_test;`
- A user with the following credentials should be created:
- `Username: full_stack_user`
- `Password: password123`
- To create this user run the following SQL command:
- `CREATE USER full_stack_user WITH PASSWORD 'password123';`
- The user must be given permissions of usage of the mentioned databases
- To grant permissions to the user, run the following SQL commands:
- `GRANT ALL PRIVILEGES ON DATABASE store TO full_stack_user;`
- `GRANT ALL PRIVILEGES ON DATABASE store_test TO full_stack_user;`
- Basic Schema and Tables in the database are outlined in the `REQUIREMENTS.md` file.

### Setting up the application
- To get started in running the application, the packages outlined in `package.json` should be installed
- To do that run the following command in the shell:
- `npm install`
- To create the tables in the database, the migrations should be run
- To run the migrations, run the following command in the shell:
- `npm run migrate-up`
- Now, the application is ready for running and testing
- To start the application, run the following command in the shell:
- `npm run start`
- To run tests, run the following command in the shell:
- `npm run test`
- You can access the application through `http://localhost:3000`
- Basic endpoints in the application are outlined in the `REQUIREMENTS.md` file.

## Used Technologies
This application make uses of the following libraries and technologies:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Application Structure

- Refer to the `REQUIREMENTS.md` file for the endpoints of the application and basic structure of the database