import { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { ButtonGroup, Button } from "react-bootstrap";
import { Card, ListGroup } from "react-bootstrap";

const URL =
  "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/";

function List(props) {
  const getId = (id) => {
    props.getId(id);
  };

  return (
    <>
      <ButtonGroup vertical>
        {props.list.map((o) => (
          <Button
            onClick={() => getId(o.id)}
            id={o.id}
            key={o.id}
            variant="outline-secondary"
          >
            {o.name}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
}

function Details(props) {
  const user = props.userInfo;
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={user.avatar + "/" + user.id} />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>City: {user.details.city}</ListGroup.Item>
          <ListGroup.Item>Company: {user.details.company}</ListGroup.Item>
          <ListGroup.Item>Position: {user.details.position}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

function App() {
  const [list, setList] = useState([]);
  const [userId, setUserId] = useState();
  const [userInfo, setUserInfo] = useState();
  const [loader, setLoader] = useState(true);

  const getId = (value) => {
    setUserId(value);
  };

  useEffect(() => {
    fetch(URL + "users.json")
      .then((response) => response.json())
      .then((data) => setList([...data]));
  }, []);

  useEffect(() => {
    const fetchData = () => {
      setLoader(true);

      fetch(URL + userId + ".json")
        .then((response) => response.json())
        .then((data) => setUserInfo(data))
        .finally(() => setLoader(false));
    };

    userId && fetchData();
  }, [userId]);

  // еще вариант
  // useEffect(() => {
  //   setLoader(true);
  //   setUserInfo();
  //   setTimeout(() => {
  //     userId &&
  //       fetch(URL + userId + ".json")
  //         .then((response) => response.json())
  //         .then((data) => setUserInfo(data))
  //         .then(() => setLoader(false));
  //   }, 1000);
  // }, [userId]);

  return (
    <Container>
      <Row>
        <Col>
          <List list={list} getId={getId} />
        </Col>
        <Col>
          {loader && <progress />}

          {userInfo && <Details userInfo={userInfo} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
