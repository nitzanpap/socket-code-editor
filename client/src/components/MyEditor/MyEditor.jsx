import React, { Fragment, useCallback, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './MyEditor.module.scss';

// TODO: Refactor component and remove redundant code that is meant to be in the parent component
const exampleCode = `async function getData() {
  try {
    const response = await fetch('https://api.example.com/endpoint');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

getData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

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
