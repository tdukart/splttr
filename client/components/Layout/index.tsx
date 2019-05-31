import * as React from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import User from '../User';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Container fluid>
        <Navbar color="light" light>
          <NavbarBrand>Splttr</NavbarBrand>
          <User>
            {(user) => {
              if (user) {
                return (
                  <p>
                    {`Hello ${user.name}`}
                  </p>
                );
              }
              return (
                <NavLink className="navbar-nav" to="/login">
                  Sign In
                </NavLink>
              );
            }}
          </User>
        </Navbar>
      </Container>
      <Container>
        <User>
          {(user) => <pre>{JSON.stringify(user, null, 2)}</pre>}
        </User>
        {children}
      </Container>
    </React.Fragment>
  );
};

export default Layout;
