Todo Mobile
===============

Description
-----------

Mobile Todo application, that uses Open Key Value Store as backend, see [http://openkeyval.org/](http://openkeyval.org/).

There is also a plain jquery implementation, to see the benefit of using angular.
See index_jquery.html.

The main application is launched via index.html.


Technologies
------------

- jquery-mobile: Mobile Widgets
- angular: Databinding
- jasmine: Unit-Tests
- jasmine-ui: Ui-Tests
- js-test-driver: Automating Tests

Build process
-------------
- mvn package: Will create a war with combined and optimized javascript
- mvn integration-test -Pintegration: Will execute the js-test-driver tests.