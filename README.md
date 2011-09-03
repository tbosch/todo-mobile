Todo Mobile
===============

Description
-----------

Mobile Todo application, that uses Open Key Value Store as backend, see [http://openkeyval.org/](http://openkeyval.org/).

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