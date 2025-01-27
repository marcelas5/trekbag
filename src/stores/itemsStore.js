import { create } from "zustand";
import { initialItems } from "../lib/constants";
import { persist } from "zustand/middleware";

export const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      addItem: (newItemText) => {
        const newItem = {
          id: new Date().getTime(),
          name: newItemText,
          packed: false,
        };
        set((state) => ({ items: [...state.items, newItem] }));
      },
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetItems: () => {
        set(() => ({ items: initialItems }));
      },
      markAllAsPacked: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: true })),
        }));
      },
      markAllAsNotPacked: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: false })),
        }));
      },

      toggleIndividualItem: (id) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, packed: !item.packed };
            }
            return item;
          }),
        }));
      },

      removeIndividualItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "items",
    }
  )
);
