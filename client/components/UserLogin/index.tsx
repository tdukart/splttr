import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Form, InputGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { CURRENT_USER_QUERY } from '../User';

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password){
      id
      name
      email
    }
  }
`;

interface LogInData {
  email: string;
  password: string;
}

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Mutation<LogInData>
      mutation={LOG_IN}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(logIn, { error, loading }) => (
        <Form
          onSubmit={async e => {
            e.preventDefault();
            await logIn({ variables: { email, password } });
            setEmail('');
            setPassword('');
          }}
          disabled={loading}
        >
          {error && <FormFeedback>{error}</FormFeedback>}
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
          <Button color="primary" type="submit">Log In</Button>
        </Form>
      )}
    </Mutation>
  );
};

export default UserLogin;
