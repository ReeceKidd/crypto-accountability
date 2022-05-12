import { render } from '@testing-library/react';
import ContractStatusCell from './ContractStatusCell';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';
import { Table, TableBody, TableRow } from '@mui/material';

describe('ContractStatusCell', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <Table>
            <TableBody>
              <TableRow>
                <ContractStatusCell status={ContractStatus.SUCCESS} />
              </TableRow>
            </TableBody>
          </Table>
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <Table>
          <TableBody>
            <TableRow>
              <ContractStatusCell status={ContractStatus.SUCCESS} />
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
