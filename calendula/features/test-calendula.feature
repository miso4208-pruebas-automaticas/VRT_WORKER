Feature: Abrir menu de ayuda

  Scenario: Como un usuario quiero ver la opcion de pacientes en el menu            
    When I swipe left
    And I press "Pacientes"
    Then I should see "Usuario"

  Scenario: Como un usuario quiero ver la opcion de Botiquín en el menu            
    When I swipe left
    And I press "Botiquín"
    Then I should see "Botiquín de Usuario"

  Scenario: Como un usuario quiero ver la opcion de Rutinas en el menu            
    When I swipe left
    And I press "Rutinas"
    Then I should see "Desayuno"
    Then I should see "Comida"
    Then I should see "Cena"