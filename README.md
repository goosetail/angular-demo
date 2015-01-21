# Goosetail Labs - Angular Demo

An Angular demo app for demonstrating folder structure, unit-testing, automated builds, and 3rd party components


## Unit and End-to-End Testing

### Karma (Client-side unit testing with Karma and Mocha)
All components and pages should have a -spec.js file that contains the unit test for whatever is in that folder. This
gives you the ability to copy components into a new project, tests and all. The Karam config is found at
    `core/config/karma.conf.js`

And you can run Karma with `npm run karma` from the root of the project.

Notes:

* Jade templates are compiled using ngJade2JsPreprocessor, which puts all the templates in a 'templates' module that can
be loaded into your tests.

* The files:[] property tells Karma which files to load, in order, into the browser for your tests.

### Protractor (End-to-end testing)
Protractor allows us to write end to end tests using a browser. The config can be found at

`core/test/config/protractor.conf.js`

and can be ran with `npm run protractor`

Notes:

* We are running the test directly in Chrome instead of using Selenium. If we needs support for browsers other than
    FF and Chrome, then this will need to change.

## 3rd-party directives
The map page uses [angular-google-maps](http://angular-ui.github.io/angular-google-maps/#!/), which is a directive for
adding google maps to your application.

## Folder Structure


    project
     -bin
     |-core
     |---.build  (build dir)
     |---client  (source dir)
     |-----app
     |-------common  (common styles and such)
     |-------components  (reusable components)
     |-------lib
     |---------css
     |---------fonts
     |---------images
     |---------js
     |-------pages  (angular pages)
     |---------index
     |---------map
     |---------todo
     |-------router  (contains router.js which defines your states)
     |-------services
     |-----error
     |---config
     |---lib (server side libs)
     |---routes  (server-side handling of routes)
     |---views  (express views)
     |-----error
     |-----layouts
     |-----pages
     |-test  (e2e test and server-side tests)
     |---config
     |---e2e
     |---unit


## Automated Builds

### Asset-Worker

[Asset-Worker](https://www.npmjs.com/package/asset-worker) is a Node.js module that recursively finds all the .js
and .styl files in the /client dir, performing various tasks on them, and then exporting them to your build directory so
they will be available during development.


### Grunt
For production, [Grunt](http://gruntjs.com/) is used for all kinds of build related goodness.

