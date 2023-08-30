import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { ProfileData } from '../types/UserProfile';
import { getProfile } from '../services/UserProfileService';

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  if (loading) return <h1>Loading...</h1>;

  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);
      const accessToken = await getAccessTokenSilently();
      const idToken = await getIdTokenClaims();
      const userEmail = idToken?.email;
      if (!userEmail) {
        throw new Error('No email address found in ID token');
      }
      const userProfileData = await getProfile(userEmail, accessToken);
      setProfileData(userProfileData);
      setLoading(false);
    };

    getProfileData();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  return (
    <div>
      <p>Email: {profileData?.email}</p>
      <p>Name: {profileData?.name}</p>
      <p>
        Last logged in: {profileData?.lastLoggedIn.toLocaleDateString('en-GB')}
      </p>
    </div>
  );
}
