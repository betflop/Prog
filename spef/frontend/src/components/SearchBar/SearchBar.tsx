import { Button, Col, Container, Form, Row } from "react-bootstrap";

function SearchBar({ onChange }: { onChange: any }) {
    return (
        <Container>
            <Row>
                <Col>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={onChange}
                        />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchBar;
