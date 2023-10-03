import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  TableSortLabel,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';
import { UserData } from '../types/UserProfile';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../services/UserService';
import { useAuth0 } from '@auth0/auth0-react';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';
import { UsersTableRow } from '../components/UsersTableRow';

const SearchTextField = styled(TextField)(({ theme }) => ({}));

export default function UsersPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState<keyof UserData>('email');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { getAccessTokenSilently } = useAuth0();

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleSortClick = (field: keyof UserData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddUser = async (userData: UserData) => {
    const token = await getAccessTokenSilently();
    await createUser(userData, token);
    const users = await getUsers(token);
    if (!users) {
      throw new Error('No users found');
    }
    setUsers([...users]);
  };

  const handleDeleteUser = async (userId: number | undefined) => {
    if (!userId) {
      throw new Error('No user id provided');
    }
    const token = await getAccessTokenSilently();
    await deleteUser(userId, token);
    setUsers(users.filter((user) => user.id !== userId)); // update the users state
  };

  const handleUpdateUser = async (
    userId: number | undefined,
    userData: UserData
  ) => {
    if (!userId) {
      throw new Error('No user id provided');
    }
    const token = await getAccessTokenSilently();
    await updateUser(userId, userData, token);
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return { ...user, ...userData };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    const getUsersData = async () => {
      setLoading(true);
      const accessToken = await getAccessTokenSilently();
      const usersData = await getUsers(accessToken);
      if (usersData) {
        setUsers(usersData);
      }
      setLoading(false);
    };

    getUsersData();
  }, [getAccessTokenSilently]);

  const filteredUsers = users.filter((profile) =>
    profile.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue !== undefined && bValue !== undefined) {
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <SearchTextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={handleSearchTextChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <AddUserModal onSubmit={handleAddUser} />
      </Box>
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
    </div>
  );
}
