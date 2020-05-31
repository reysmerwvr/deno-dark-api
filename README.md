# Deno Dark API

Deno Dark API

## Requirements

- Deno >= 1.0.3

## Version

1.0.0

## Installation

Download zip file and extract it [latest release](https://github.com/reysmerwvr/deno-test-api). Or clone the repository and cd into it.

Deno Dark API uses a number of open source projects to work properly:

- [Deno] - A secure runtime for JavaScript and TypeScript.
- [Mongo] - The database for modern applications.

Install the dependencies and start the server.

## Runnnig it with Deno

```sh
cd deno-test-api
cp .env.example .env # If you don't have .env file you can use the example one. Just rename .env.example to .env. Enter your configuration here.
deno run --allow-write --allow-read --allow-plugin --allow-net --allow-env --unstable server.ts
```

## Runnnig it with Docker

```sh
cd deno-test-api
cp .env.example .env # If you don't have .env file you can use the example one. Just rename .env.example to .env. Enter your configuration here.
docker-compose build
docker-compose up -d
```

### Todos

- Write tests
- Add code comments

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does 
its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Deno]: <https://deno.land/>
   [Deno]: <https://www.mongodb.com/>