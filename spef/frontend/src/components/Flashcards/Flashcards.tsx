import styles from "./Flashcards.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../Card/Card";

function Flashcards({ tags, searchInput }: any) {
    const [flashcards, setFlashcards] = useState([
        { id: 99999, question: "---", answer: "---" },
    ]);

    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [image, setImage] = useState("");
    const [currentCard, setCurrentCard] = useState({});
    const [currentKey, setCurrentKey] = useState(0);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        console.log("fetching");
        fetch("/api/questions", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let filteredData = [];
                if (tags.includes("ready")) {
                    filteredData = data.filter(
                        (item) => new Date(item.repeat_date) <= new Date()
                    );
                } else {
                    filteredData = data;
                }

                tags = tags.filter((item) => item !== "ready");
                if (tags.length != 0) {
                    filteredData = filteredData.filter((item) =>
                        tags.includes(item.tag1.toLowerCase())
                    );
                }
                if (searchInput != "") {
                    filteredData = filteredData.filter(
                        (item) =>
                            item.question
                                .toLowerCase()
                                .includes(searchInput.toLowerCase()) ||
                            item.answer
                                .toLowerCase()
                                .includes(searchInput.toLowerCase())
                    );
                }
                setFlashcards(
                    filteredData.sort(
                        (a, b) =>
                            new Date(a.repeat_date) - new Date(b.repeat_date)
                    )
                );
            })
            .catch((error) => console.error("Error:", error));
    }, [tags, searchInput]);

    const handleClose = () => {
        setCurrentCard({});
        setShow(false);
    };
    const handleSetStatus = (event: any, status: any) => {
        console.log("hard");
        console.log(currentKey);
        fetch(`/api/questions/${currentKey}/practice`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                key: currentKey,
                status: status,
                user_id: 1,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("success");
                console.log(data);
                console.log(data.newDate);

                setCurrentCard({});
                {
                    /* currentCard.repeat_date = new Date(data.newDate); */
                }
                const updatedFlashcards = flashcards.map((flashcard) => {
                    if (flashcard.id !== currentCard.id) {
                        return flashcard;
                    }

                    return {
                        ...flashcard,
                        repeat_date: new Date(data.newDate),
                    };
                });

                setFlashcards(
                    updatedFlashcards.sort(
                        (a, b) =>
                            new Date(a.repeat_date) - new Date(b.repeat_date)
                    )
                );
            })
            .catch((error) => console.error("Error:", error));
        setShow(false);
    };

    const handleShow = (event: any, key: any) => {
        console.log("clicked");
        console.log(key);
        setCurrentCard(flashcards.filter((item: any) => item.id === key)[0]);
    };

    useEffect(() => {
        console.log("changed current card");
        setCurrentKey(currentCard.id);
        console.log(currentCard.id);
        setQuestion(currentCard.question);
        setAnswer(currentCard.answer);
        setImage("data:image/png;base64," + currentCard.img);
    }, [currentCard]);

    useEffect(() => {
        if (question && answer) {
            setShow(true);
        }
    }, [question, answer, image, currentKey]);

    return (
        <>
            <Row className="justify-content-md-center col-12">
                {flashcards.map((flashcard: any) => (
                    <Card
                        key={flashcard.id}
                        flashcard={flashcard}
                        handleShow={handleShow}
                    />
                ))}
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{question}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <img
                            src={image}
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Body>{answer}</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleSetStatus(event, "hard");
                        }}
                    >
                        Hard
                    </Button>
                    <Button
                        variant="warning"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleSetStatus(event, "medium");
                        }}
                    >
                        Medium
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleSetStatus(event, "easy");
                        }}
                    >
                        Easy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Flashcards;
