import Link from "next/link";
import { FC } from "react";
import { Menu } from "semantic-ui-react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href={"/"} passHref>
        <Menu.Item>Crypto accountability</Menu.Item>
      </Link>
    </Menu>
  );
};

export default Header;
