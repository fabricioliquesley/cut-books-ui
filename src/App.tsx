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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Elements = {
  id: string;
  isSelectable: boolean;
  name: string;
  children: {
    id: string;
    isSelectable: boolean;
    name: string;
    children: {
      id: string;
      isSelectable: boolean;
      name: string;
    }[];
  }[];
}[];

type BookRange = Record<
  string,
  {
    chapterId: string;
    range: string;
  }[]
>;

type BookRanges = BookRange[];

const FormSchema = z.object({
  book: z.string(),
  range: z.string(),
});

export function App() {
  const { handleSubmit, register } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [elements, setElements] = useState<Elements>([
    {
      id: "1",
      isSelectable: true,
      name: "books",
      children: [],
    },
  ]);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [bookRange, setBookRange] = useState<BookRanges>([]);

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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const chapterId = String(Date.now());

    setElements((prev) => {
      const newElements = JSON.parse(JSON.stringify(prev)) as Elements;
      const newBook = {
        id: String(Date.now()),
        name: data.book,
        isSelectable: true,
      };
      const newChapter = {
        id: chapterId,
        name: "Chapter_1.pdf",
        isSelectable: true,
      };

      if (newElements[0].children.length === 0) {
        newElements[0].children.push({
          ...newBook,
          children: [newChapter],
        });
      } else {
        const existingBookIndex = newElements[0].children.findIndex(
          (book) => book.name === data.book,
        );

        if (existingBookIndex === -1) {
          newElements[0].children.push({
            ...newBook,
            children: [newChapter],
          });
        } else {
          const book = newElements[0].children[existingBookIndex];
          const chapterNum = book.children.length + 1;

          book.children.push({
            ...newChapter,
            name: `Chapter_${chapterNum}.pdf`,
          });
        }
      }

      return newElements;
    });

    setBookRange((prev) => {
      const newBookRanges = JSON.parse(JSON.stringify(prev)) as BookRanges;

      const bookRangeIndex = newBookRanges.findIndex(
        (bookRange) => !!bookRange[data.book],
      );

      if (newBookRanges.length === 0 || bookRangeIndex === -1) {
        newBookRanges.push({
          [data.book]: [
            {
              chapterId,
              range: data.range,
            },
          ],
        });
      } else {
        const bookRange = newBookRanges[bookRangeIndex];

        bookRange[data.book].push({
          chapterId,
          range: data.range,
        });
      }

      return newBookRanges;
    });
  };

  const handleRemoveChapter = (id: string) => {
    console.log("Remove element", id);
  };

  if (!isSelectedFile) {
    return <DropArea onChange={handleFileChange} />;
  }

  return (
    <div className="grid max-w-[800px] grid-cols-4 items-center gap-8">
      {/* <pre className="absolute top-0 bg-neutral-600 text-white">
        {JSON.stringify(bookRange, null, 2)}
      </pre> */}
      <form onSubmit={handleSubmit(onSubmit)} className="col-span-2 space-y-4">
        <Input {...register("book")} placeholder="Book" />
        <Input {...register("range")} placeholder="Range" />
        <Button>Add chapter</Button>
      </form>
      <div className="relative col-span-2">
        <h2 className="text-center text-2xl text-sky-600">{file?.name}</h2>
        <BookFileTree
          elements={elements}
          onRemoveElement={handleRemoveChapter}
        />
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
