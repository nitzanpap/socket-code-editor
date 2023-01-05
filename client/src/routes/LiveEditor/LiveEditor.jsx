import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { useCallback, useEffect, useState } from 'react';
import { getCodeBlock } from '../../api/crud';

const exampleCode = `console.log('Hello World!');`.trim();

const minHeight = 50;
const padding = 10;
const language = 'javascript';

function LiveEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(exampleCode);

  const onCodeChange = async (newCode) => {
    // TODO: Replace with socket call.
    setCode(newCode);
    console.log('Code changed!');
  };

  const highlight = (code) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div style={{ minHeight: `${minHeight - padding / 4}vh` }}>
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

  useEffect(() => {
    async function fetchData() {
      const newCodeBlock = await getCodeBlock(id);
      setTitle(newCodeBlock[0].title);
      setCode(newCodeBlock[0].code);
    }
    fetchData();
  }, [id]);

  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <h4>{`${title}`}</h4>
      <div className={styles.EditorContainer} style={{ height: `${minHeight}vh` }}>
        <Editor
          onValueChange={useCallback(onCodeChange, [])}
          padding={padding}
          value={code}
          highlight={useCallback(highlight, [])}
          style={{ ...theme.plain }}
          className={styles.Editor}
        />
      </div>
    </section>
  );
}

export default LiveEditor;
