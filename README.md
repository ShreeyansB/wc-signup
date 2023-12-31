# wc-signup

### Architecture

-   MongoDB used as backend for storing user details. Hashed and salted password stored in db.
-   Express.js backend REST API for login and signup requests. Authenticates the user and return a JWT
-   Simple React website styled with Tailwind with Login and Signup pages.

### Setup Commands

#### MongoDB

```
use wc
db.createCollection('users')
db.users.createIndex({email: 1}, {unique: true})
db.users.createIndex({phone: 1}, {unique: true})
```

#### Backend Server

Create .env file in root directory with db url to pass environment variable to app

```
DATABASE_URL="mongodb+srv://<user>:<password>@<database>.mongodb.net/wc?retryWrites=true&w=majority"
```

#### Website

Pass the backend URL as environment variable if not using localhost:3000 for backend

```
REACT_APP_BACKEND_URL="<backendurl>"
```
