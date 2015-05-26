Feature: One-liner description of this feature

  As a [role]
  I want [feature]
  So that [benefit]

  The story above is to set context for the reader. It doesn't actually have any impact on the test
  itself. The phrases inside the scenarios are ties to test code using regex, which you can see in
  /tests/features/step_definitions/steps.js

  In this textual part of the file, you can include context about this feature, you can add links to
  external documents and whatever is needed to create the full specification.

  # The background will be run for every scenario
  Background:
    Given I am a new user

  # This scenario will run as part of the Meteor dev cycle because it has the @dev tag
  @dev
  Scenario:
    When I navigate to "/"
    Then I should see the title "intentional failure"
    And I should see the header "that paragraph"
    And I should see button "button with value"
    And Set category "Category" to "Business"
#    And Create OR log in using "misha1@css.edu" and "mishaa"
    And Set textarea "Content" to "content1"
#    And Click on link "to do 3"
    And Set "Title" to "title3"
    And Set "Tags" to "tag1,tag2"
#    And Set category "Category" to "Business"


#    And Click "Sign in / Join" link and log in using "misha1@css.edu" as username and "mishaa" as password

#    And Check if logged in as "misha1@css.edu"
#   check if the record we are trying to add already exists
#    And Check if "title1" and "content1" post exists


    And Set "Date Post Created" date field to year "2015" month "02" day "20"
    And Click on button "Insert"


#    And Set "Date Post Created" date field to year "2015" month "10" day "10"


    # intentional fail
#    And Check if "blahhhhhh" link exists

    And Check if "title3" link in unordered list exists

    And Click link "title3"
    # intentionally fail something to see what data is inside "title3"
#    And Check if "blahhhhhh" link exists

    And Check if "Back" link exists
    # intentional fail
#    And Check if "blahhhh" link exists
    And Click link "Back"

#    And Check if "title3" and "content1" post exists

#    And Check if "title1" link exists
    And Set "Title" to "title2"
    And Set textarea "Content" to "content2"
    And Set "Tags" to "tag2,tag3"
    And Set category "Category" to "Health"
    And Set "Date Post Created" date field to year "2014" month "10" day "15"
    And Click on button "Insert"

    # another intentional fail
    And Check if "title10" link in unordered list exists



  # This scenario will not run as part of the Meteor dev cycle because it does not have the @dev tag
  Scenario:
    When I navigate to "/"
    Then I should see the title "another intentional failure"