import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import MyEditor from '../../components/MyEditor/MyEditor';
import { useCallback, useState } from 'react';
import { getCodeBlock } from '../../api/crud';

const exampleCode = `console.log('Hello World!');`.trim();

function LiveEditor() {
  const { id } = useParams();
  console.log(id);
  console.log(getCodeBlock(id));
  const [code, setCode] = useState(exampleCode);
  const minHeight = 50;
  const padding = 10;

  const onCodeChange = async (newCode) => {
    setCode(await getCodeBlock(id));
  };

  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <h4>{`${id}`}</h4>
      <div className={styles.EditorContainer} style={{ height: `${minHeight}vh` }}>
        <MyEditor
          code={exampleCode}
          language="javascript"
          onChange={useCallback(onCodeChange, [])}
          minHeight={`${minHeight - padding / 4}vh`}
          padding={padding}
        />
      </div>
    </section>
  );
}

export default LiveEditor;
