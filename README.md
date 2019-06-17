# instanews

> Front end for NYT Top Stories

## Design

This project implements the following design mockups:

- Mobile
  - [Initial](https://user-images.githubusercontent.com/38357771/59630232-b3d75180-90f9-11e9-91c7-02e41be1b35d.png)
  - [Stories](https://user-images.githubusercontent.com/38357771/59630238-b6d24200-90f9-11e9-9523-d8292a139cfd.png)
- Tablet
  - [Initial](https://user-images.githubusercontent.com/38357771/59630535-6c04fa00-90fa-11e9-811a-67e3805e7920.png)
  - [Stories](https://user-images.githubusercontent.com/38357771/59630542-70c9ae00-90fa-11e9-8498-313a69c56fed.png)
- Desktop
  - [Initial](https://user-images.githubusercontent.com/38357771/59630591-922a9a00-90fa-11e9-9df5-69777c789be8.png)
  - [Stories](https://user-images.githubusercontent.com/38357771/59630598-9656b780-90fa-11e9-9850-5006704dfb3a.png)

## Features

This project is written using traditional jQuery practices along with new HTML/ES2018 language features, such as the `<template>` element in the attempt to maintain separation of concerns often obfuscated with use of jQuery. To ensure browser support, JS is transpiled with Babel and HTML Templates are polyfilled if unsupported.

The URL query string is updated with the active section selection allowing navigation and sharing of the site with the relevant section selected.

Project styles are written with SASS using the SCSS (Sassy CSS) syntax.

## Project Structure

Building the site copies contents of static/, transpiles and minifies JS code in src/js/ and compiles SCSS files to dist/.

```
.
+-- src
|   +-- js
|       +-- components
|       +-- utils
|       +-- polyfills
|   +-- scss
|   +-- constants
+-- public
|   +-- images
|   +-- fonts
|   +-- index.html
+-- dist
+-- gulpfile.js
```

## Development

Install dependencies by running `npm i`. After that, run `npm start` to start a gulp process to build the site to dist/ and serves it up on a dev server. The gulp process will watch project files to rebuild files and reload browser on change.

## Build

Ensure project dependencies are installed by running `npm i`. Then, run `npm run build` to build site to dist/.
