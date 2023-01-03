import styles from './Card.module.scss';

function Card(props) {
  return (
    <div className={`${styles.Card} ${props.dark ? styles.dark : ''}`} style={props.styling}>
      {props.children}
    </div>
  );
}

export default Card;
