# Backend API

For User Authentication

```
node index.js
```

## API Docs

### Fetch Balance Sheet

POST /login

-   Description: Authenticates user credentials and return jwt
-   Request:

```json
{
    "email": "string",
    "password": "string"
}
```

```json
{
    "phone": "string",
    "password": "string"
}
```

-   Response:

```json
{
    "status": "string",
    "message": "string",
    "jwt": "string"
}
```

-   Error Response (same for SignUp):

```json
{
    "error": "string",
    "message": "string"
}
```

POST /signup

-   Description: Registers a users and returns jwt
-   Request:

```json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string"
}
```

-   Response:

```json
{
    "status": "string",
    "message": "string",
    "jwt": "string"
}
```
