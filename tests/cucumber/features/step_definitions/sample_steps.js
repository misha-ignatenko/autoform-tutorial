(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');
    var assert = require("chai").assert;

    this.Given(/^I am a new user$/, function () {
      // no callbacks! DDP has been promisified so you can just return it
      return this.mirror.call('reset'); // this.ddp is a connection to the mirror
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
      // WebdriverIO supports Promises/A+ out the box, so you can return that too
      this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
        url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
        call(callback);
    });

    this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
      // you can use chai-as-promised in step definitions also
      this.browser.
        waitForVisible('body *'). // WebdriverIO chain-able promise magic
        getTitle().should.become(expectedTitle).and.notify(callback);
    });

    this.Then(/^I should see the header "([^"]*)"$/, function (expectedHeader, callback) {
      // you can use chai-as-promised in step definitions also
      this.browser.
          waitForVisible('body *'). // WebdriverIO chain-able promise magic
          getText('#paragraphToTest').should.become(expectedHeader).and.notify(callback);
    });

    this.Then(/^I should see button "([^"]*)"$/, function(buttonText, callback) {
      var _buttonSelector = "//button[text()='" + buttonText + "']";
        this.browser.waitForExist(_buttonSelector).isVisible(_buttonSelector, function(err, visible) {
            assert.isTrue.isVisible;
            callback();
        })
    });

  };

})(); 