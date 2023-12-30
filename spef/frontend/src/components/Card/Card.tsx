import styles from "../Flashcards/Flashcards.module.css";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Badge } from "react-bootstrap";

function Card({ flashcard, handleShow }: any) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDeleteRequest = (event: any, key: any) => {
        event.preventDefault();
        setIsDeleting(true);
    };

    const handleDelete = (event: any, key: any) => {
        fetch(`/api/questions/${key}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("success");
                console.log(data);
                setIsDeleted(true);
            })
            .catch((error) => console.error("Error:", error));
    };

    if (isDeleted) {
        return null;
    }

    return (
        <Col
            key={flashcard.id}
            className="col-3 m-2"
            style={{ border: "1px solid black", borderRadius: "15px" }}
        >
            {/* style={{ backgroundColor: "#f8f9fa" }} */}
            <Row>
                <Col>
                    <div className="d-flex justify-content-start">
                        <Badge bg="secondary">{flashcard.level}</Badge>
                    </div>
                </Col>
                <Col>
                    <div className=" d-flex justify-content-end">
                        {isDeleting ? (
                            <button
                                className="delete-button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleDelete(event, flashcard.id);
                                }}
                            >
                                Yes, delete
                            </button>
                        ) : (
                            <button
                                className="delete-button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleDeleteRequest(event, flashcard.id);
                                }}
                            >
                                X
                            </button>
                        )}
                    </div>
                </Col>
            </Row>
            <a onClick={(event) => handleShow(event, flashcard.id)}>
                <div className={styles.flashcard}>
                    <h2>{flashcard.question}</h2>
                    {/* <p>{flashcard.answer}</p> */}
                </div>
                <div>
                    <p>#{flashcard.tag1}</p>
                    {flashcard.tag2 ? <p>#{flashcard.tag2}</p> : null}
                    {flashcard.tag3 ? <p>#{flashcard.tag3}</p> : null}
                    <p>
                        {new Date(flashcard.repeat_date).toLocaleDateString()}
                    </p>
                </div>
            </a>
        </Col>
    );
}

export default Card;
