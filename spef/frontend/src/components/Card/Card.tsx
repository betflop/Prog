import styles from '../Flashcards/Flashcards.module.css';

function Card({ flashcard, handleShow} : any) {

 return (
     <a onClick={handleShow}>
     <div className={styles.flashcard}>
       <h2>{flashcard.question}</h2>
       <p>{flashcard.answer}</p>
   </div>
   </a>
 );
}

export default Card;

