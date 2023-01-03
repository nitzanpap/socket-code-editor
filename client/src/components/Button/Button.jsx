import styles from './Button.module.scss';

function Button({ text, stylingClass, handleOnClick, disabled = false }) {
  return (
    <button
      className={`${styles.Button} ${styles[stylingClass]}`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
