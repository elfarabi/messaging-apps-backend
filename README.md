# Messaging Apps for Backend

Messaging Apps is a backend application for chat features. This project uses the Node.js programming language and the postgreSQL database.

## Table of Contents

- [New Update](#new-update)

- [Getting Started](#getting-started)

- [Features](#features)

- [Folder Structure](#folder-structure)

- [Documentation](#documentation)

## New Update

- #### Get All Last Message and Count unRead Message
- #### Add for Unit Test

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setup

Make sure you have PostgreSQL installed on your local machine, because this project uses a local database and make sure you create the new database to. Beside PostgreSQL in this project need Node.Js installed on your local machine, becasue this project write with Node.Js.

to Check the Version of postgreSQL in your local machine :
```
$ psql --version
psql (PostgreSQL) 10.10
```

to Check the Version of Node.Js in your local machine :
```
$ node --version
v11.9.0
```

### Installing

Before Installing for running the Project, please clone the project first.

```
$ git clone https://github.com/elfarabi/messaging-apps-backend.git
$ cd Messaging Apps Backend
```

After Clone the Project, please rename or add file `.env.example` to `.env` .

After in your local project have file `.env` please write this variable. to connect DataBase postgreSQL :

```
PORT = 8080 //localhost for running the server
PSQL_DATABASE = new_database //database name
PSQL_USER = postgres //user database
PSQL_PASSWORD = postgres //password database
PSQL_HOST = localhost //host database
```

After All, now we running the project in your local machine.

```
$ npm install
$ npm run start:dev
```

### Unit Test

In this project using unit test and code coverage by jest. To run unit test on your local machine.

```
$ npm run cover
```

## Features

- [Node.Js](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [Sequelize](https://sequelize.org/)

- [JSON Web Token (JWT)](https://jwt.io/)

- [JEST](https://jestjs.io/)

## Folder Structure

```
├── src
│    ├── controller
│    │   ├── chatController.js
│    │   └── userController.js
│    ├── db
│    │   └── index.js
│    ├── helper
│    │   └── auth.js
│    ├── model
│    │   ├── chatContent.js
│    │   ├── chatRoom.js
│    │   ├── index.js
│    │   └── user.js
│    ├── service
│    │   ├── chatService.js
│    │   └── userService.js
│    ├── index.js
│    └── route.js
├── babel.js
├── env
├── gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Documentation

To try it direcly, you can import documentation to the postman and run server in your local machine to get try.

The documentation in the folder test with name file 

- [Signup User](#signup-user)
- [Login User](#login-user)
- [Send Message and Reply Message](#send-message-and-reply-message)
- [Get All Conversation with the Other Person](#get-all-conversation-with-the-other-person)
- [Get Last Message and Count unRead Message](#get-last-message-and-count-unRead-message)

### Signup User


- **URL**
    ```
    /api/user/signup
    ```

- **Method**
    ```
    POST
    ```

- **Body**
    ```
    {
	    "email": "user1@email.com",
	    "password": "user1",
	    "name": "user1"
    }

- **Success Response**
    ```
    Status: 200
    ```
    ```
    {
        "success": true,
        "message": "Success create account"
    }
    ```

- **Error Response**
    ```
    Status: 400
    ```
    ```
    {
        "status": false,
        "message": "data and salt arguments required"
    }
    ```

### Login User

- **URL**
    ```
    /api/user/login
    ```

- **Method**
    ```
    POST
    ```

- **Body**
    ```
    {
	    "email": "user1@email.com",
	    "password": "user1"
    }

- **Success Response**
    ```
    Status: 200
    ```
    ```
    {
        "success": true,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc1ODc3NjE0LCJleHAiOjE1Nzg0Njk2MTR9.rSterbCDH8R09oth6BIApeDT4BijmtmVDNQPBr1oGEQ"
    }
    ```

- **Error Response**
    ```
    Status: 400
    ```
    ```
    {
        "status": false,
        "message": "email or password is not correct"
    }
    ```

### Send Message and Reply Message

- **URL**
    ```
    /api/chat/send
    ```

- **Method**
    ```
    POST
    ```

- **Header**
    ```
    Authorization: token
    ```

- **Body**
    ```
    {
        "userId": "user1@email.com",
        "message": "03. user3 => user1"
    }

- **Success Response**
    ```
    Status: 200
    ```
    ```
    {
        "success": true,
        "data": {
            "isRead": false,
            "id": 9,
            "content": "03. user3 => user1",
            "chatRoomId": 2,
            "userId": 3,
            "updatedAt": "2019-12-13T15:41:04.163Z",
            "createdAt": "2019-12-13T15:41:04.163Z"
        }
    }
    ```

- **Error Response**
    ```
    Status: 400
    ```
    ```
    {
        "success": false,
        "message": "user not found"
    }
    ```

### Get All Conversation with the Other Person

- **URL**
    ```
    /api/chat/get
    ```

- **Method**
    ```
    GET
    ```

- **Header**
    ```
    Authorization: token
    ```

- **Body**
    ```
    {
        "userId": "user1@email.com"
    }

- **Success Response**
    ```
    Status: 200
    ```
    ```
    
    {
        "success": true,
        "data": [
            {
                "id": 9,
                "content": "03. user3 => user1",
                "isRead": false,
                "createdAt": "2019-12-13T15:41:04.163Z",
                "updatedAt": "2019-12-13T15:41:04.163Z",
                "chatRoomId": 2,
                "userId": 3
            },
            {
                "id": 8,
                "content": "02. user3 => user1",
                "isRead": false,
                "createdAt": "2019-12-13T15:40:59.465Z",
                "updatedAt": "2019-12-13T15:40:59.465Z",
                "chatRoomId": 2,
                "userId": 3
            },
            {
                "id": 7,
                "content": "01. user3 => user1",
                "isRead": false,
                "createdAt": "2019-12-13T15:40:52.580Z",
                "updatedAt": "2019-12-13T15:40:52.580Z",
                "chatRoomId": 2,
                "userId": 3
            }
        ]
    }
    ```

- **Error Response**
    ```
    Status: 400
    ```
    ```
    {
        success: false,
        message: "No Message"
    }
    ```

### Get Last Message and Count unRead Message

- **URL**
    ```
    /api/chat/last
    ```

- **Method**
    ```
    GET
    ```

- **Header**
    ```
    Authorization: token
    ```

- **Success Response**
    ```
    Status: 200
    ```
    ```
    {
        "success": true,
        "data": [
            {
                "id": 6,
                "createdAt": "2019-12-13T15:18:39.976Z",
                "updatedAt": "2019-12-13T15:18:39.976Z",
                "userOneId": 1,
                "userTwoId": 2,
                "content": "06. user1 => user2",
                "isRead": false,
                "chatRoomId": 1,
                "userId": 1,
                "unread_count": "0"
            },
            {
                "id": 9,
                "createdAt": "2019-12-13T15:41:04.163Z",
                "updatedAt": "2019-12-13T15:41:04.163Z",
                "userOneId": 3,
                "userTwoId": 1,
                "content": "03. user3 => user1",
                "isRead": false,
                "chatRoomId": 2,
                "userId": 3,
                "unread_count": "3"
            }
        ]
    }
    ```

- **Error Response**
    ```
    Status: 400
    ```
    ```
    {
        "success": false,
        "message": "No token provided"
    }
    ```
