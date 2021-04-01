# MNIST-exhibit

A widget that trains a neuronal network by the MNIST database.

Check out the [online demo](https://imaginary.github.io/neural-numbers/).

## Configuration

The config file in the root directory has the following keys:

- paintClearTimeout (Number, default: 2.2): 
    Number of seconds after which the painting canvas is cleared if there's no interaction
- idleReload (Number, default: 300): 
    Number of seconds after which the app is reloaded if there's no interaction
- lastTrainStepTimeout (Number, default: 1.5): 
    Number of seconds waited to show the last step when the training is stoppped
- languages (Object, default: `{"en": "English"}`)
    List of languages to enable, as an object where each key is an ISO language code and
    the value is the language name as it should be presented.
- defaultLanguage (String, default: 'en')
    Default language (the app starts and is restarted to this one)
- modelPath (String, default: 'assets/models/my-model.json')
    Path to the trained NN model file

By default, the file `config.json` will be loaded.
Alternative config file names can be specified via the URL query string, e.g. `index.html?config=myconfig.json`.

## Internationalization

There are two sources for translations:

- The JSON files in the `tr` directory.
- The HTML files in the `pages` directory.

The latter are built out of the pug files in the `src/pages` directory.

To add new languages

- Add a new json file in `tr`.
- Create new pug files in `src/pages/<langcode>`.
- Build the pug files with the `gulp html` command.
- Add the language to the list of languages in the `config.json` file

## Compilation

This website is built using several compilable languages:

- The HTML pages are built from **pug** template files.
- The CSS stylesheet is pre-compiled from **sass** files.
- The JS scripts are trans-compiled from **es6** (ES2015) files.

To make any modifications re-compilation is necessary. You should install:

- **node** and **npm**
- **yarn**
- **gulp** (install globally)

Afterwards run the following in the command line:

```
cd src
yarn
```

After it runs succesfuly you can compile as needed:

- **sass (stylesheets)**
    ```
    gulp styles
    ```

- **scripts (ES6)**
    ```
    gulp scripts
    ```

- **pug (HTML pages)**
    ```
    gulp html
    ```

- **all**
    ```
    yarn run build
    ```
