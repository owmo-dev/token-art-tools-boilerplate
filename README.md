# boilerplate-artblocks-node-setup
Boilerplate Art Blocks node project setup compatible with Token Art Tools

https://github.com/owenmoore/token-art-tools

## Install

1. Install `npm` (https://www.npmjs.com/)
2. Clone & copy repository into a project directory
3. Run `npm install` command

## How to Use

1. Run `npm run dev` to start the server
2. Accept any unsafe warnings and proceed
3. Copy & Paste the URL in the new tab to Token Art Tools
4. You should see a black square and can generate new hashes to change it's color
5. Work directly on the `src/sketch.js` and `src/features.js` files to create art
6. Press `CTRL + C` in the terminal to shut down the server when you're done

### Imports vs Inline
The example sketch file (P5.js) this repository provides is running as a **module** so that it can allow for file imports to make local development easier such as code formatting, highlights, etc. This will not work when deploying on-chain and you'll need to make the following changes to make it compatible.

1. Remove all imports and place code/strings in your `sketch.js` file
2. Remove the `type="module"` from the script tag in the `index.html` file
3. Remove any `window` assignments at the bottom of the sketch file

If you are a novice programmer, I would suggest that you pick a sketch from the `examples` directory and make these changes from the very start.