# My Awesome E-commerce Web App

Welcome to my awesome e-commerce web application! This project is built using React and serves as a platform for users to browse, shop for products, and perform various actions like adding products to their cart.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Dependencies](#dependencies)
- [How to Run](#how-to-run)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mishka53787/my-store.git

   Navigate to the project directory:

   cd my-store  cd server

   Install project dependencies:

   npm install

   Features
Browse a wide range of products.
Add products to your shopping cart.
View and manage the items in your shopping cart.
Complete the checkout process.
Role-based authentication for admin and regular users.
users can perform CRUD operations on products .
Dependencies
This project relies on several dependencies, including but not limited to:

react: JavaScript library for building user interfaces.
react-router-dom: Routing library for React.
axios: Promise-based HTTP client for making API requests.
bcrypt: Library for hashing passwords.
jsonwebtoken: Library for creating JSON Web Tokens (JWTs).
express: Web application framework for Node.js.
mongoose: MongoDB object modeling library.
jest: JavaScript testing framework.
react-testing-library: Testing utilities for React components.
You can find the full list of dependencies in the package.json file

ISSUEs
bycrypt for login and registration causes the server to crash  due password comparison but will login and register and add to database.
to add products  or add to cart or  use contact page dont login or register because the if login or regsiter  server will crashes  and be able to add product or add cart or use contact page
due this issue can not use add product cause if you login or register it will crash .
if any other issues please see fit to make changes to this application either frontend or backend.

for Login

please use the 
{usernameOrEmail: "bibi@gmail.com", password: "revenge"}

any other will have 
401 unauthorized error

Testing
You can run tests for the application using the following command:

npm test

This will launch the test runner in interactive watch mode.

Deployment
To deploy the application for production, you can build it using:

npm run build

This command will create an optimized build of the application in the build folder, which you can then deploy to a hosting service of your choice.

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the project.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push your changes to your fork.
Create a pull request to the main repository.

License
This project is licensed under the MIT License. See the LICENSE file for details.


Feel free to replace the placeholders with actual links, project names, and descriptions to provide detailed information about your e-commerce web application.
