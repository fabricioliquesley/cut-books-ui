import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { BookFileTree } from "./components/BookFileTree";
import { ChangeEvent, useState } from "react";
import { DropArea } from "./components/DropArea";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

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
  const [elements, setElements] = useState([
    {
      id: "1",
      isSelectable: true,
      name: "books",
      children: [],
    },
  ]);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;

    if (!selectedFile) {
      return toast.warning("Select a file");
    }

    if (selectedFile[0].type !== "application/pdf") {
      return toast.error("Only pdf files can be selected");
    }

    setFile(selectedFile[0]);
    setIsSelectedFile(true);
  };

  if (!isSelectedFile) {
    return <DropArea onChange={handleFileChange} />;
  }

  return (
    <div className="grid max-w-[800px] grid-cols-4 items-center gap-8">
      <form className="col-span-2 space-y-4">
        <Input placeholder="Book" />
        <Input placeholder="Range" />
        <Button>Add chapter</Button>
      </form>
      <div className="relative col-span-2">
        <h2 className="text-center text-2xl text-sky-600">{file?.name}</h2>
        <BookFileTree elements={ELEMENTS} />
        <Button className="hover: absolute bottom-2 ml-[2.5%] w-[95%] bg-sky-800 text-neutral-100">
          Cut Book
        </Button>
      </div>
      <div className="absolute right-10 bottom-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropArea onChange={handleFileChange} variant="icon" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="rounded-lg bg-neutral-700 p-2">
                Change selected file
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
