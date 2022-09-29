# Server-side

Developed with Express.js

## Database

The project uses a [MongoDB](https://www.mongodb.com) to store data.
To create a database online you can find instructions [here](https://www.mongodb.com/basics/create-database).

## Environment Variables

* **NAME** - name of project, examle: SpaceX Dragons
* **URL** - url where you are going to deploy the application, examle: http://localhost:5000
* **CLIENT_URL** - url of client-side, examle: http://localhost:3000
* **PORT** - port
* **DB_URL** - MongoDB connection string
* **JWT_ACCESS_KEY** - key for access token
* **JWT_REFRESH_KEY** - key for refresh token
* **SMTP_HOST** - SMPT host to send e-mail
* **SMTP_PORT** - port to send e-mail
* **SMTP_USER** - user to send e-mail
* **SMTP_PASSWORD** - password to send e-mail

## API endpoints

### `/registration`
method **POST**

Body:
* email - *string, required*
* password - *string, length: min - 4 / max - 32, required*

Response: 
{
    user: { email, id, isActivated },
    accessToken,
    accessToken
}

### `/login`
method **POST**

Body:
* email - *string, required*
* password - *string, required*

Response: 
{
    user: { email, id, isActivated },
    accessToken,
    accessToken
}

### `/logout`
method **POST**

### `/activate/:link`
method **GET**

*to activate account*

Params:
* link - *string, required*

### `/sendmail`
method **POST**

*send activation e-mail*

Headers:
* authorization - *Bearer acces token*

### `/refresh`
method **GET**

*refresh tokens*

Response: 
{
    user: { email, id, isActivated },
    accessToken,
    accessToken
}

### `/email`
method **PUT**

*change user e-mail*

Headers:
* authorization - *Bearer acces token*

Body:
* email - *string, required*

Response:
{
    id, email, isActivated,
    favouritesDragons: string[]
}

### `/user`
method **GET**

*get user information*

Headers:
* authorization - *Bearer acces token*

Response:
{
    id, email, isActivated,
    favouritesDragons: string[]
}

### `/dragons/favourites`
method **GET**

*get favourites dragons*

Headers:
* authorization - *Bearer acces token*

Response: string[]

### `/dragons/favourites`
method **PUT**

*add favourite dragon*

Headers:
* authorization - *Bearer acces token*

Body:
* id - *string*

### `/dragons/favourites/:id`
method **DELETE**

*delete dragon from favourites*

Headers:
* authorization - *Bearer acces token*

Params:
* id - *string*