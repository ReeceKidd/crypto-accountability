import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { FC } from "react";
import { Button, Menu } from "semantic-ui-react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { account } = useWeb3React();
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href={"/"} passHref>
        <Menu.Item>Crypto accountability</Menu.Item>
      </Link>
      <Menu.Menu position="right">
        <Menu.Item>{account}</Menu.Item>
        <Link href={"/contracts"} passHref={true}>
          <Menu.Item>Contracts</Menu.Item>
        </Link>
        <Link href="/contracts/new" passHref={true}>
          <Menu.Item link={true}>
            <Button primary icon="plus" />
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
