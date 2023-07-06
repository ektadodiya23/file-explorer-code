import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import explorer, { Ifolder } from "../../data/Filedata";
import { RootState } from "../Store";
import { fileAddToState } from "../../filefolder/ImageDisplay";

export interface Iuserdata {
  value: Ifolder[];
  selectedFolder: Ifolder | null;
  showList: Ifolder[] | null;
  uploadedFiles: fileAddToState | null;
}

const initialState: Iuserdata = {
  value: explorer,
  selectedFolder: null,
  showList: null,
  uploadedFiles: null,
};

const findNestedFolder = (value: Ifolder[], folderId: number): Ifolder[] => {
  for (let i = 0; i < value.length; i++) {
    const item = value[i];

    if (item.id === folderId) {
      // Found the item with the matching ID
      return item.items;
    }

    if (item.items && item.items.length > 0) {
      // Recursively search within the items
      const result = findNestedFolder(item.items, folderId);
      if (result.length > 0) {
        return result;
      }
    }
  }

  // Item not found
  return [];
  // return null;
};

const removeItems = (value: Ifolder[], folderId: number) => {
  return value.filter((folder) => {
    // match folderId
    if (folder.id === folderId) {
      return false;
    }
    if (folder.items.length > 0) {
      folder.items = removeItems(folder.items, folderId);
    }
    return true;
  });
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    // display data
    displayFolder: (state, action) => {
      const folderId = action.payload.id;
      state.selectedFolder = action.payload.folder;
      state.showList = findNestedFolder(state.value, folderId);
    },

    //  add new data
    setJsonData: (
      state: any,
      action: PayloadAction<{ data: Ifolder[]; id: number }>
    ) => {
      state.value = action.payload.data;
      const folderId = action.payload.id;
      state.showList = findNestedFolder(state.value, folderId);
    },

    // delete selected folder
    deleteFolder: (state, action: PayloadAction<number>) => {
      const folderId = action.payload;
      state.value = removeItems(state.value, folderId);
    },

    // set=image
    uploadFolderList: (state, action: PayloadAction<File>) => {
      if (!state.uploadedFiles) {
        let uploadFile = {
          id: new Date().getTime(),
          files: [action.payload],
        };
        state.uploadedFiles = {...uploadFile}
      } else {
        state.uploadedFiles.files = [
          ...state.uploadedFiles.files,
          action.payload,
        ];
      }
    },

    removeFile: (state) => {
      state.uploadedFiles = null;
    },
  },
});

export const selectSelectedFolder = (state: RootState) => state.users.value;
export default userReducer.reducer;
export const {
  displayFolder,
  setJsonData,
  deleteFolder,
  uploadFolderList,
  removeFile,
} = userReducer.actions;
