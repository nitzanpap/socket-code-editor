import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';

function LiveEditor() {
  const { codeBlockName } = useParams();
  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <p>{codeBlockName}</p>
    </section>
  );
}

export default LiveEditor;
