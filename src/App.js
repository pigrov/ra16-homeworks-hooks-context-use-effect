import { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { ButtonGroup, Button } from "react-bootstrap";
import { Card, ListGroup } from "react-bootstrap";

const URL =
  "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/";

function List() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch(URL + "users.json")
      .then((response) => response.json())
      .then((data) => setState([...data]));
  }, []);

  return (
    <>
      <ButtonGroup vertical>
        {state.map((o) => (
          <Button
            onClick={() => Details(o.id)}
            id={o.id}
            key={o.id}
            variant="outline-secondary"
          >
            {o.name}
          </Button>
        ))}
      </ButtonGroup>
      {/* <pre>{JSON.stringify(state, null, " ")}</pre> */}
    </>
  );
}

function Details(id) {
  console.log("id", id);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(URL + "1.json")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  console.log(user);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={user.avatar} />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {/* <ListGroup.Item>City: {user.details.city}</ListGroup.Item>
          <ListGroup.Item>Company: {user.details.company}</ListGroup.Item>
          <ListGroup.Item>Position: {user.details.position}</ListGroup.Item> */}
        </ListGroup>
      </Card>
    </>
  );
}

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <List />
        </Col>
        <Col>
          <Details />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
