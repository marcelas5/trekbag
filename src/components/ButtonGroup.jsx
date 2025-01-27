import Button from "./Button";
import { useItemsStore } from "../stores/itemsStore";

export default function ButtonGroup() {
  const markAllAsNotPacked = useItemsStore((state) => state.markAllAsNotPacked);
  const markAllAsPacked = useItemsStore((state) => state.markAllAsPacked);
  const removeAllItems = useItemsStore((state) => state.removeAllItems);
  const resetItems = useItemsStore((state) => state.resetItems);

  const secondaryButtons = [
    {
      text: "Mark all as complete",
      onClick: markAllAsPacked,
    },
    {
      text: "Mark all as incomplete",
      onClick: markAllAsNotPacked,
    },
    {
      text: "Reset to initial",
      onClick: resetItems,
    },
    {
      text: "Remove all items",
      onClick: removeAllItems,
    },
  ];

  return (
    <section className="button-group">
      {secondaryButtons.map(({ text, onClick }) => (
        <Button
          key={text + onClick.toString()}
          buttonType="secondary"
          onClick={onClick}
        >
          {text}
        </Button>
      ))}
    </section>
  );
}
