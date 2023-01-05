import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import MyEditor from '../../components/MyEditor/MyEditor';
import { useCallback, useEffect, useState } from 'react';
import { getCodeBlock } from '../../api/crud';

const exampleCode = `console.log('Hello World!');`.trim();
  
const minHeight = 50;
const padding = 10;

function LiveEditor() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(exampleCode);

  const onCodeChange = async (newCode) => {
    setCode(await getCodeBlock(id));
  };

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
        <MyEditor
          code={exampleCode}
          language="javascript"
          onChange={useCallback(onCodeChange, [id])}
          minHeight={`${minHeight - padding / 4}vh`}
          padding={padding}
        />
      </div>
    </section>
  );
}

export default LiveEditor;
