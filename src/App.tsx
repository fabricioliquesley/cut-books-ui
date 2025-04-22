import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { BookFileTree } from "./components/BookFileTree";

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "books",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
      {
        id: "12",
        isSelectable: true,
        name: "services",
        children: [
          {
            id: "13",
            isSelectable: true,
            name: "utils.ts",
          },
          {
            id: "14",
            isSelectable: true,
            name: "utils.ts",
          },
          {
            id: "15",
            isSelectable: true,
            name: "utils.ts",
          },
          {
            id: "16",
            isSelectable: true,
            name: "utils.ts",
          },
          {
            id: "17",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];

export function App() {
  return (
    <div className="grid max-w-[720px] grid-cols-3 items-center gap-8">
      <form className="col-span-2 space-y-4">
        <Input placeholder="Filename" />
        <Input placeholder="Book" />
        <Input placeholder="Range" />
        <Button>Add chapter</Button>
      </form>
      <div>
        <BookFileTree elements={ELEMENTS} className="col-span-1" />
      </div>
    </div>
  );
}
