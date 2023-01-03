import logo from '../../assets/logo.svg';
import styles from './AppHeader.module.scss';
import { Link } from 'react-router-dom';

function AppHeader({ text, stylingClass, handleOnClick, disabled = false }) {
  return (
    <header className={styles.AppHeader}>
      <img src={logo} className={styles.AppLogo} alt="logo" />
      <nav className={styles.TopNav}>
        <Link className={`AppLink`} to="/">
          Home
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader;
