import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';

function LiveEditor() {
  const { name } = useParams();
  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <p>{name}</p>
      {console.log(name)}
    </section>
  );
}

export default LiveEditor;
