import { TableRow, TableCell } from '@mui/material';
import EditUserModal from './EditUserModal';
import { UserData } from '../types/UserData';

interface UsersTableRowProps {
  user: UserData;
  handleUpdateUser: (id: number | undefined, userData: UserData) => void;
  handleDeleteUser: (id: number | undefined) => void;
}

export const UsersTableRow = ({
  user,
  handleUpdateUser,
  handleDeleteUser,
}: UsersTableRowProps) => {
  return (
    <TableRow key={user.id}>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.lastLoggedIn?.toLocaleDateString('en-GB')}</TableCell>
      <TableCell>
        <EditUserModal
          user={user}
          onClose={() => {}}
          onSave={async (userData) => handleUpdateUser(user.id, userData)}
          onDelete={async () => handleDeleteUser(user.id)}
        />
      </TableCell>
    </TableRow>
  );
};
