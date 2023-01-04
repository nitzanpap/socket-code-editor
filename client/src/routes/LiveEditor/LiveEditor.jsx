import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import MyEditor from '../../components/MyEditor/MyEditor';

function LiveEditor() {
  const { name } = useParams();
  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <h4>{name}</h4>
      <MyEditor />
    </section>
  );
}

export default LiveEditor;
