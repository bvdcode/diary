import "./CardButton.css";

function CardButton({ children, className }) {
  const classes = `card-button ${className ?? ""}`;
  return (
    <button className={classes}>
      {className ?? "[no class]"}
      {children}
    </button>
  );
}

export default CardButton;
