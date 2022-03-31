import { FC } from "react";
import { Container } from "semantic-ui-react";
import Header from "../Header/Header";



const Layout: FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
