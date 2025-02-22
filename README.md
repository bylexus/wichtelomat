# wichtelomat

> Manage your Christmas Elves!

This is a small project helping me keep track / find our Family Christmas Eleves.

Developed in pure frontend JavaScript using [VueJS](https://vuejs.org/).

**Note:** This software uses old, legacy JavaScript libraries. Please use at MOST NodeJS 17!


## Project setup

On your local machine:

```
nvm install && nvm use
npm install
```

As Docker container:

```shell
docker compose up -d
docker compose exec dev npm run serve
```

## Compiles and hot-reloads for development

On your local machine:

```
npm run serve
```

As Docker container:

```shell
docker compose up -d
docker compose exec dev npm run serve
```

## Compiling for dev:
```
npm run build-dev
```

## Watching for dev:
```
npm run watch
```

## Compiles and minifies for production
```
npm run build # output to dist/ folder
```


## Build Production Docker Image

```shell
docker build --no-cache --pull -t registry.alexi.ch/wichtelomat:latest -f docker/prod/Dockerfile .
docker login registry.alexi.ch
docker push registry.alexi.ch/wichtelomat:latest
```

