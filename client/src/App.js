import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
import Page404 from './routes/Page404/Page404';
import LiveEditor from './routes/LiveEditor/LiveEditor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppHeader from './components/AppHeader/AppHeader';
import { useEffect, useState } from 'react';

function App() {
  const [codeBlocksArr, setCodeBlocksArr] = useState([]);

  useEffect(() => {
    console.log('Fetching');
    setCodeBlocksArr([{ name: '11212212121221' }, { name: '2' }, { name: '3' }, { name: '4' }]);
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Landing codeBlocksArr={codeBlocksArr} />} />
        <Route path="/live-editor/code-block" element={<LiveEditor />}>
          <Route path=":name" element={<LiveEditor />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer className="NotificationContainer" />
    </div>
  );
}

export default App;
