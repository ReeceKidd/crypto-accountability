import Link from 'next/link';
import { List, ListItem, ListItemText } from '@mui/material';

export interface ContractListItem {
  address: string;
  title: string;
}
interface ContractsListProps {
  contracts: ContractListItem[];
}

const ContractsList = ({ contracts }: ContractsListProps) => {
  return (
    <List>
      {contracts.map(({ address, title }, index) => (
        <ListItem key={index}>
          <Link href={`/contracts/${address}`} passHref={true}>
            <ListItemText>{title}</ListItemText>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default ContractsList;
