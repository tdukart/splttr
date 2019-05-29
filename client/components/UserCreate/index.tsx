import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Form, FormGroup, FormText, InputGroup, Input, Label, Button } from 'reactstrap';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    createUser(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
      id
      name
      email
    }
  }
`;

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserCreate = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <Mutation<CreateUserData> mutation={CREATE_USER}>
      {(createUser) => (
        <Form onSubmit={e => {
          e.preventDefault();
          createUser({ variables: { name, email, password, confirmPassword } });
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
          <InputGroup>
            <Label inline>
              Password
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Label>
          </InputGroup>
          <InputGroup>
            <Label inline>
              Confirm Password
              <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </Label>
          </InputGroup>
          <Button color="primary" type="submit">Save</Button>
        </Form>
      )}
    </Mutation>
  );
};

export default UserCreate;
