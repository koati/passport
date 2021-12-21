# Passport

## What are you going to learn?

- Create backend authentication
- Using user sessions
- Using a database (mongodb)

## Tasks

1. We need a database to store the users. The database needs to contain the user's `ID card number`, `name` and `password`.
    - There is a database containing the columns `ID card number`, `name` and `passord`
    - When we get to the route "/users", the page writes out every registered users' name
    - When there are no users registered in the database, the page writes "No users in the system"
    - The local mongodb database name: passport

2. Registration is a need when we speak about authentication. The process will need a name, password and ID number that will be stored in a database.
    - There is a registration form in the route "/registration"
    - When we register successfuly, the webpage redirects to the login page
    - If the ID number is already in the database, it writes to the page "User already registered"

3. After logging in on the site, we need to get the user in a session. For the login process, the user needs to add his ID number and his password.
    - There is a login form in the route "/login"
    - When we log in successfuly, the page redirects to the profile page
    - If the ID or the password is incorrect, the page writes to the page "ID number or password is incorrect"

4. This page will contain the personal information about the user. This is not your work to implement, so you need to write out just the user name and ID.
    - If we try to access this page without authentication, it redirects to the login page
    - When we get to this page, our registered ID and name is displayed in the page
    - There is a logout button in the page that logs us out from the session and drops us to the login page

## Hints

- Always store the users password hashed.

## Background materials

- <i class="far fa-book-open"></i> [MERN Sessions-Based Login - 1](https://www.shawndsilva.com/blog/web-development/MERN-Sessions-Authentication-App-Part-1-Nodejs-and-Express-Backend.html)
- <i class="far fa-book-open"></i> [MERN Sessions-Based Login - 2](https://www.shawndsilva.com/blog/web-development/REACT-REDUX-TURORIAL.html)
- <i class="far fa-book-open"></i> [Different ways for User Authentication with NodeJS - 1](https://dev.to/lavig10/different-ways-for-user-authentication-with-nodejs-1odj/)
- <i class="far fa-book-open"></i> [Different ways for User Authentication with NodeJS - 2](https://dev.to/lavig10/different-ways-for-user-authentication-with-nodejs-part-2-jwt-3h0p/)
