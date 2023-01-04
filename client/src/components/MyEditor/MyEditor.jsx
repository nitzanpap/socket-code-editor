// import Editor from 'react-simple-code-editor';
// import { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './MyEditor.module.scss';

const exampleCode = `
const baseValue = prompt('Enter the base of a triangle: ');
const heightValue = prompt('Enter the height of a triangle: ');

// calculate the area
const areaValue = (baseValue * heightValue) / 2;

console.log(
  \`The area of the triangle is \${areaValue}\`
);
`.trim();

function MyEditor() {
  return (
    <Highlight {...defaultProps} theme={theme} code={exampleCode} language="javascript">
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
