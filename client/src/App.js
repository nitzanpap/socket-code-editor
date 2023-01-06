import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing/Landing';
import Page404 from './routes/Page404/Page404';
import LiveEditor from './routes/LiveEditor/LiveEditor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppHeader from './components/AppHeader/AppHeader';
import { useEffect, useState } from 'react';
import { getCodeBlocksTitles } from './api/crud';

function App() {
  const [codeBlocksArr, setCodeBlocksArr] = useState([]);

  useEffect(() => {
    // TODO: Refactor to indicate fetching code blocks through Toastify.
    console.log('Fetching code blocks');
    async function connectToServer() {
      setCodeBlocksArr(await getCodeBlocksTitles());
    }
    connectToServer();
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Landing codeBlocksArr={codeBlocksArr} />} />
        <Route path="/live-editor/code-block">
          <Route path=":id" element={<LiveEditor />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer className="NotificationContainer" />
    </div>
  );
}

export default App;
