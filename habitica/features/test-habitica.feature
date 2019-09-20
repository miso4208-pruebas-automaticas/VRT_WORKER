Feature: Abrir registro de usuario

  Scenario: Como un usuario quiero ver la opcion registro de nuevos usuarios         
    When I swipe left
    And I press "Register"
    Then I should see "Username"
    Then I should see "Email address"
    Then I should see "Password"
    Then I should see "Confirm Password"