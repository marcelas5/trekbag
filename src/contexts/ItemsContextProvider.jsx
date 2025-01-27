import { createContext, useEffect, useState } from "react";
import { initialItems } from "../lib/constants";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items") || initialItems)
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetItems = () => {
    setItems(initialItems);
  };

  const handleMarkAllAsPacked = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, packed: true }))
    );
  };

  const handleMarkAllAsNotPacked = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, packed: false }))
    );
  };

  const handleToggleIndividualItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  };

  const handleRemoveIndividualItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleRemoveAllItems,
        handleResetItems,
        handleMarkAllAsPacked,
        handleMarkAllAsNotPacked,
        handleToggleIndividualItem,
        handleRemoveIndividualItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
