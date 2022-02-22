import { FC } from "react";
import { Container } from "semantic-ui-react";
import Header from "../Header/Header";

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
