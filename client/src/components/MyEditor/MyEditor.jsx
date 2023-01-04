import React, { Fragment, useCallback, useState } from 'react';
import Editor from 'react-simple-code-editor';
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
console.log("Hello");
console.log("Hello");
`.trim();

const MyEditor = ({ language, minHeight, padding }) => {
  const [code, setCode] = useState(exampleCode);

  const onValueChange = (newCode) => {
    setCode(newCode);
  };

  const highlight = (code) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div style={{ minHeight: minHeight }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  );

  return (
    <Editor
      value={code}
      onValueChange={useCallback(onValueChange, [])}
      highlight={useCallback(highlight, [language, minHeight])}
      padding={padding}
      style={{ ...theme.plain }}
      className={styles.MyEditor}
    />
  );
};

export default MyEditor;
