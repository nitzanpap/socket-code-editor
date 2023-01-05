import { getServer } from '../../api/crud';
import styles from './Landing.module.scss';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';

function Landing({ codeBlocksArr }) {
  const navigate = useNavigate();
  return (
    <section className={styles.Landing}>
      <h1 className={styles.title}>Choose code block:</h1>
      <section className={styles.CodeBlocksContainer}>
        {codeBlocksArr.map((codeBlockObj) => {
          return (
            <Card
              dark
              styling={{ width: 'min(10vh, 100px)', minWidth: 'fit-content', cursor: 'pointer' }}
              className={styles.CodeBlockCard}
              key={codeBlockObj.id}
              onClick={() => {
                navigate(`/live-editor/code-block/${codeBlockObj.id}`);
              }}
            >
              <div className="AppLink">{codeBlockObj.title}</div>
            </Card>
          );
        })}
      </section>
    </section>
  );
}

export default Landing;
