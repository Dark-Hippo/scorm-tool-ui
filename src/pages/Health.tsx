import { useEffect, useState } from 'react';
import {
  GetHealthDirect,
  GetDbHealth,
  GetHealthProxy,
} from '../services/HealthService';
import { APIResponse } from '../types/Responses';
import { Box, Button } from '@mui/material';
import { StatusIndicator } from '../components/StatusIndicator';
import { FileUploadStatus as CheckStatus } from '../types/FileWithStatus';

interface HealthCheck {
  Status: JSX.Element;
  Message?: string;
}

export const HealthPage = () => {
  const [health, setHealth] = useState<HealthCheck | undefined>();
  const [proxyHealth, setProxyHealth] = useState<HealthCheck | undefined>();
  const [dbHealth, setDbHealth] = useState<HealthCheck | undefined>();
  const [error, setError] = useState<string | undefined>('');

  const handleGetHealth = async () => {
    try {
      setHealth({
        Status: <StatusIndicator status={CheckStatus.InProgress} />,
        Message: '',
      });

      const response: APIResponse = await GetHealthDirect();

      if (response.isValid) {
        setHealth({
          Status: <StatusIndicator status={CheckStatus.Complete} />,
          Message: response.message,
        });
        setError('');
      } else {
        setHealth({
          Status: <StatusIndicator status={CheckStatus.Error} />,
          Message: response.message,
        });
        setError(response.message);
      }
    } catch (error: any) {
      setError(`Error calling GetHealth: ${error.message}`);
    }
  };

  const handleGetHealthProxy = async () => {
    try {
      setProxyHealth({
        Status: <StatusIndicator status={CheckStatus.InProgress} />,
        Message: '',
      });

      const response: APIResponse = await GetHealthProxy();

      if (response.isValid) {
        setProxyHealth({
          Status: <StatusIndicator status={CheckStatus.Complete} />,
          Message: response.message,
        });
        setError('');
      } else {
        setProxyHealth({
          Status: <StatusIndicator status={CheckStatus.Error} />,
          Message: response.message,
        });
        setError(response.message);
      }
    } catch (error: any) {
      setError(`Error calling GetHealth: ${error.message}`);
    }
  };

  const handleGetDbHealth = async () => {
    try {
      setDbHealth({
        Status: <StatusIndicator status={CheckStatus.InProgress} />,
        Message: '',
      });

      const response = await GetDbHealth();

      if (response.isValid) {
        setDbHealth({
          Status: <StatusIndicator status={CheckStatus.Complete} />,
          Message: response.message,
        });
        setError('');
      } else {
        setDbHealth({
          Status: <StatusIndicator status={CheckStatus.Error} />,
          Message: response.message,
        });
        setError(response.message);
      }
    } catch (error: any) {
      setError(`Error calling GetDbHealth: ${error.message}`);
    }
  };

  useEffect(() => {
    handleGetHealth();
    handleGetHealthProxy();
    handleGetDbHealth();
  }, []);

  return (
    <div>
      <h1>Health Page</h1>
      <Box sx={{ display: { md: 'flex' } }}>
        <Button
          sx={{ marginRight: '10px' }}
          variant="outlined"
          onClick={handleGetHealth}
        >
          Get Health Direct
        </Button>
        <Button
          sx={{ marginRight: '10px' }}
          variant="outlined"
          onClick={handleGetHealthProxy}
        >
          Get Health Via Proxy
        </Button>
        <Button variant="outlined" onClick={handleGetDbHealth}>
          Get DB Health
        </Button>
      </Box>
      {error && <div>Error: {error}</div>}
      <div>
        <h2>Direct health check:</h2>
        <pre>
          {health?.Status}
          {health?.Message}
        </pre>
      </div>
      <div>
        <h2>Proxy health check:</h2>
        <pre>
          {proxyHealth?.Status}
          {proxyHealth?.Message}
        </pre>
      </div>
      <div>
        <h2>Direct DB health check:</h2>
        <pre>
          {dbHealth?.Status}
          {dbHealth?.Message}
        </pre>
      </div>
    </div>
  );
};
