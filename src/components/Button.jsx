export default function Button({ buttonType, children, onClick }) {
  return (
    <button
      className={`${buttonType === "secondary" ? "btn btn--secondary" : "btn"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
