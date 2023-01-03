import Button from '@mui/material/Button';
import { getServer } from '../../api/crud';
import styles from './Landing.module.scss';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import AddIcon from '@mui/icons-material/Add';

function Landing({ codeBlocksArr }) {
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
              styling={{ width: 'min(10vh, 100px)', height: '100px', minWidth: 'fit-content' }}
              className={styles.CodeBlockCard}
              key={codeBlockObj.name}
            >
              <Link className="AppLink" to={`/live-editor/code-block/:${codeBlockObj.name}`}>
                {codeBlockObj.name}
              </Link>
            </Card>
          );
        })}
      </section>
    </section>
  );
}

export default Landing;
