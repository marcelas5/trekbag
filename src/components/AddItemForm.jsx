import { useState } from "react";
import Button from "./Button";
import { useRef } from "react";

export default function AddItemForm({ onAddItem }) {
  const [itemText, setItemText] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent adding empty items
    if (!itemText) {
      alert("Please enter an item name");
      inputRef.current.focus();
      return;
    }

    onAddItem(itemText);
    setItemText("");
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an Item</h2>
      <input
        onChange={(e) => {
          setItemText(e.target.value);
        }}
        value={itemText}
        autoFocus // Focus the input field on initial render
        ref={inputRef}
      />
      <Button>Add to the list</Button>
    </form>
  );
}
