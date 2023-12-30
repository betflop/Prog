import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";

function BasicExample({ isDarkMode, setIsDarkMode }: any) {
    const handleThemeChange = () => {
        const newIsDarkMode = !isDarkMode;
        console.log("handleThemeChange" + newIsDarkMode);
        setIsDarkMode(newIsDarkMode);
        {
            /* document.body.classList.toggle("dark"); */
        }
        document.documentElement.setAttribute(
            "data-bs-theme",
            newIsDarkMode ? "dark" : "light"
        );
    };

    useEffect(() => {
        console.log("useEffect");
        console.log(isDarkMode);
        handleThemeChange();
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">SPEF</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Главная</Nav.Link>

                        <Nav.Link href="/statistics">Статистика</Nav.Link>
                        <NavDropdown title="Библиотека" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="outline-info" onClick={handleThemeChange}>
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                </Button>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
