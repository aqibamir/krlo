import { databases } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";
interface BoradState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
}
export const useBoardStore = create<BoradState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      "64f73906c301e6035c4b",
      "64f7390c4df083033bd0",
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
}));
