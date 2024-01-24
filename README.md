# neural-numbers

An exhibit based on a neural network trained on the MNIST data that can recognize handwritten numbers.

Part of the [I AM A.I. exhibition](https://www.i-am.ai/).

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
- showLanguageSwitcher (Boolean, default: true)
  Whether to show the language switcher

## Query string arguments

The app supports the following query string arguments:

- **config**=`<path>` (default: 'config.json'): The name of an alternative config file.
- **lang**=`<langcode>` (default: 'en'): The language to use.

## Internationalization

There are two sources for translations:

- The JSON files in the `tr` directory.
- The HTML files in the `pages` directory.

The latter are built out of the pug files in the `src/pug/pages` directory.

To add new languages

- Add a new json file in `tr`.
- Create new pug files in `src/pug/pages/<langcode>`.
- Build the pug files with the `gulp html` command.
- Add the language to the list of languages in the `config.json` file

## Use as a component (HTML)

The number recognizer can be included as a component in a web page. Check `test-components.html` for
an example.

You must add the following dependencies to your HTML file. In the `<head>` section:

```
<link rel="stylesheet" href="assets/css/neural-numbers.css" media="all" type="text/css">
```

At the end of the body:

```
<script src="vendor/jquery/jquery-3.3.1.slim.min.js"></script>
<script src="vendor/pep/pep.js"></script>
<script src="vendor/tf/tf.min.js"></script>
<script src="assets/js/dependencies.min.js"></script>
<script src="assets/js/neural-numbers.min.js"></script>
```

To include a component, add a `<div>` element with the attribute `data-component="neural-numbers"`
to the page. Several components can be added to the same page.

You can configure the component by adding the following attributes to the `<div>` element:

- **data-model** (required): The path to the model JSON file.
- **data-input-placeholder** (default: '')': The placeholder text for the input area.
- **data-show-bars** (default: false): Whether to show the confidence bars in the output.
- **data-show-normalizer** (default: false): Whether to show the normalized input.
- **data-show-output** (default: true): Weather to show the output.

## Use as a component (JS)

Include the same dependencies as in the HTML component, and then add the following code to your page:

```
const nnComponent = new IMAGINARY.NeuralNumbers(containerElement, {
  modelPath: 'assets/models/my-model.json',
  placeholder: 'write a number between 0&amp;nbsp;and&amp;nbsp;9',
  showBars: true,
  verticalBars: true,
  showInput: true,
  showOutput: true,
});
await nnComponent.init();
```

You can also create a trainable component:

```
const nnComponent = new IMAGINARY.NeuralNumbers(containerElement, {
  modelPath: 'assets/models/my-model.json',
  placeholder: 'write a number between 0&amp;nbsp;and&amp;nbsp;9',
  showBars: true,
  verticalBars: true,
  showInput: true,
  showOutput: true,
});

const nnTrainingComponent = new IMAGINARY.NeuralNumbersTraining(nnComponent, trainingUiContainerElement)
await nnComponent.init();
await nnTrainingComponent.init();
```

If you want to build your own training UI you can use the `IMAGINARY.NeuralNumbersTrainingController`
component instead. See `src/js/training-controller.js` for the API.

### Properties

Extra properties supported

- **verticalBars** (default: false): Whether to distribute the confidence bars vertically.

## Embed

The component can also be used by embedding the `embed.html` file in the page using an iframe.

```
<iframe src="embed.html?input-placeholder=Enter%20a%20number%20between%200%C2%A0and%C2%A09"
  width="100%" height="244" style="border:0;"></iframe>
```

Use the following query string arguments to configure the component:

- **model**=`<text>` (default: 'my-model'): The name of the model (filename of the model in `assets/models`
  minus the json extension).
- **input-placeholder**=`<text>` (default: ''): The placeholder text for the input area.
- **show-bars**=`<true|false>` (default: false): Whether to show the confidence bars in the output.
- **show-normalizer**=`<true|false>` (default: false): Whether to show the normalized input.
- **show-output**=`<true|false>` (default: true): Weather to show the output.
- **style**=`<default|mediocre|bad>` (default: 'default'): The style of the component (determines  
  the color of the bars, etc.).

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

## Credits

Created by [Aaron Montag](https://github.com/montaga) for IMAGINARY gGmbH.
Further adaptations by [Eric Londaits](https://github.com/elondaits).
Dutch translation by [Jarne Renders](https://github.com/JarneRenders).
Spanish and French translations by [Daniel Ramos](https://github.com/danielramosg).

## License

Copyright 2019-2022 IMAGINARY gGmbH.
Licensed under the MIT License (see LICENSE).

The explanatory texts in this exhibit are licensed under the
[CC BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/).

Yann LeCun and Corinna Cortes hold the copyright of MNIST dataset, which is a derivative work from
original NIST datasets. MNIST dataset is made available under the terms of the [Creative Commons
Attribution-Share Alike 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/).
