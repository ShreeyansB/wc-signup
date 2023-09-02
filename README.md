# wc-signup

### Architecture
- MongoDB used as backend for storing user details. Hashed and salted password stored in db. 
- Express.js backend REST API for login and signup requests. Authenticates the user and return a JWT
- Simple React website styled with Tailwind with Login and Signup pages.

### MongoDB Setup Commands

```
use wc
db.createCollection('users')
db.users.createIndex({email: 1}, {unique: true})
db.users.createIndex({phone: 1}, {unique: true})
```


