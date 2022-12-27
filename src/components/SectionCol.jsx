import React from 'react'

function SectionCol() {
    const [section]
  return (
    <Col className="mr-0"xs={6}>
          {" "}
          Sections
          
          {allSections && (
            <ListGroup bsClass="list" variant="dark mt-2" defaultActiveKey={allSections[0].pk}>
              {allSections.map((section) => (
                <ListGroup.Item
                  action
                  onClick={() => handleSectionChange(section)}
                  href={`#${section.pk}`}
                >
                  {section.fields.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <div className="d-grid">
            <Button variant="dark mt-2" size="sm">
              Add Section
            </Button>
          </div>
        </Col>
  )
}

export default SectionCol