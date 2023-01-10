import PropTypes from 'prop-types';
// @mui
import { Table,TableBody, TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ isNotFound }) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          {isNotFound ? (
            <TableCell colSpan={12}>
              <EmptyContent
                title="No Data"
                sx={{
                  '& span.MuiBox-root': { height: 160 },
                }}
              />
            </TableCell>
          ) : (
            <TableCell colSpan={12} sx={{ p: 0 }} />
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
}
