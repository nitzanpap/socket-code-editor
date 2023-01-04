import styles from './Editor.module.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useEffect, useState } from 'react';
import { createRange, getSelection, createRangyRange } from 'rangy';

const initialCodeBlock = '// Example code:\nconst x = 10 + 5;\nconsole.log(x); // 15';

function Editor() {
  const [code, setCode] = useState(initialCodeBlock);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

  return (
    <div className={styles.Editor}>
      <pre className={styles.pre}>
        <code
          className="language-javascript"
          contentEditable="true"
          onSelect={(e) => {
            const newCode = e.currentTarget.innerText;
            console.log(newCode);
            setCode(newCode);
            // TODO: Fix cursor position, or implement a different solution
            setCursorPosition(cursorPosition + 1);
            console.log(cursorPosition);
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

export default Editor;
