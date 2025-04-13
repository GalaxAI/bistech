# 01 Docker Task

## Requirements
- [x] Create an **Ubuntu image** with **Python 3.10**. [commit](https://github.com/GalaxAI/bistech/commit/adc4ddb5217d8489db0338dc7a81cd5a253f4944)
- [x] Create an **Ubuntu:24.04 image** with **Java 8** and **Kotlin**. [commit](https://github.com/GalaxAI/bistech/commit/28e2296a01ccf2f6fa1e54e5ebc195e0d85a81fb)
- [x] Add the **latest Gradle** and the **JDBC SQLite package** to the project (via `build.gradle`). [commit](https://github.com/GalaxAI/bistech/commit/4169ee18cb5f80947fe890be19bf0920c3939f7a)
- [x] Create a **HelloWorld example**. [commit](https://github.com/GalaxAI/bistech/commit/4169ee18cb5f80947fe890be19bf0920c3939f7a)
- [x] Run the application using **CMD** and **Gradle**. [commit](https://github.com/GalaxAI/bistech/commit/4169ee18cb5f80947fe890be19bf0920c3939f7a)
- [x] Add **docker-compose configuration**. [commit](https://github.com/GalaxAI/bistech/commit/c5120458eaa1af5c01800a460c41ac9aefa32eda)
## Repository Requirements
- [x] Include a **Dockerfile**.
- [x] Provide a **Docker Hub [link](https://hub.docker.com/repository/docker/afterhoursbilly/kotlin-gradle-java/general)**.
- [x] Include a **build.gradle** file.
- [x] Include a **docker-compose.yml** configuration.



# 02 Scala Task

## Requirements
- [x] Create a **Products controller**.  
- [x] Implement **CRUD endpoints** for the Products controller (GET: show all, show by ID; POST, PUT, DELETE) using a **list** for data storage.  
- [x] Create **Categories** and **Cart controllers** with **CRUD endpoints** (same methods as above) using lists instead of databases.  
- [x] Dockerize the application, create a Docker image, and add a script to run the app via **ngrok** (do **not** hardcode the ngrok token in the script).  
- [x] Configure **CORS settings** to allow CRUD methods for **two specified hosts**.  

## Repository Requirements
- [x] Include a **Dockerfile**.  
- [x] Provide a **script** for running the application via ngrok (token-free).  
- [x] Include **controller files** with their endpoints.  
- [x] Include **CORS configuration files** (e.g., `application.conf`).  
- **CRUD** operations: Show all items, retrieve by ID (GET), update (PUT), delete (DELETE), and add (POST).  
- Controllers must use **Scala 3** and the **Play Framework**.  
- Data storage for controllers can be based on **lists** (no database required).

# 03 Kotlin Task

## Requirements
- [x] Create a client application in Kotlin using the Ktor framework that allows sending messages to the Discord platform.
- [x] The application is capable of receiving user messages from the Discord platform directed to the application (bot).
- [x] Return a list of categories upon a user's specific request.
- [x] Return a list of products according to the requested category.
- [ ] The application will additionally support one of the following platforms: Slack, Messenger, Webex.

# 04 Go Task

## Requirements
- [x] Create an **Echo framework project** in Go using **GORM** with **5 models**, including a relationship between at least two models.
- [x] Implement simple **CRUD endpoints** for data management using models (suggest **SQLite** as database).
- [x] Create an Echo application in Go with a **Product controller** implementing CRUD operations.
- [x] Create a **Product model** using GORM and use it for product CRUD operations in the controller (replace list-based storage).
- [x] Add a **Cart model** and corresponding endpoints.
- [x] Create a **Category model** and establish a relationship between categories and products.
- [x] Organize queries using **GORM scopes**.

## Repository Requirements
- [x] Include complete **Echo framework** implementation
- [x] Provide **GORM model definitions** with relationships
- [x] Include **SQLite database** configuration
- [x] Add **CRUD endpoint implementations** for all models


# 05 Frontend Task

## Requirements
- [x] Create a **client application** using the **React.js** library.
- [x] Implement **three components**: **Products**, **Cart**, and **Payments**.
  - The **Cart** and **Payments** components should **send data** to the server application.
  - The **Products** component should **fetch product data** from the server application.
- [x] The server application should be written in one of three languages: **Go**.
- [x] Data between all components should be passed using **React hooks**.

- [x]: Implement **two components** (Products & Payments). Payments should send data to the server, and Products should fetch data.
- [x]: Add a **Cart component with a view** and implement **routing**.
- [x]: Ensure data is passed between components using **React hooks**.
- [x]: Use **axios** for HTTP requests and configure **CORS headers**.
- [x]: Include a **script** to run both the **server and client applications** via **Docker Compose**.

## Repository Requirements
- [x] Include **React component files** (Products, Cart, Payments).
- [x] Provide **Docker Compose configuration** for running the full stack.
- [x] Configure **CORS settings** for the server application.
- [x] Include a **script** to launch the application via Docker.


# 07 Sonar Integration

Link to [repo](https://github.com/GalaxAI/07_sonar)