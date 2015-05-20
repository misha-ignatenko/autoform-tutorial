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
          var _buttonSelector = "//button[contains(.,'" + buttonText + "')]";
          this.browser.waitForExist(_buttonSelector)
              .isVisible(_buttonSelector, function(err, isVisible) {
                  assert.isTrue(isVisible);
                  callback();
              });
          //this.browser.click(_buttonSelector);
      });




      this.Then(/^Create and log in using "([^"]*)" and "([^"]*)"$/, function(userName, passwordString, callback) {
          var _createAccountButtonSelector = "//button[contains(.,'Create')]"
          var _logInButtonsSelector = "//li[@id='login-dropdown-list']/a[contains(.,'Sign in / Join')]";
          this.browser.waitForExist(_logInButtonsSelector)
              .click(_logInButtonsSelector).waitForVisible("#login-email")
              .setValue('#login-email', userName)
              .setValue("#login-password", passwordString).waitForVisible("#signup-link").click("#signup-link")
              .waitForVisible(_createAccountButtonSelector).click(_createAccountButtonSelector, function(err) {
                  callback();
              });

      });


      this.Then(/^Check if "([^"]*)" links exixts$/, function(titleToLookFor, callback) {
          var _listItemSelector = "//a[contains(.,'" + titleToLookFor + "')]";
          this.browser.waitForExist(_listItemSelector, function(err) {
              callback();
          });
      });



      this.Then(/^Click on link "([^"]*)"$/, function(linkText, callback){
          //var _listItemTextSelector = '//ul/li/a[contains("' + listItemText + '")]';
          //var _listItemTextSelector = '//ul/li/a[href()="' + listItemText + '"]';
          //setTimeout(function(){}, 1000);

          //var _linkSelector = "//ul/li/a[text()='" + listItemText + "']";
          //var _linkSelector = "//a[text()='" + listItemText + "']/@href";
          var _linkSelector = "//a[contains(.,'" + linkText + "')]";
          //var _linkSelector = "//a[text()='" + listItemText + "']";

          this.browser.waitForExist(_linkSelector).click(_linkSelector);
          callback();
      });

      this.Then(/^Set "([^"]*)" to "([^"]*)"$/, function(textFieldName, stringToPaste, callback){
          // $x("//*[text()[contains(.,'Title')]]/following-sibling::input")
          var _textBoxSelector = "//*[text()[contains(.,'" + textFieldName + "')]]/following-sibling::input";
          this.browser.waitForExist(_textBoxSelector).setValue(_textBoxSelector, stringToPaste).getValue(_textBoxSelector, function(err, value) {
              console.log("the text box value is: ", value);
              callback();
          });
      });

      this.Then(/^Set textarea "([^"]*)" to "([^"]*)"$/, function(textFieldName, stringToPaste, callback){
          // $x("//*[text()[contains(.,'Title')]]/following-sibling::input")
           // console.log("are we showing this?");
          var _textBoxSelector = "//*[text()[contains(.,'" + textFieldName + "')]]/following-sibling::textarea";
          this.browser.waitForExist(_textBoxSelector).setValue(_textBoxSelector, stringToPaste).getValue(_textBoxSelector, function(err, value) {
              console.log("the text area value is: ", value);
              callback();
          });

      });



      // FIX GETVALUE METHOD
      this.Then(/^Set category "([^"]*)" to "([^"]*)"$/, function(dropDownListName, valueToSelect, callback) {
          var _dropDownListSelector = "//*[text()[contains(.,'" + dropDownListName + "')]]/following-sibling::select";
          this.browser.waitForExist(_dropDownListSelector).selectByVisibleText(valueToSelect).getValue(_dropDownListSelector, function(err, value) {
              console.log("dropdown list value is: ", value);
              callback();
          });
      });

      this.Then(/^Click on button "([^"]*)"$/, function(buttonText, callback) {
          var _buttonSelector = "//button[contains(.,'" + buttonText + "')]";
          this.browser.waitForExist(_buttonSelector).click(function(err) {
              console.log("button clicked");
              callback();
          });
      });


  };

})(); 