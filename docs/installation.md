# What do you need

 * [node.js] [1]
 * [npm] [2] ([video tutorial (fr)] [4])
 * [typings] [3]
 

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


# Errors
If you've got some error like this (`error TS2304: Cannot find name '...'`), do:

  > typings install




 [1]: https://nodejs.org/en/                        "node.js"
 [2]: https://www.npmjs.com/                        "npm"
 [3]: https://www.npmjs.com/package/typings         "typings"
 [4]: https://www.youtube.com/watch?v=53U0TBKFwUw   "video tutorial"