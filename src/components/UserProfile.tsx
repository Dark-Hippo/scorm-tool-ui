import { useAuth0 } from '@auth0/auth0-react';
import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';

export const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && (
        <Box>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              Decoded ID Token:
            </AccordionSummary>
            <AccordionDetails>
              <code
                style={{
                  lineHeight: '32px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {JSON.stringify(user, null, 2)}
              </code>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </>
  );
};
