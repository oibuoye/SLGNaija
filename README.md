# SLGNaija

This repository contains a demo and live API built with NodeJS.
The API is used to manage states and local governments in Nigeria in a MongoDB database. Part of the API is available live for developers to use to get states and local government in Nigeria.

### Live API Documentation
The API is currently being hosted on https://slgnaija.herokuapp.com

###### State GET HTTP Response
-   `GET` /api/states

```json
[
    {
        "_id": "67263538769e0300171887365",
        "name": "Abia"
    },
    {
        "_id": "987263538760300171887365",
        "name": "Adamawa"
    }
]
```

###### State GET HTTP Response
-  `GET` /api/states/67263538769e0300171887365

```json

    {
        "_id": "67263538769e0300171887365",
        "name": "Abia"
    }
```

###### GET HTTP Response
-   `GET` /api/lgas  - Get all LGAs

```json
[
    {
        "_id": "67263538769e0300171887365",
        "LGAName": "Aba North",
        "stateName": "Abia"
    },
    {
        "_id": "987263538760300171887365",
        "LGAName": "Surulere",
        "stateName": "Lagos"
    }
]
```
###### GET HTTP Response
-   `GET` /api/lgas/Abia - Get by state name

```json
[
    {
        "_id": "67263538769e0300171887365",
        "LGAName": "Aba North",
        "stateName": "Abia"
    },
    {
        "_id": "987263538760300171887365",
        "LGAName": "Aba South",
        "stateName": "Abia"
    }
]
```



### Development
This application was developed using [ExpressJS](http://expressjs.com/). MongoDB was used for persisting data with [Mongoose](https://mongoosejs.com/) as [ORM]

### Installation
* Start up your terminal (or Command Prompt on Windows OS).
* Ensure that you've `node` installed on your PC.
* Clone the repository by entering the command `git clone https://github.com/Opecodeforliving/SLGNaija` in the terminal.
* Navigate to the project folder using `cd SLGNaija` on your terminal (or command prompt)
* After cloning, install the application's dependencies with the command `npm install`.
* Create an environment variable with the name `dbconnection_string` and mongodb connection string as the value
* Then, you can then start the server with the command: `npm start`.




### Author
**Ibuoye Opeyemi** - Software Developer at Parkway Projects Ltd
