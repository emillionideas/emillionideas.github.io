import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function About(props) {

    return (
        <Container fluid={true}>
            <Row className="justify-content-center py-5">
                <Col md={8} sm={12}>
                  {props.title && <h3 className="display-4 font-weight-bolder">{props.title}</h3>}
                  <hr />
                    <div class="row">
                        <div class="col-md-12">
                            <div>
                            I was born and raised in Vietnam. In 2013, my family immigrated to America, where I kept pursuing my dream of design. At the beginning of 2020 (aka. the epic year), I said goodbye to my family and my doggie Moon Moon, packed my backpack and moved to Virginia for an internship. The pandemic soon kicked in, and I was stuck at home for several months. That was the time I started turning coding from just a hobby to kill time into something serious.
                            </div>

                            <div style={{paddingTop: '10px'}}>
                            My skills include web design, animation, brand identity, and editorial design but my strengths lie in my approach to in-depth research, analyzing different perspectives, converting complex ideas into visual imagery, and bringing unique ideas to the drawing table. Love HTML, CSS, Javascript and a full spoon of React.
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default About