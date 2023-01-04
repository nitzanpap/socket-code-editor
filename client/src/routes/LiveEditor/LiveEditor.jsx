import { useParams } from 'react-router-dom';
import styles from './LiveEditor.module.scss';
import MyEditor from '../../components/MyEditor/MyEditor';
import { useCallback, useState } from 'react';

const exampleCode = `
const baseValue = prompt('Enter the base of a triangle: ');
const heightValue = prompt('Enter the height of a triangle: ');

// calculate the area
const areaValue = (baseValue * heightValue) / 2;

console.log(
  \`The area of the triangle is \${areaValue}\`
);
`.trim();

function LiveEditor() {
  const { name } = useParams();
  const [code, setCode] = useState(exampleCode);
  const minHeight = 50;
  const padding = 10;

  const onCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <h4>{name}</h4>
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
