# rainbow-dash-board

> For graphing all the important things from Bitcoin price to fridge temperature

## Requirements

* [Node.js](https://nodejs.org/en/) 8 LTS or newer

## Installation

In order to install the dependencies, navigate to the project folder and run

```bash
npm install
```

### PostgreSQL database

This app uses a single PostgreSQL database to store its data. It can be hosted separately, but the easiest way to host is with a [Docker](https://www.docker.com/) container. In order to host a Docker container with [Docker Compose](https://docs.docker.com/compose/), make sure that the Docker service is running and run

```bash
docker-compose up -d
```

In order to stop the container, run

```bash
docker-compose stop
```

In order to stop and destroy the container, run

```bash
docker-compose down
```

## Run tests

```bash
docker-compose up -d
npm test
```

## Run development

Copy the environment variable sample file with

```bash
cp .env-sample .env
```

and fill in the correct environment variables. Then source the file with

```bash
source .env
```

or use [autoenv](https://github.com/kennethreitz/autoenv). Make sure that the database is migrated with

```bash
knex migrate:latest
```

Finally, start the server with

```bash
npm run watch
```

The development server detects saved changes and automatically refreshes the content.

## Run production

Ensure that all required environment variables are correctly set and the database is migrated. Then run

```bash
npm start
```
