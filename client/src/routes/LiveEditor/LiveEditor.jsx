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

  const onCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <section className={styles.LiveEditor}>
      <h1>Live Editor</h1>
      <h4>{name}</h4>
      <MyEditor code={exampleCode} language="javascript" onChange={useCallback(onCodeChange, [])} />
    </section>
  );
}

export default LiveEditor;
