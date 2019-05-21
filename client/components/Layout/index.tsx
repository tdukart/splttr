import * as React from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Container fluid>
        <Navbar color="light" light>
          <NavbarBrand>Splttr</NavbarBrand>
        </Navbar>
      </Container>
      <Container>
        {children}
      </Container>
    </React.Fragment>
  );
};

export default Layout;
