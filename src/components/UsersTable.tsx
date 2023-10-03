import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
} from '@mui/material';
import { UsersTableRow } from './UsersTableRow';
import { UserData } from '../types/UserProfile';

interface UsersTableProps {
  sortField: keyof UserData;
  sortDirection: 'asc' | 'desc';
  sortedUsers: UserData[];
  handleSortClick: (field: keyof UserData) => void;
  handleUpdateUser: (id: number | undefined, userData: UserData) => void;
  handleDeleteUser: (id: number | undefined) => void;
}

export const UsersTable = ({
  sortField,
  sortDirection,
  sortedUsers,
  handleSortClick,
  handleUpdateUser,
  handleDeleteUser,
}: UsersTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortField === 'email'}
                direction={sortDirection}
                onClick={() => handleSortClick('email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'name'}
                direction={sortDirection}
                onClick={() => handleSortClick('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === 'lastLoggedIn'}
                direction={sortDirection}
                onClick={() => handleSortClick('lastLoggedIn')}
              >
                Last Logged In
              </TableSortLabel>
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <UsersTableRow
              key={user.id}
              user={user}
              handleUpdateUser={handleUpdateUser}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
