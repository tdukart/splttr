import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { get } from 'lodash';
import {
  Form,
  InputGroup,
  Input,
  Label,
  Button,
  Spinner,
  UncontrolledAlert,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';
import { CURRENT_USER_QUERY } from '../User';

const LOG_IN = gql`
  mutation LogIn($loginToken: String!) {
    loginWithToken(loginToken: $loginToken) {
      id
    }
  }
`;

const REQUEST_MAGIC_LINK = gql`
  mutation ReqestMagicLink($email: String!) {
    getMagicLink(email: $email)
  }
`;

type UserLoginProps = RouteChildrenProps<{ loginToken?: string }>

interface LogInData {
  email: string;
}

interface LogInWithTokenData {
  loginToken: string;
}

const UserLogin = ({ match: { params: { loginToken } } }: UserLoginProps) => {
  const [email, setEmail] = React.useState('');

  if (loginToken) {
    return (
      <Mutation<{ loginWithToken?: { id: string } }, LogInWithTokenData>
        mutation={LOG_IN}
        refetchQueries={CURRENT_USER_QUERY}
      >
        {(checkToken, { loading, called, data }) => {
          if (!loading && !called) {
            checkToken({ variables: { loginToken } });
          }
          if (!called) {
            return (
              <div>Hold on a moment, we&rsquo;re logging you in!</div>
            );
          }
          if (!data || !data.loginWithToken || !data.loginWithToken.id) {
            return (
              <div>Uh oh, we couldn&rsquo;t log you in.</div>
            );
          }
          return (
            <Redirect to="/" />
          );
        }}
      </Mutation>
    );
  }

  return (
    <Mutation<{ getMagicLink: boolean }, LogInData>
      mutation={REQUEST_MAGIC_LINK}
    >
      {(logIn, { loading, called, data }) => {
        const getMagicLink = get(data, 'getMagicLink');
        return (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              await logIn({ variables: { email } });
            }}
            disabled={loading}
          >
            {
              (called && !getMagicLink) && (
                <UncontrolledAlert color="warning">
                  That doesn&rsquo;t seem right. Please check that you entered the correct email.
                </UncontrolledAlert>
              )
            }
            {
              (called && getMagicLink) && (
                <UncontrolledAlert color="success">
                  Check your email for a magic link!
                </UncontrolledAlert>
              )
            }
            <InputGroup>
              <Label inline>
                Email
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </Label>
            </InputGroup>
            <Button color="primary" type="submit" disabled={loading}>
              {loading
                ? <Spinner size="sm" color="light" /> :
                'Request Magic Link'
              }
            </Button>
            <Link to="/account/create">Create Account</Link>
          </Form>
        );
      }}
    </Mutation>
  );
};

export default UserLogin;
