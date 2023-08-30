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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';
import { UserData } from '../types/UserProfile';
import { getUsers } from '../services/UserService';
import { useAuth0 } from '@auth0/auth0-react';

const SearchTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

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

  useEffect(() => {
    const getProfilesData = async () => {
      setLoading(true);
      const accessToken = await getAccessTokenSilently();
      const usersData = await getUsers(accessToken);
      if (usersData) {
        setUsers(usersData);
      }
      setLoading(false);
    };

    getProfilesData();
  }, [getAccessTokenSilently]);

  const filteredUsers = users.filter((profile) =>
    profile.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((profile) => (
              <TableRow key={profile.email}>
                <TableCell>{profile.email}</TableCell>
                <TableCell>{profile.name}</TableCell>
                <TableCell>
                  {profile.lastLoggedIn.toLocaleDateString('en-GB')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
