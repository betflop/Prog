import Flashcards from "../Flashcards/Flashcards";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Body() {
    const [currentTags, setCurrentTag] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        console.log(event.target.value);
    };

    const [tags, setTags] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch("/api/questions/tags", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTags(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    console.log(currentTags);
    return (
        <>
            <Row className="col-12">
                <Col className="col-8">
                    {Object.keys(tags).map((key, index) => (
                        <Button
                            key={index}
                            variant={
                                currentTags.includes(key)
                                    ? "primary"
                                    : "outline-secondary"
                            }
                            onClick={() => {
                                if (currentTags.includes(key)) {
                                    setCurrentTag((prevTags) =>
                                        prevTags.filter((tag) => tag !== key)
                                    );
                                } else {
                                    setCurrentTag((prevTags) => [
                                        ...prevTags,
                                        key,
                                    ]);
                                }
                            }}
                        >
                            #{key} <Badge bg="secondary">{tags[key]}</Badge>
                            <span className="visually-hidden">
                                unread messages
                            </span>
                        </Button>
                    ))}
                </Col>
                <Col className="col-4">
                    <SearchBar onChange={handleSearchInputChange} />
                </Col>
            </Row>
            <Flashcards tags={currentTags} searchInput={searchInput} />
        </>
    );
}

export default Body;
