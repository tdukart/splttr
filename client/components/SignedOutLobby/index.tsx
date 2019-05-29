import * as React from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

const SignedOutLobby = () => (
  <Card>
    <CardHeader>Welcome!</CardHeader>
    <CardBody>
      <p>Please choose an option:</p>
      <Link to="/login"><Button>Log in to existing account</Button></Link>
      <Link to="/newaccount"><Button>Create new account</Button></Link>
    </CardBody>
  </Card>
);

export default SignedOutLobby;
