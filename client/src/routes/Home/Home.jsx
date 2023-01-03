import styles from './Home.module.scss';
import Button from '../../components/Button/Button';
import { getServer } from '../../api/crud';

function Home() {
  return (
    <section className={styles.Home}>
      <p>This is the Home page!</p>
      <Button
        text="Click to fetch"
        handleOnClick={() => {
          console.log('Hello');
          getServer();
        }}
      ></Button>
    </section>
  );
}

export default Home;
