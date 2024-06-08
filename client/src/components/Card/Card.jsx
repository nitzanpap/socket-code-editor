import styles from "./Card.module.scss";

function Card(props) {
  return (
    <div
      className={`${styles.Card} ${props.dark ? styles.dark : ""}`}
      style={props.styling}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export default Card;
