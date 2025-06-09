import { create } from "zustand"
import { Workspace } from "@/interfaces"

interface WorkspaceStore {
  selectedWorkspace: Workspace | null
  setSelectedWorkspace: (workspace: Workspace) => void
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  selectedWorkspace: null,
  setSelectedWorkspace: (workspace: Workspace) => set({ selectedWorkspace: workspace }),
}))
