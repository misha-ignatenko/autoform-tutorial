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




      this.Then(/^Check if logged in as "([^"]*)"$/, function(usernameStr, callback) {
          //var _logInButtonsSelector = "//li[@id='login-dropdown-list']/a[contains(.,'Sign in / Join')]";
          var _logInButtonsSelector = "//li[@id='login-dropdown-list']/a[contains(.,'" + usernameStr + "')]";
          this.browser.waitForVisible(_logInButtonsSelector, function(err, value) {
              console.log("_logInButtonsSelector value is: ", value);
              callback();
          });
      });



      this.Then(/^Create OR log in using "([^"]*)" and "([^"]*)"$/, function(userName, passwordString, callback) {







          var _createAccountButtonSelector = "//button[contains(.,'Create')]"






          var _logInButtonsSelector = "//li[@id='login-dropdown-list']/a[contains(.,'Sign in / Join')]";


          //this.browser.execute(function(c_log) {
          //    console.log("the logged in user is: ", Meteor.UserId());
          //});

          //console.log("the logged in user is: ", c_log);
          console.log("log in buttons selector is: ", _logInButtonsSelector);
          this.browser.waitForExist(_logInButtonsSelector)
              .click(_logInButtonsSelector).waitForVisible("#login-email")
              .setValue('#login-email', userName)
              .setValue("#login-password", passwordString).waitForVisible("#signup-link").click("#signup-link")
              .waitForVisible(_createAccountButtonSelector).click(_createAccountButtonSelector, function(expectedNewlyCreatedUser, callback) {
                  var _newlyCreatedUserSelector = "";

                  //if see alert isVisible that says "Email already exists." then click "cancel" and then click "sign in" button
                  // wait until buttons are visible and make sure clicking the right button

                  //if user was successfully created then I should see a link with username in the upper right corner instead of the previous "Sign in / Join" link
                  //$x("//a[text()='mignatenko4@css.edu']")
                  //$x("//*[text()='Email already exists.']")
                  callback();

              });

      });



      this.Then(/^Check if "([^"]*)" and "([^"]*)" post exists$/, function(titleToLookFor, contentStringToLookFor, callback) {
          var _postEntryItemSelector = "//li[contains(.,'" + titleToLookFor + " - " + contentStringToLookFor +"')]";
          this.browser.waitForVisible(_postEntryItemSelector, function(err, isVisible) {

              console.log("post entry item selector after wait for exist: ", value);
              callback();
          });
      });



      this.Then(/^Check if "([^"]*)" link in unordered list exists$/, function(titleToLookFor, callback) {
          var _listItemSelector = "//li[contains(.,'" + titleToLookFor + "')]";
          //this.browser.waitForExist(_listItemSelector, function(err) {
          //    callback();
          //});


            //commented out May 21, 2015
          //this.browser.waitForVisible(_listItemSelector, function(err, value) {
          this.browser.waitForVisible(_listItemSelector, function(err, value) {
              console.log("the value of list item selector is: ", value);
              callback();
          });







      });





      this.Then(/^Set "([^"]*)" date field to year "([^"]*)" month "([^"]*)" day "([^"]*)"$/, function(dateToFillFieldName, fullYear, monthAsTwoDigits, dayAsTwoDigits, callback) {

          var dateString = fullYear + "-" + monthAsTwoDigits + "-" + dayAsTwoDigits;
          //T00:00:00.000Z

          console.log("dateString is currently: ", dateString);




          //var dateString = monthAsTwoDigits + '/' + dayAsTwoDigits + '/' + fullYear;

          //var dateStringConvertedToDate = new Date(parseInt(fullYear), parseInt(monthAsTwoDigits) - 1, parseInt(dayAsTwoDigits));


          var dateStringConvertedToDate = new Date();
          console.log("date string converted to date type then back to string", dateStringConvertedToDate);




          var _dateFieldSelector = "//*[text()[contains(.,'" + dateToFillFieldName + "')]]/following-sibling::input";
          this.browser
              .waitForVisible(_dateFieldSelector)
              .click(_dateFieldSelector)
              .keys(dateString)
              .getValue(_dateFieldSelector, function(err, value) {
              console.log("The date you just inserted is: ", value);
              callback();
          });

      });




      this.Then(/^Click "([^"]*)" link and log in using "([^"]*)" as username and "([^"]*)" as password$/, function(signInLinkString, usernameString, passwordString, callback) {
          var _loginLinkSelector = "//a[contains(.,'" + signInLinkString + "')]";





          this.browser.waitForVisible(_loginLinkSelector).click(_loginLinkSelector).waitForVisible("#login-email")
              .setValue('#login-email', usernameString)
              .setValue("#login-password", passwordString).waitForVisible("#login-buttons-password").click("#login-buttons-password", function(callbck) {
                  callback();
              });


      });




      this.Then(/^Check if "([^"]*)" link exists$/, function(linkStringToLookFor, callback) {
          var _linkSelector = "//a[text()='" + linkStringToLookFor + "']";

          this.browser.waitForVisible(_linkSelector, function(err,value) {
              console.log("link found on page: ", value);
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

          //could have used selectByValue

          this.browser.waitForExist(_dropDownListSelector).selectByVisibleText(_dropDownListSelector, valueToSelect).getValue(_dropDownListSelector, function(err, value) {
              console.log("dropdown list value is: ", value);
              callback();
          });
      });

      this.Then(/^Click on button "([^"]*)"$/, function(buttonText, callback) {
          var _buttonSelector = "//button[contains(.,'" + buttonText + "')]";

          this.browser.waitForVisible(_buttonSelector).click(_buttonSelector);
          callback();

          //this.browser.waitForExist(_buttonSelector).waitForVisible(_buttonSelector).click(_buttonSelector, function(err) {
          //    console.log("button clicked");
          //    callback();
          //});



      });

      this.Then(/^Click link "([^"]*)"$/, function(linkTextToClick, callback) {
          var _linkSelector = "//a[text()='" + linkTextToClick + "']";
          this.browser.waitForVisible(_linkSelector).click(_linkSelector);
          callback();
      });


  };

})(); 