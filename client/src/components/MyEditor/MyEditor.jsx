import Editor from 'react-simple-code-editor';
import { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './MyEditor.module.scss';

const exampleCode = `
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trim();

function MyEditor() {
  return (
    <Highlight {...defaultProps} theme={theme} code={exampleCode} language="jsx">
      {({ tokens, getLineProps, getTokenProps }) => (
        <div className={styles.MyEditor}>
          <pre className={styles.Pre}>
            {tokens.map((line, i) => (
              <div className={styles.Line} key={i} {...getLineProps({ line, key: i })}>
                <span className={styles.LineNo}>{i + 1}</span>
                <span className={styles.LineContent}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
}

export default MyEditor;
