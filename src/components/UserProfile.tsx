import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { getUser } from '../services/UserService';

import type { UserData } from '../types/UserProfile';

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const accessToken = await getAccessTokenSilently();
      const idToken = await getIdTokenClaims();
      const userEmail = idToken?.email;
      if (!userEmail) {
        throw new Error('No email address found in ID token');
      }
      const userProfileData = await getUser(userEmail, accessToken);
      setUserData(userProfileData);
      setLoading(false);
    };

    getUserData();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {userData && (
        <>
          <p>Email: {userData?.email}</p>
          <p>Name: {userData?.name}</p>
          <p>
            Last logged in:{' '}
            {userData?.lastLoggedIn?.toLocaleDateString('en-GB')}
          </p>
        </>
      )}
    </>
  );
}
