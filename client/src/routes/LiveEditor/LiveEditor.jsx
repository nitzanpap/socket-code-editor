import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { useCallback, useEffect, useState } from 'react';
import { getCodeBlock, serverBaseUrl } from '../../api/crud';
import io from 'socket.io-client';
import usePageLeave from '../../hooks/usePageLeave';

// Connect to the socket server
export const socket = io(serverBaseUrl);
let userType = undefined;

// Indicate a successful connection
socket.on('Server Connect', (connectionInfo) => {
  userType = connectionInfo.type;
  console.log('Connected as:', userType);
});

// Emit new code to the socket server
function emitNewCodeToServer(newCode) {
  socket.emit('Code Change', newCode);
}

// Props for <Editor> component.
const minHeight = 50;
const padding = 10;
const language = 'javascript';

function LiveEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  usePageLeave();

  // Handle code change in editor.
  const onCodeChange = async (newCode) => {
    setCode(newCode);
    console.log('Code changed!');
    emitNewCodeToServer(newCode);
  };

  // Handle receiving new code.
  function receiveNewCode() {
    socket.on('Code Change', (newCode) => {
      console.log('New code received!');
      setCode(newCode);
    });
  }

  // Get initial code block from the db.
  useEffect(() => {
    async function fetchData() {
      const newCodeBlock = await getCodeBlock(id);
      setTitle(newCodeBlock[0].title);
      setCode(newCodeBlock[0].code);
      receiveNewCode();
    }
    fetchData();
  }, [id]);

  // Converts the code to a highlighted one.
  const highlight = (code) => (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={language}
      contentEditable={false}
    >
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
          readOnly={userType !== 'student'}
        />
      </div>
      {/* <HighlightedCode code={code} language={language} /> */}
    </section>
  );
}

export default LiveEditor;
