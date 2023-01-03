import styles from './Card.module.scss';

function Card(props) {
  return (
    <div className={`${styles.Card}`} style={props.styling}>
      {props.children}
    </div>
  );
}

export default Card;
