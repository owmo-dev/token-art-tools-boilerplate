# token-art-tools-boilerplate

Boilerplate setup for Token Art Tools

https://github.com/owenmoore-xyz/token-art-tools

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

The `sketch.js` script is running as a **module** to allow for file imports. Having separate files makes local development a lot easier - code formatting / highlights, files for quick testing ideas, etc. - however some on-chain platforms will require that you make all code inline (one file) when deploying. To modify this project from imports to inline code, simply do the following:

1. Remove all imports and place code/strings in your `sketch.js` file
2. Remove the `type="module"` from the script tag in the `index.html` file
3. Remove any `window` function assignments at the bottom of the `sketch.js` file

### Examples

This directory contains starter scripts for various libraries or techniques. Simply copy/paste the contents into the `script.js` file to use them as a starting point.
