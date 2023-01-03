import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useEffect } from 'react';

const codeBlock = '// Example code:\nconst x = 10 + 5;\nconsole.log(x); // 15';

function LiveEditor() {
  const { name } = useParams();

  useEffect(() => {
    hljs.highlightAll();
  });
  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <h4>{name}</h4>
      <pre className={styles.pre}>
        <code className="language-javascript">{codeBlock}</code>
      </pre>
    </section>
  );
}

export default LiveEditor;
