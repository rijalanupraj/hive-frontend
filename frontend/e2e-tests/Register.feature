Feature: Register
    Scenario: Register with valid data
        Given I load the Register Page
        When I enter the username "test10" in register
        When I enter the email "test10@gmail.com" in register
        When I enter the password "Test@123" in register
        When I click on the Register Button in register
        Then I should see the "homepage" page from register
