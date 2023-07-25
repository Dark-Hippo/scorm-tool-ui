import { Loop } from '@mui/icons-material';
import './PageLoader.css';

export const PageLoader = () => {
  return (
    <div className="page-loader">
      <Loop className="loader spin" />
    </div>
  );
};
