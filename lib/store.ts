import { create } from "zustand"

type ViewMode = "cube" | "grid"

interface StoreState {
  viewMode: ViewMode
  toggleViewMode: () => void
}

export const useStore = create<StoreState>((set) => ({
  viewMode: "cube",
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === "cube" ? "grid" : "cube",
    })),
}))
