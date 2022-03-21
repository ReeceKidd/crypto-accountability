import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { FC, useState } from "react";
import { Button, Icon, Menu, Modal } from "semantic-ui-react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { account } = useWeb3React();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Menu style={{ marginTop: "10px" }}>
        <Link href={"/"} passHref>
          <Menu.Item>Crypto accountability</Menu.Item>
        </Link>
        <Menu.Menu position="right">
          {account ? (
            <Menu.Item>{account}</Menu.Item>
          ) : (
            <Menu.Item>
              <Button
                color="red"
                content={"Connect wallet"}
                onClick={() => setOpenModal(!openModal)}
              />
            </Menu.Item>
          )}

          {account && (
            <>
              <Link href={"/contracts"} passHref={true}>
                <Menu.Item>Contracts</Menu.Item>
              </Link>
              <Link href={"/referee"} passHref={true}>
                <Menu.Item>Referee</Menu.Item>
              </Link>
              <Link href="/contracts/new" passHref={true}>
                <Menu.Item link={true}>
                  <Button primary icon="plus" />
                </Menu.Item>
              </Link>
            </>
          )}
        </Menu.Menu>
      </Menu>
      <Modal
        closeIcon
        header="You need to connect your Metamask wallet"
        onClose={() => setOpenModal(false)}
        open={openModal}
      />
    </>
  );
};

export default Header;
