
describe('Documentation page', () => {
  beforeEach( () => {
    cy.visit("http://localhost:8080/docs/");
  })

  const endpoints = [
    { method: 'GET', path: '/group/findAvailable', description: 'Find available groups' },
    { method: 'POST', path: '/groups/enroll', description: 'Enroll a student in a group' },
    { method: 'POST', path: '/group/{groupID}/classroom/setEditor', description: 'Update studentID of the student who is allowed to edit the chessboard' },
    { method: 'GET', path: '/student/{studentID}', description: 'Get student by ID' },
    { method: 'POST', path: '/coach', description: 'Create a new coach given their name' },
  ];
  it('Check if the page displays the correct title', () => {
    // Assert the page contains the correct header or title
    cy.contains('YouChess API').should('be.visible'); // Replace with your page's actual title
  });

  it('Should list specific endpoints with correct descriptions', () => {
    // Iterate through each endpoint to validate
    endpoints.forEach((endpoint) => {
      cy.contains(endpoint.method).should('exist');
      // Check if the specific endpoint exists in the list
      cy.get(`[data-path="${endpoint.path}"]`)
        .should('exist') // Ensure the element exists
        .then(($el) => {
          // Clean the text and assert the endpoint path
          const cleanedText = $el.text().replace(/\u200B/g, ''); // Remove ZeroWidthSpace
          expect(cleanedText).to.eq(endpoint.path); // Assert the cleaned text matches
        });

      // Optional: Further validate the description
      cy.get(`[data-path="${endpoint.path}"]`)
        .siblings('.opblock-summary-description') // Navigate to the sibling element for description
        .should('contain.text', endpoint.description);
    });
  });

  it('Check if the endpoint expands when clicked', () => {
      // Click the endpoint and ensure it expands
      cy.get('#operations-group-findAvailableGroups .opblock-summary').click();
      cy.get('#operations-group-findAvailableGroups .opblock-body').should('be.visible');
  });

  it('Check if all 12 endpoints are visible', () => {
    // Check if there are 12 endpoints visible on the page
    cy.get('.opblock').should('have.length', 12);
    });

    it('Should expand and display correct details for varibles in Schema', () => {
        // Find the GroupIn schema container
        cy.get('#model-GroupIn').within(() => {
          // Click on the schema to expand it
          cy.get('.model-title').contains('GroupIn').click();
    
          // Verify the schema is expanded (check for opening brace or expanded toggle)
          cy.get('.brace-open.object').should('be.visible');
    
          // Verify the parameters of the GroupIn schema
          cy.get('table.model').within(() => {
            // Check the first parameter: name
            cy.get('tr')
              .contains('td', 'name')
              .should('exist')
              .parent()
              .within(() => {
                cy.get('.prop-type').contains('string').should('exist'); // Check type
              });
    
            // Check the second parameter: maxMembers
            cy.get('tr')
              .contains('td', 'maxMembers')
              .should('exist')
              .parent()
              .within(() => {
                cy.get('.prop-type').contains('integer').should('exist'); // Check type
                cy.get('.prop-format').contains('int32').should('exist'); // Check format
              });
          });
        });

    // Find the Classroom schema container
    cy.get('#model-Classroom').within(() => {
        // Click on the schema to expand it
        cy.get('.model-title').contains('Classroom').click();
  
        // Verify the schema is expanded (check for opening brace or expanded toggle)
        cy.get('.brace-open.object').should('be.visible');
  
        // Verify the parameters of the Classroom schema
        cy.get('table.model').within(() => {
          // Check the first parameter: id
          cy.get('tr')
            .contains('td', 'id')
            .should('exist')
            .parent()
            .within(() => {
              cy.get('.prop-type').contains('integer').should('exist'); // Check type
              cy.get('.prop-format').contains('int32').should('exist'); // Check format
            });
  
          // Check the second parameter: editingStudentID
          cy.get('tr')
            .contains('td', 'editingStudentID')
            .should('exist')
            .parent()
            .within(() => {
              cy.get('.prop-type').contains('integer').should('exist'); // Check type
            });
  
          // Check the third parameter: users
          cy.get('tr')
            .contains('td', 'users')
            .should('exist')
            .parent()
            .within(() => {
              cy.get('.model-toggle').should('exist'); // Check for expandable array toggle
              cy.contains('[...]').should('exist'); // Verify array representation
            });
        });
      });

    // Find the groups_enroll_body schema container
    cy.get('#model-groups_enroll_body').within(() => {
        // Click on the schema to expand it
        cy.get('.model-title').contains('groups_enroll_body').click();
  
        // Verify the schema is expanded (check for opening brace or expanded toggle)
        cy.get('.brace-open.object').should('be.visible');
  
        // Verify the parameters of the groups_enroll_body schema
        cy.get('table.model').within(() => {
          // Check the first parameter: studentID
          cy.get('tr')
            .contains('td', 'studentID')
            .should('exist')
            .parent()
            .within(() => {
              cy.get('.prop-type').contains('integer').should('exist'); // Check type
              cy.get('.prop-format').contains('int32').should('exist'); // Check format
            });
  
          // Check the second parameter: groupID
          cy.get('tr')
            .contains('td', 'groupID')
            .should('exist')
            .parent()
            .within(() => {
              cy.get('.prop-type').contains('integer').should('exist'); // Check type
              cy.get('.prop-format').contains('int32').should('exist'); // Check format
            });
        });
      });
    });

});

