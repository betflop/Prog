import Flashcards from '../Flashcards/Flashcards';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';

function Body() {

  const [currentTopic, setCurrentTopic] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInputChange = (event) => {
      setSearchInput(event.target.value);
      console.log(event.target.value);
  };

    return (
        <>

    <Button variant="danger" onClick={() => setCurrentTopic('all') }>
      All <Badge bg="secondary">284</Badge>
      <span className="visually-hidden">unread messages</span>
    </Button>

    <Button variant="primary" onClick={() => setCurrentTopic('linux') }>
      Linux <Badge bg="secondary">9</Badge>
      <span className="visually-hidden">unread messages</span>
    </Button>
    <Button variant="info" onClick={() => setCurrentTopic('devops')}>
      DevOps <Badge bg="secondary">5</Badge>
      <span className="visually-hidden">unread messages</span>
    </Button>
    <Button variant="warning" onClick={() => setCurrentTopic('golang')}>
      Golang <Badge bg="secondary">8</Badge>
      <span className="visually-hidden">unread messages</span>
  </Button>
  <SearchBar onChange={handleSearchInputChange}/>
  <Flashcards topic={currentTopic} searchInput={searchInput}/>
 </>
 );
}

export default Body;
