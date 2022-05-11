import Link from 'next/link';
import { List } from '@mui/material';

interface UsersListProps {
  userAddresses: string[];
}

const UsersList = ({ userAddresses }: UsersListProps) => {
  return (
    <List>
      {userAddresses.map((address, index) => (
        <List.Item key={index}>
          <List.Content>
            <Link href={`/users/${address}`} passHref={true}>
              <List.Header
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {address}
              </List.Header>
            </Link>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default UsersList;
