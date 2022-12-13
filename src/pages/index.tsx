import {Outlet} from 'react-router-dom';
import styles from './styles.module.css'

export default function RootPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
