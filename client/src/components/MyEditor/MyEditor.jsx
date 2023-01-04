import React, { Fragment, useCallback, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styles from './MyEditor.module.scss';

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

const styles1 = {
  root: {
    boxSizing: 'border-box',
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    ...theme.plain,
  },
};

const MyEditor = ({ language }) => {
  const [code, setCode] = useState(exampleCode);

  const onValueChange = (newCode) => {
    setCode(newCode);
  };

  const highlight = (code) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  return (
    <Editor
      value={code}
      onValueChange={useCallback(onValueChange, [])}
      highlight={useCallback(highlight, [language])}
      padding={10}
      style={styles1.root}
      className={styles.MyEditor}
    />
  );
};

export default MyEditor;
