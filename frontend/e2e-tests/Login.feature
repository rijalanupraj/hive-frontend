Feature: Login
  Scenario: Login with valid credentials
    Given I load the Login Page
    When I enter the username "test1"
    When I enter the password "Test@123"
    When I click on the Sign In Button
    Then I should see the "homepage" page