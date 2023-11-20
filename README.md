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

   npm install or npm install --force

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

##To add to cart
At the bottom of products page there is login button please use this button to add cart 
it may seem to add cart without login but  it will produce an error.

## Troubleshooting

Provide troubleshooting tips for common issues, errors, or questions that users might encounter. Include possible solutions or links to relevant resources.

### Nodemon Restarts

If you see messages like `[nodemon] restarting due to changes...` and your server restarts, don't worry; this is the expected behavior of Nodemon. It automatically restarts the server when it detects changes in your code.

### ReferenceError: JWT_SECRET is not defined

If you encounter the "ReferenceError: JWT_SECRET is not defined" error, make sure you have defined your JWT secret key correctly. You can use environment variables to store the secret key. Here's how to define it:

```javascript
// Sample JWT Secret (replace with a secure secret)
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

Replace 'your-fallback-secret-key' with your actual secret key. In production, set the JWT_SECRET environment variable securely.

Login Failed with an Unexpected Error
If you face an issue with login failing and receiving a 500 (Internal Server Error) response, please check your server logs and the code in your login route. Investigate the specific error message and corresponding code to identify and fix the issue. Remember to log server-side errors for easier debugging.


This section in your README file will help users understand and troubleshoot these common issues.

Deployment
To access the code and deployed application, you can visit the GitHub repository:
[My Awesome E-commerce Web App on GitHub](https://github.com/mishka53787/my-store)

## Admin Login

To access the admin functionality of this application, you can use the following login credentials:

- Username: admin53787
- Password:'adminpassword'
Use these credentials to log in and test the admin-specific features of the application.

  if user fails to delete or update account they
  will see a pop up saying they failed for to update or delete respectively for certain amount of seconds(limited time is to prevent crashes)


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

Usage
User Registration and Login
To access certain features such as adding items to the cart, users need to register an account or log in if they already have an account.

Click on the "Register" link in the navigation menu to create a new account with a username, email, and password.

After registration, use the "Login" link in the navigation menu to log in with your credentials.
Features Available for Logged-In Users
Adding Items to Cart: Once logged in, users can browse through products and add items to their shopping cart.
At the bottom of products page there is login buttton next  to the Add product button this would allow you to add to cart and add a product
Viewing Cart and Making Purchases: Users can access their cart, view added items, and proceed to checkout to make purchases.


Admin Functionalities

Admin Privileges: An admin user has additional functionalities beyond a regular user.
Accessing Admin Features: To access admin features, log in with admin credentials (e.g., username: admin, password: adminpassword).
Admin Dashboard: The admin dashboard allows adding new products to the store.


Known Issues

Users, both regular and admin, may face issues when trying to add items to the cart. This issue is currently being addressed by the development team.




License
This project is licensed under the MIT License. See the LICENSE file for details.


Feel free to replace the placeholders with actual links, project names, and descriptions to provide detailed information about your e-commerce web application.
