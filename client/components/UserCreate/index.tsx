import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
        <form onSubmit={e => {
          e.preventDefault();
          createUser({ variables: { name, email } });
        }}
        >
          <input value={name} onChange={e => setName(e.target.value)} />
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <button type="submit">Save</button>
        </form>
      )}
    </Mutation>
  );
};

export default UserCreate;
