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
- [ ] Create a **Products controller**.  
- [ ] Implement **CRUD endpoints** for the Products controller (GET: show all, show by ID; POST, PUT, DELETE) using a **list** for data storage.  
- [ ] Create **Categories** and **Cart controllers** with **CRUD endpoints** (same methods as above) using lists instead of databases.  
- [ ] Dockerize the application, create a Docker image, and add a script to run the app via **ngrok** (do **not** hardcode the ngrok token in the script).  
- [ ] Configure **CORS settings** to allow CRUD methods for **two specified hosts**.  

## Repository Requirements
- [ ] Include a **Dockerfile**.  
- [ ] Provide a **script** for running the application via ngrok (token-free).  
- [ ] Include **controller files** with their endpoints.  
- [ ] Include **CORS configuration files** (e.g., `application.conf`).  
- **CRUD** operations: Show all items, retrieve by ID (GET), update (PUT), delete (DELETE), and add (POST).  
- Controllers must use **Scala 3** and the **Play Framework**.  
- Data storage for controllers can be based on **lists** (no database required).  