import Select from "react-select";
import EmptyView from "./EmptyView";
import { useMemo, useState } from "react";
import { useItemsStore } from "../stores/itemsStore";
import { use } from "react";

const sortingOptions = [
  { label: "Sort by default", value: "default" },
  { label: "Sort by packed", value: "packed" },
  { label: "Sort by unpacked", value: "unpacked" },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState("default");
  const items = useItemsStore((state) => state.items);
  const toggleIndividualItem = useItemsStore(
    (state) => state.toggleIndividualItem
  );
  const removeIndividualItem = useItemsStore(
    (state) => state.removeIndividualItem
  );

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          return b.packed - a.packed;
        }
        if (sortBy === "unpacked") {
          return a.packed - b.packed;
        }
        return;
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length === 0 ? <EmptyView /> : null}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={(option) => setSortBy(option.value)}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      ) : null}
      {sortedItems.map((item) => {
        return (
          <li key={item.name} className="item">
            <label>
              <input
                onChange={() => {
                  toggleIndividualItem(item.id);
                }}
                checked={item.packed}
                type="checkbox"
              />{" "}
              {item.name}
            </label>
            <button
              onClick={() => {
                removeIndividualItem(item.id);
              }}
            >
              ❌
            </button>
          </li>
        );
      })}
    </ul>
  );
}
