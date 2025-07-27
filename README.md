<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  # ShareTrivia Backend Server

## Description

This is the backend server for the **ShareTrivia** application. It leverages the robust [NestJS](https://nestjs.com/) framework to provide a scalable and efficient API layer. This server is designed to manage all core aspects of a trivia application, including question management, user progress tracking, and quiz generation.

## Features

* **Question Management:** Comprehensive CRUD operations for trivia questions.
* **Topic Organization:** Categorization of questions by various topics (e.g., Science, History).
* **Difficulty Levels:** Integration of a level system for questions.
* **User Progress Tracking:** Records and manages user interactions with questions, including:
    * Creation and retrieval of user progress records.
    * Calculation of user's current level within specific topics.
    * Automated deletion of user progress records linked to deleted questions (via database cascading).
* **Dynamic Quiz Generation:** API endpoint to fetch quiz questions based on selected topics and difficulty levels.
* **Database Integration:** Utilizes [TypeORM](https://typeorm.io/) for seamless object-relational mapping with a [PostgreSQL](https://www.postgresql.org/) database.
* **API Documentation:** Integrated with [Swagger (OpenAPI)](https://swagger.io/) for interactive API documentation and testing. (Access at `http://localhost:3000/api` when running locally.)

## Technologies Used

* **NestJS:** The core framework for server-side development.
* **TypeScript:** For type-safe and robust code.
* **TypeORM:** ORM for interacting with the database.
* **PostgreSQL:** Relational database management system.
* **Swagger (OpenAPI):** For API documentation and exploration.

## Project Setup

To get this project running on your local machine, follow these steps:

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js)
* PostgreSQL database instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd share-trivia-backend
    ```
    *(Replace `[YOUR_REPOSITORY_URL]` with your actual repository URL)*
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Database Configuration:**
    * Create a PostgreSQL database.
    * Create a `.env` file in the project root based on `.env.example`:
        ```bash
        cp .env.example .env
        ```
    * Update the `.env` file with your database connection details:
        ```env
        # .env
        DATABASE_HOST=localhost
        DATABASE_PORT=5432
        DATABASE_USERNAME=your_username
        DATABASE_PASSWORD=your_password
        DATABASE_NAME=your_database_name
        # Add any other environment variables here, e.g., JWT_SECRET for authentication if implemented.
        ```
    * Ensure your PostgreSQL database server is running and accessible.

## Compile and run the project

```bash
# development mode (with hot-reloading)
$ npm run start

# watch mode (same as development, useful for continuous development)
$ npm run start:dev

# production mode (builds and then runs the optimized code)
$ npm run start:prod
