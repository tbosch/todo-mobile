Todo Mobile
===============

Description
-----------

Mobile Todo application, that uses Open Key Value Store as backend, see [http://openkeyval.org/](http://openkeyval.org/).

There are the following implementations:
- plain jquery (just to show the ugliness of manual data binding)
- desktop version with angular
- mobile version with angular and jquery mobile
- mobile version with angular and sencha touch

There is a live version on Github Pages, see here:
[http://tigbro.github.com/todo-mobile/](http://tigbro.github.com/todo-mobile/).


Build process
-------------
- mvn package: Will create a war with combined and optimized javascript
- mvn integration-test -Pintegration: Will execute the js-test-driver tests.