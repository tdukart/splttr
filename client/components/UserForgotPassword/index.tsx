import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Form, InputGroup, Input, Label, Button } from 'reactstrap';

const REQUEST_RESET = gql`
  mutation RequestReset($email: String!) {
    requestReset(email: $email)
  }
`;

interface ForgotPasswordData {
  email: string;
}

const UserForgotPassword = () => {
  const [email, setEmail] = React.useState('');

  return (
    <Mutation<ForgotPasswordData> mutation={REQUEST_RESET}>
      {(requestReset) => (
        <Form onSubmit={e => {
          e.preventDefault();
          requestReset({ variables: { email } });
        }}
        >
          <InputGroup>
            <Label inline>
              Email
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Label>
          </InputGroup>
          <Button color="primary" type="submit">Request Reset</Button>
        </Form>
      )}
    </Mutation>
  );
};

export default UserForgotPassword;

