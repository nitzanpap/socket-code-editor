import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Page404 from './routes/Page404/Page404';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppHeader from './components/AppHeader/AppHeader';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      <ToastContainer className="NotificationContainer" />
    </div>
  );
}

export default App;
