import * as React from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Container>
        <Navbar color="dark" dark>
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
