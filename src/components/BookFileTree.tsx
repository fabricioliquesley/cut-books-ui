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
}

export function BookFileTree({ className, elements }: BookFileTreeProps) {
  return (
    <div
      className={cn(
        "bg-background relative flex h-[300px] flex-col items-center justify-center overflow-hidden rounded-lg border",
        className,
      )}
    >
      <Tree
        className="bg-background overflow-hidden rounded-md p-2"
        initialExpandedItems={elements[0].children!.length > 0 ? ["1"] : [""]}
        elements={elements}
      >
        <Folder element="books" value="1">
          {elements[0].children &&
            elements[0].children.map((book) => {
              return (
                <Folder value={book.id} element={book.name} key={book.id}>
                  {book.children &&
                    book.children.map((file) => {
                      return (
                        <File
                          value={file.id}
                          className="group w-full"
                          key={file.id}
                        >
                          <p>{file.name}</p>
                          <span
                            className="ml-auto hidden text-red-400 group-hover:block"
                            onClick={() =>
                              console.log("remove element:", file.id)
                            }
                          >
                            <Trash className="h-3 w-3" />
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
