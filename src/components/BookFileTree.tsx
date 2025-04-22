import { BookRanges } from "@/App";
import {
  File,
  Folder,
  Tree,
  type TreeViewElement,
} from "@/components/magicui/file-tree";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

interface BookFileTreeProps {
  className?: string;
  elements: TreeViewElement[];
  bookRanges: BookRanges;
  onRemoveElement: (id: string, bookName: string) => void;
}

export function BookFileTree({
  className,
  elements,
  bookRanges,
  onRemoveElement,
}: BookFileTreeProps) {
  function getPageInterval(bookName: string, fileId: string): string {
    const bookIndex = bookRanges.findIndex(
      (bookRange) => !!bookRange[bookName],
    );
    const chapterIndex = bookRanges[bookIndex][bookName].findIndex(
      (chapter) => chapter.chapterId === fileId,
    );

    return bookRanges[bookIndex][bookName][chapterIndex].range;
  }

  return (
    <div
      className={cn(
        "bg-background relative flex h-[300px] flex-col items-center justify-center overflow-hidden rounded-lg border",
        className,
      )}
    >
      <Tree
        className="bg-background mb-[50px] overflow-hidden rounded-md p-2"
        initialExpandedItems={elements[0].children!.length > 0 ? ["1"] : [""]}
        elements={elements}
      >
        <Folder element="books" value="1" className="text-[18px]">
          {elements[0].children &&
            elements[0].children.map((book) => {
              return (
                <Folder
                  value={book.id}
                  element={book.name}
                  key={book.id}
                  className="text-[18px]"
                >
                  {book.children &&
                    book.children.map((file) => {
                      return (
                        <File
                          value={file.id}
                          className="group w-full text-[18px]"
                          key={file.id}
                        >
                          <p>
                            {file.name} [{getPageInterval(book.name, file.id)}]
                          </p>
                          <span
                            className="ml-auto hidden text-red-400 group-hover:block"
                            onClick={() => onRemoveElement(file.id, book.name)}
                          >
                            <Trash className="size-5" />
                          </span>
                        </File>
                      );
                    })}
                </Folder>
              );
            })}
        </Folder>
      </Tree>
    </div>
  );
}
