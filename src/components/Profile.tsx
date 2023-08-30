import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

interface ProfileData {
  email: string;
  name: string;
  lastLoggedIn: Date;
}

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const { getAccessTokenSilently } = useAuth0();

  if (loading) return <h1>Loading...</h1>;

  // useEffect(() => {
  //   const getProfileData = async () => {
  //     setLoading(true);
  //     const accessToken = await getAccessTokenSilently();
  //     const response = await fetch('/api/profile', {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     // const data = await response.json();
  //     const data = {
  //       email: 'johndoe@example.com',
  //       name: 'John Doe',
  //       lastLoggedIn: '2021-09-01T12:00:00Z',
  //     };
  //     setProfileData(data);
  //     setLoading(false);
  //   };

  //   getProfileData();
  // }, [getAccessTokenSilently]);

  useEffect(() => {
    setProfileData({
      email: 'johndoe@example.com',
      name: 'John Doe',
      lastLoggedIn: new Date('2021-09-01T12:00:00Z'),
    });
  }, []);

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
