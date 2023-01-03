import logo from '../../assets/logo.svg';
import styles from './AppHeader.module.scss';
import { Link } from 'react-router-dom';

function AppHeader({ text, stylingClass, handleOnClick, disabled = false }) {
  return (
    <header className={styles.AppHeader}>
      <div className={styles.LeftSideOfNav}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <nav className={styles.TopNav}>
          <Link className={`AppLink`} to="/">
            Landing
          </Link>
          <Link className={`AppLink`} to="/live-editor/code-block">
            Live Editor
          </Link>
        </nav>
      </div>
      <p>Socket Code Editor</p>
    </header>
  );
}

export default AppHeader;
