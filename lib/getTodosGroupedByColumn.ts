import { databases } from "@/appwrite";
export const getTodosGroupedByColumn = async () => {
  //   databases.createDocument(
  //     "64f73265d7654819be05",
  //     "64f7326e4adb98150b8c",
  //     "1",
  //     {
  //       title: "temp",
  //       statuss: "todo",
  //     }
  //   );
  const data = await databases.listDocuments(
    "64f73906c301e6035c4b",
    "64f7390c4df083033bd0"
  );

  const todos = data.documents;
  console.log(todos);
  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: todo.image }),
    });

    console.log(acc);
    return acc;
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
