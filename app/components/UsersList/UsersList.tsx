import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';

interface UsersListProps {
  userAddresses: string[];
}

const UsersList = ({ userAddresses }: UsersListProps) => {
  return (
    <List>
      {userAddresses.map((address, index) => (
        <ListItem key={index}>
          <Link href={`/users/${address}`} passHref={true}>
            <ListItemText
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {address}
            </ListItemText>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;
