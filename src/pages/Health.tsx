import { useState } from 'react';
import { GetHealth, GetDbHealth } from '../services/HealthService';
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';
import { APIResponse } from '../types/Responses';
import { Box, Button } from '@mui/material';

export const HealthPage = () => {
  const [health, setHealth] = useState<string | undefined>('');
  const [dbHealth, setDbHealth] = useState<string | undefined>('');
  const [error, setError] = useState<string>('');

  const { getAccessTokenSilently } = useAuth0<Auth0ContextInterface>();

  const handleGetHealth = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response: APIResponse = await GetHealth(accessToken);

      setHealth(response.message);
      setError('');
    } catch (error: any) {
      setError(`Error calling GetHealth: ${error.message}`);
    }
  };

  const handleGetDbHealth = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await GetDbHealth(accessToken);

      setDbHealth(response.message);
      setError('');
    } catch (error: any) {
      setError(`Error calling GetDbHealth: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Health Page</h1>
      <Box sx={{ display: { md: 'flex' } }}>
        <Button variant="outlined" onClick={handleGetHealth}>
          Get Health
        </Button>
        <Button variant="outlined" onClick={handleGetDbHealth}>
          Get DB Health
        </Button>
      </Box>
      {error && <div>Error: {error}</div>}
      <div>
        <h2>Health:</h2>
        <pre>{health}</pre>
      </div>
      <div>
        <h2>DB Health:</h2>
        <pre>{dbHealth}</pre>
      </div>
    </div>
  );
};
