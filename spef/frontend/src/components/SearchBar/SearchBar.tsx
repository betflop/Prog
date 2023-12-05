import { Button, Col, Container, Form, Row } from "react-bootstrap";

function SearchBar( { onChange } : { onChange: any} ) {
   return (
     <Container className="mt-5">
       <Row>
         <Col sm={4}>
           <Form className="d-flex">
             <Form.Control
               type="search"
               placeholder="Search"
               className="me-2"
       aria-label="Search"
       onChange={onChange}
             />
             <Button>
               Search
             </Button>
           </Form>
         </Col>
       </Row>
     </Container>
   );
 }

export default SearchBar;
