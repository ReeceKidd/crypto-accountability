import Link from 'next/link';
import { List, ListItem } from '@mui/material';

interface UsersListProps {
  userAddresses: string[];
}

const UsersList = ({ userAddresses }: UsersListProps) => {
  return (
    <List>
      {userAddresses.map((address, index) => (
        <ListItem key={index}>
          <Link href={`/users/${address}`} passHref={true}>
            {address}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;
