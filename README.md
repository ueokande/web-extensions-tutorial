# web-extensions-tutorial

This is a simple WebExtension tutorial project for Google Chrome/Chromium and
Firefox.  The project use webpack and babel to build es2015 JavaScripts, bundle
scripts to single script.

This extension provide simple features, switching tabs by `h`/`l` keys in your
browsers.

## How to setup WebExtensions project

This section provide procedures to create an WebExteions project.

### Setup the build environment

The project use webpack and babel to build scripts.  The project created as npm project to
management dependencies.  Initialize the project and install packages by npm.

```
npm init
npm install -D webpack babel-loader babel-core babel-preset-es2015
```

Configure webpack configuration `webpack.config.js` in the root directory.

```javascript
const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'build');

module.exports = {
  entry: {
    content: path.join(src, 'content'),
    background: path.join(src, 'background')
  },

  output: {
    path: dist,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015' ]
        }
      },
    ]
  },

  resolve: {
    extensions: [ '.js' ]
  }
};
```
The webpack is configures to create create two script, `background.js` and
`content.js`.  The `content.js` will be loaded in content page likes normal
JavaScripts in HTML, and it is additionally able to send message background
scripts.  The `background.js` runs on background process which is independent
of the content pages.  The background scripts usual implement long-time
logics and control browser.

The webpack build es2015 scripts by babel in `src/content` and `src/background`
directories and create bundled files in `build` directory.  Next create an
empty source files for content scripts and background scripts.

```
mkdir -p src/{background,content}
touch src/{background,content}/index.js

# verify
node_modules/.bin/webpack
```

You can see built scripts in `build` directory.  Add a build step `"start":
"webpack -w --debug"`into `package.json` for developing.

### Start a development of an extension

Put `manifest.json` in the root directory to allow browsers to load content scripts and
background scripts.

```json
{
  "manifest_version": 2,
  "name": "Web Extension Template",
  "description": "Web Extensions tutorial for Google Chrome/Chromium and Firefox.",
  "version": "1.0.0",
  "content_scripts": [
    {
      "matches": [ "http://*/*", "https://*/*" ],
      "js": [ "build/content.js" ]
    }
  ],
  "background": {
    "scripts": [
      "build/background.js"
    ]
  }
}
```

To load the extension, open `about:debugging` on Firefox, or `chrome://extensions`
on Google Chrome/Chromium.  After confirmed to load the extension, you can
start to develop scripts. The example codes are in `src/background/index.js` and
`src/content/index.js`.

## License

MIT
