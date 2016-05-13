# another-regex-game
A game about patterns

# [regexgame.in](http://regexgame.in)
![](http://i.imgur.com/2WJpabe.png)

## The source code
Another Regex Game was build as a single page app, using angular, jquery, bootstrap, less and gulp.  
It is an client side app, hosted by Github Pages. 

The levels are 'stored' in the file [levels.js](https://github.com/joaoricardo000/another-regex-game/blob/master/src/js/app/levels.js), 
and the 'database' of words, inside the folder ./words-db/.

## Installation
Assuming you already have node and npm properly installed, just clone the repository and  
`$ npm install`  
This will install all dependencies (npm and bower).  
  
  
To start a development server (with auto build/reload) just run  
`$ gulp`  
And access http://localhost:3000 (default port, if not in use...)  
  
  
To build a standalone static version, with minified js and css, run  
`$ gulp build -d ./build`  
-d is optional, ./build is default output folder.  

To host your version in a Github Page, just  
`$ git checkout gh-pages`  
`$ gulp build -d ./`  
`$ git commit/push`  
And another regex game will be hosted in http://your-user-name.github.io/another-regex-game
