import { NavLink } from 'react-router-dom';

export const SiteLink = ({ id, guid }: { id: number; guid: string }) => {
  return <NavLink to={`/site/${id}/${guid}/webcontent/`}>View site</NavLink>;
};
