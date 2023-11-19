import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { useCallback, useEffect, useState } from 'react';
import { getCodeBlock, serverBaseUrl } from '../../api/crud';
import io from 'socket.io-client';
import usePageLeave from '../../hooks/usePageLeave';
import { toast } from 'react-toastify';
import { notificationOptions } from '../../utils/helperFunctions';

// Connect to the socket server
export const socket = io(serverBaseUrl);
let userType = undefined;

// Indicate a successful connection
socket.on('Server Connect', (connectionInfo) => {
  userType = connectionInfo.type;
  toast(`You have connected as a ${connectionInfo.type}.`, notificationOptions);
});

// Notify a new user connection
socket.on('New User Connected', (type) => {
  toast(`A ${type} has connected.`, notificationOptions);
});
// Notify a user disconnection
socket.on('User Disconnected', (type) => {
  toast(`A ${type} has disconnected.`, notificationOptions);
});

// Emit new code to the socket server
function emitNewCodeToServer(newCode, codeBlockId) {
  socket.emit('Code Change', JSON.stringify({ newCode: newCode, codeBlockId: codeBlockId }));
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
    emitNewCodeToServer(newCode, id);
  };

  // Handle receiving new code.
  function receiveNewCode() {
    socket.on(`Code Change in ${id}`, (newCode) => {
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
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, lineIndex) => (
                <span key={lineIndex}{...getTokenProps({ token, lineIndex })} />
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
      <h3 className={styles.userType}>Hello, {userType[0].toUpperCase() + userType.slice(1)}</h3>
    </section>
  );
}

export default LiveEditor;
