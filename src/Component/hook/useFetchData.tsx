import { Ifolder } from "../data/Filedata";

const useFetchData = () => {
  function insertNode(
    tree: Ifolder[],
    folderId: number,
    item: string,
    isFolder: boolean,
    size: number,
    type: string,
    lastModifiedDate: number
  ): Ifolder[] {
    const traverseTree = (folders: Ifolder[]): Ifolder[] => {
      return folders.map((folder) => {
        if (folder.id === folderId && folder.isFolder) {
          const newItem = {
            id: new Date().getTime(),
            name: item,
            isFolder,
            items: [],
            isOpen: true,
            size,
            type,
            lastModifiedDate,
          };
          return {
            ...folder,
            items: [...folder.items, newItem],
          };
        } else if (folder.items && folder.items.length > 0) {
          const updatedItems = traverseTree(folder.items);
          if (updatedItems) {
            return {
              ...folder,
              items: updatedItems,
            };
          }
        }
        return folder;
      });
    };
    return traverseTree(tree);
  }

  return {
    insertNode,
  };
};

export default useFetchData;
