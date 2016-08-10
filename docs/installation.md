---
title: installation
layout: docs
---

# What do you need

 * [node.js] [1]
 * [npm] [2]
 * [typings] [3]
 
 
 [1]: https://nodejs.org/en/                    "node.js"
 [2]: https://www.npmjs.com/                    "npm"
 [3]: https://www.npmjs.com/package/typings     "typings"


    npm come with node, so don't worry

# How to install the project

You have one things to do:

   > npm install
   
    if this command is too long to write in the terminal, this is the equivalent:
    
      npm i

# Build the project

#### prod
   > npm run build:prod
    
#### development
   > npm run build:dev

# Run the project

#### prod
Choose one of the following command

   > npm run server
   
   > npm run server:prod

#### development
The `:hmr` tag is for the hot reloading

   > npm run server:dev
   
   > npm run server:dev:hmr

    The hot reloading work when a typescript file (*.ts) change
    This action re-run the build of the project