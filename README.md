# 01 Docker Task

## Requirements
- [x] Create an **Ubuntu image** with **Python 3.10**.
- [x] Create an **Ubuntu:24.04 image** with **Java 8** and **Kotlin**.
- [x] Add the **latest Gradle** and the **JDBC SQLite package** to the project (via `build.gradle`).
- [x] Create a **HelloWorld example**.
- [x] Run the application using **CMD** and **Gradle**.
- [x] Add **docker-compose configuration**.
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