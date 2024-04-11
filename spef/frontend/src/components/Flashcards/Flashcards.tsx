import styles from "./Flashcards.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../Card/Card";

function Flashcards({ tags, tagsUrl, setTags, searchInput }: any) {
    const [flashcards, setFlashcards] = useState([
        { id: 99999, question: "---", answer: "---" },
    ]);

    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [currentCard, setCurrentCard] = useState({});
    const [currentKey, setCurrentKey] = useState(0);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        const fetchData = () => {
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
                        console.log("filteredData");
                        console.log(filteredData);
                        filteredData = filteredData.filter(
                            (item) =>
                                tags.includes(item.tag1.toLowerCase()) ||
                                tags.includes(
                                    (item.tag2 || "").toLowerCase()
                                ) ||
                                tags.includes((item.tag3 || "").toLowerCase())
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
                    console.log(filteredData);
                    setFlashcards(
                        filteredData.sort(
                            (a, b) =>
                                new Date(a.repeat_date) -
                                new Date(b.repeat_date)
                        )
                    );
                })
                .catch((error) => {
                    console.log("Data is null, retrying in 10 seconds");
                    setTimeout(fetchData, 10000);
                    console.error("Error:", error);
                });
        };
        fetchData();
    }, [tags, searchInput]);

    const handleClose = () => {
        setCurrentCard({});
        setShow(false);
    };
    const handleSetStatus = (event: any, status: any) => {
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
                setCurrentCard({});
                let updatedFlashcards = flashcards.map((flashcard) => {
                    if (flashcard.id !== currentCard.id) {
                        return flashcard;
                    }
                    return {
                        ...flashcard,
                        repeat_date: new Date(data.newDate),
                    };
                });

                updatedFlashcards = updatedFlashcards.sort(
                    (a, b) => new Date(a.repeat_date) - new Date(b.repeat_date)
                );
                if (tags.includes("ready")) {
                    updatedFlashcards = updatedFlashcards.filter(
                        (item) => new Date(item.repeat_date) <= new Date()
                    );
                }
                setFlashcards(updatedFlashcards);
            })
            .catch((error) => console.error("Error:", error));
        setShow(false);
    };

    const handleShow = (event: any, key: any) => {
        setCurrentCard(flashcards.filter((item: any) => item.id === key)[0]);
    };

    useEffect(() => {
        setCurrentKey(currentCard.id);
        setQuestion(currentCard.question);
        setAnswer(currentCard.answer);
        if (currentCard.img) {
            if (atob(currentCard.img).includes("MPEG-4")) {
                setVideo("data:video/mp4;base64," + currentCard.img);
            } else {
                setImage("data:image/png;base64," + currentCard.img);
            }
        } else {
            setImage("");
            setVideo("");
        }
    }, [currentCard]);

    useEffect(() => {
        if (question && answer) {
            setShow(true);
        }
    }, [question, answer, image, video, currentKey]);

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
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{question}</Modal.Title>
                </Modal.Header>
                {image && (
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
                )}
                {video && (
                    <Modal.Body>
                        <video
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                            }}
                            controls
                            autoPlay
                        >
                            <source type="video/mp4" src={video} />
                        </video>
                    </Modal.Body>
                )}
                <Modal.Body>
                    <div
                        style={{ whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{ __html: answer }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleSetStatus(event, "1");
                        }}
                    >
                        Hard
                    </Button>
                    <Button
                        variant="warning"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleSetStatus(event, "2");
                        }}
                    >
                        Medium
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleSetStatus(event, "3");
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
