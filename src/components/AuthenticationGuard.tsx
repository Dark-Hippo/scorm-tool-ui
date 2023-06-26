import { withAuthenticationRequired } from '@auth0/auth0-react';
import { PageLoader } from './PageLoader';
import React from 'react';

export const AuthenticationGuard = ({
  component,
}: {
  component: React.ComponentType;
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="loader">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
