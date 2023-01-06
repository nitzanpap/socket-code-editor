import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { useCallback, useEffect, useState } from 'react';
import { getCodeBlock } from '../../api/crud';
import { emitNewCodeToServer, socket } from '../../api/socketHandler';

const exampleCode = `console.log('Hello World!');`.trim();

const minHeight = 50;
const padding = 10;
const language = 'javascript';

function LiveEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(exampleCode);

  // Handle receiving new code.
  function receiveNewCode() {
    socket.on('Code Change', (newCode) => {
      console.log('New code received!');
      setCode(newCode);
    });
  }

  const onCodeChange = async (newCode) => {
    setCode(newCode);
    console.log('Code changed!');
    emitNewCodeToServer(newCode);
  };

  useEffect(() => {
    async function fetchData() {
      // Get initial code block from the db.
      const newCodeBlock = await getCodeBlock(id);
      setTitle(newCodeBlock[0].title);
      setCode(newCodeBlock[0].code);
      receiveNewCode();
    }
    fetchData();
  }, [id]);

  // Converts the code to a highlighted one.
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
