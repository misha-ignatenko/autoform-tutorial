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
    And Create and log in using "misha@css.edu" and "mishaa"
    And Set textarea "Content" to "content1"
#    And Click on link "to do 3"
    And Set "Title" to "title1"
    And Set "Tags" to "tag1,tag2"
    And Set category "Category" to "Business"
    And Click on button "Insert"
    And Check if "title1" links exixts

  # This scenario will not run as part of the Meteor dev cycle because it does not have the @dev tag
  Scenario:
    When I navigate to "/"
    Then I should see the title "another intentional failure"