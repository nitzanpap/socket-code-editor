import Button from '@mui/material/Button';
import { getServer } from '../../api/crud';
import styles from './Landing.module.scss';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import AddIcon from '@mui/icons-material/Add';

function Landing({ codeBlocksArr }) {
  const navigate = useNavigate();
  return (
    <section className={styles.Landing}>
      <h1 className={styles.title}>Choose code block:</h1>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={useCallback(() => {
          // TODO: Add functionality to button.
          getServer();
        }, [])}
      >
        Add New Code Block
      </Button>
      <section className={styles.CodeBlocksContainer}>
        {codeBlocksArr.map((codeBlockObj) => {
          return (
            <Card
              dark
              styling={{ width: 'min(10vh, 100px)', minWidth: 'fit-content', cursor: 'pointer' }}
              className={styles.CodeBlockCard}
              key={codeBlockObj.name}
              onClick={() => {
                navigate(`/live-editor/code-block/${codeBlockObj.name}`);
              }}
            >
              <div className="AppLink">{codeBlockObj.name}</div>
            </Card>
          );
        })}
      </section>
    </section>
  );
}

export default Landing;
