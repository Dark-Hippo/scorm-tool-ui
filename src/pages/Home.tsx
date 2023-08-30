import { useAuth0 } from '@auth0/auth0-react';
import UserProfile from '../components/UserProfile';

export default function Home() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <h1>Welcome</h1>
      {isAuthenticated && <UserProfile />}
    </div>
  );
}
