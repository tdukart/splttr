import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Form, InputGroup, Input, Label, Button } from 'reactstrap';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

interface CreateUserData {
  name: string;
  email: string;
}

const UserCreate = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <Mutation<CreateUserData> mutation={CREATE_USER}>
      {(createUser) => (
        <Form onSubmit={e => {
          e.preventDefault();
          createUser({ variables: { name, email } });
        }}
        >
          <InputGroup>
            <Label inline>
              Name
              <Input value={name} onChange={e => setName(e.target.value)} />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label inline>
              Email
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Label>
          </InputGroup>
          <Button color="primary" type="submit">Save</Button>
        </Form>
      )}
    </Mutation>
  );
};

export default UserCreate;
