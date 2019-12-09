# Messaging Apps for Backend

Messaging Apps adalah suatu aplikasi backend untuk feature chatting. Project ini menggunakan bahasa pemprograman Node.js and database postgreSQL.

## Table of Contents

- [Getting Started](#getting-started)

- [Features](#features)

- [Folder Structure](#folder-structure)

- [Documentation](#documentation)

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

## Features

- [Node.Js](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [Sequelize](https://sequelize.org/)

- [JSON Web Token (JWT)](https://jwt.io/)

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
        "userId": "user3@email.com",
        "message": "Morning Sir"
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
            "id": 8,
            "content": "Good Morning",
            "chatRoomId": 3,
            "userId": 1,
            "updatedAt": "2019-12-09T08:13:38.442Z",
            "createdAt": "2019-12-09T08:13:38.442Z"
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
        "userId": "user3@email.com"
    }

- **Success Response**
    ```
    Status: 200
    ```
    ```
    [
        {
            "id": 5,
            "content": "03. user3 => user1",
            "isRead": false,
            "createdAt": "2019-12-09T07:53:32.806Z",
            "updatedAt": "2019-12-09T07:53:32.806Z",
            "chatRoomId": 4,
            "userId": 3
        },
        {
            "id": 4,
            "content": "02. user3 => user1",
            "isRead": false,
            "createdAt": "2019-12-08T20:55:08.283Z",
            "updatedAt": "2019-12-08T20:55:08.283Z",
            "chatRoomId": 4,
            "userId": 3
        },
        {
            "id": 3,
            "content": "01. user1 => user3",
            "isRead": false,
            "createdAt": "2019-12-08T20:54:36.361Z",
            "updatedAt": "2019-12-08T20:54:36.361Z",
            "chatRoomId": 3,
            "userId": 1
        }
    ]
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

### Get Last Conversation

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
        "data": {
            "id": 2,
            "content": "02. user2 => user1",
            "isRead": false,
            "createdAt": "2019-12-08T20:52:52.232Z",
            "updatedAt": "2019-12-08T20:52:52.232Z",
            "chatRoomId": 2,
            "userId": 2
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
        "message": "No token provided"
    }
    ```

### Get unread Conversation and count

- **URL**
    ```
    /api/chat/unread
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
        "count": 3,
        "rows": [
            {
                "id": 2,
                "content": "02. user2 => user1",
                "isRead": false,
                "createdAt": "2019-12-08T20:52:52.232Z",
                "updatedAt": "2019-12-08T20:52:52.232Z",
                "chatRoomId": 2,
                "userId": 2
            },
            {
                "id": 4,
                "content": "02. user3 => user1",
                "isRead": false,
                "createdAt": "2019-12-08T20:55:08.283Z",
                "updatedAt": "2019-12-08T20:55:08.283Z",
                "chatRoomId": 4,
                "userId": 3
            },
            {
                "id": 5,
                "content": "03. user3 => user1",
                "isRead": false,
                "createdAt": "2019-12-09T07:53:32.806Z",
                "updatedAt": "2019-12-09T07:53:32.806Z",
                "chatRoomId": 4,
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
        "success": false,
        "message": "No token provided"
    }
    ```