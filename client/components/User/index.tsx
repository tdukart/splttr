import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
    }
  }
`;

interface CurrentUserData {
  me: {
    id: string;
    email: string;
    name: string;
  };
}

interface UserProps {
  children(user?: CurrentUserData['me']): React.ReactNode;
}

const User = ({ children }: UserProps) => (
  <Query<CurrentUserData> query={CURRENT_USER_QUERY}>
    {payload => children(payload.data.me)}
  </Query>
);

export default User;
