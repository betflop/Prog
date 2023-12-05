
import styles from './Flashcards.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../Card/Card';

function Flashcards( {topic, searchInput} : any ) {

 const [flashcards, setFlashcards] = useState([{"id": 999 , "question": "Question ---", "answer": "Answer ---"}]);

console.log("render Flashcards");
console.log(topic);

 useEffect(() => {
   const requestOptions = {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ topic: 'linux1react', description: 'test123' })
   };

   fetch('/api/cards', requestOptions)
     .then(response => response.json())
         .then(data => {console.log(data);
             let filteredData = (topic === "all" ? data : data.filter(item => item.topic === topic));
             if (searchInput != "") {
                console.log("searching " + searchInput);
                filteredData = data.filter(item => item.answer.toLowerCase().includes(searchInput.toLowerCase()) || item.question.toLowerCase().includes(searchInput.toLowerCase()));
             }
          setFlashcards(filteredData);
          console.log(topic === "all");
          console.log(data);
          console.log("flashcards");
          console.log(flashcards);
          
      })
     .catch(error => console.error('Error:', error));

 }, [topic, searchInput]); 

    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState('');
 const [image, setImage] = useState('');

  const handleClose = () => setShow(false);
    const handleShow = (event: any) => {
        console.log('clicked');
        console.log(event.target);
        setQuestion(event.target.innerText);
        setShow(true);
    }

    const handleShowImage = () => {
        setQuestion("fffffffffff");
        setImage("https://via.placeholder.com/150");
}

 return (
     <>
     {flashcards.map((flashcard: any) => (
        <Card key={flashcard.id} flashcard={flashcard} handleShow={handleShow} />
     ))}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Body>{question}</Modal.Body>
        <Modal.Body><img src={image} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShowImage}>
            Show image
          </Button>
        </Modal.Footer>
      </Modal>
     </>    
      );
}

export default Flashcards;
