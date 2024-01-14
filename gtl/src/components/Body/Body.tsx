import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Body.module.css"; // Импортируйте ваш CSS файл

const playgrounds = [
    {
        id: 1,
        name: "playground1",
        description: "linux and grep",
        guid: "16d36022-82ff-40fb-b9e8-9f1891fb3635"
    },
    {
        id: 2,
        name: "playground2",
        description: "docker",
        guid: "16d36022-82ff-40fb-b9e8-9f1891fb5555"
    },
    {
        id: 3,
        name: "playground3",
        description: "kubernetes",
        guid: "16d36022-82ff-40fb-b9e8-9f1891fb1111"
    }
]

function Body() {
   return (
       <>
<Row className="justify-content-md-center col-12 d-flex flex-wrap">
               {playgrounds.map((playground: any) => (
                  <Link to={`/playground/${playground.id}/${playground.guid}`} className="col-3 m-2">
                      <div
                          key={playground.id}
                          style={{ border: "1px solid black", borderRadius: "15px", textAlign: "center" }}
                      >
                        <h3 style={{textDecoration: 'none', color: 'inherit'}}>{playground.name}</h3>
                        <p style={{textDecoration: 'none', color: 'inherit'}}>{playground.description}</p>
                      </div>
                  </Link>
               ))}
           </Row>
       </>
   );
}

export default Body;
