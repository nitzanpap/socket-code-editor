// import Editor from 'react-simple-code-editor';
// import { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './MyEditor.module.scss';

function MyEditor({ code, language, onChange }) {
  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div className={styles.MyEditor}>
          <pre className={styles.Pre} id="editable" contentEditable>
            {tokens.map((line, i) => (
              <div className={styles.Line} key={i} {...getLineProps({ line, key: i })}>
                <span className={styles.LineNo}>{i + 1}</span>
                <span className={styles.LineContent}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                  {console.log(line, i)}
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
