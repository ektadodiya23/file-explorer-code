import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Ifolder } from "../data/Filedata";
import FolderIcon from "@mui/icons-material/Folder";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFile,
  displayFolder,
  
} from "../store/reducer/userReducer";
import { RootState } from "../store/Store";
import useFetchData from "../hook/useFetchData";

type Idata = {
  explorer: Ifolder[];
  handleInsertNode: (folderId: number, item: any, isFolder: any , size : number , type:string , lastModifiedDate:number) => void;
};

export default function ParentChild(props: Idata) {
  const { explorer, handleInsertNode } = props;

  const [show, setShow] = useState<any>(false);
  const [selected, setSelected] = useState<any>(0);
  const [showInput, setShowInput] = useState<any>({
    visible: false,
    isFolder: false,
  });

  const dispatch = useDispatch();

  const handleClickShow = (folder: Ifolder) => {
    dispatch(removeFile());
    if (folder.id === selected && folder.isOpen) {
      setShow(!show);
    } else {
      setSelected(folder.id);
      setShow(true);
      dispatch(displayFolder({ folder: folder, id: folder.id }));
    }
  };

  const handleNewFolder = (e: any, isFolder: boolean) => {
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e: any) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(selected, e.target.value, showInput.isFolder, selected.size, selected.type, selected.lastModifiedDate);
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <Box>
      {explorer.map((folder) => {
        if (folder.isFolder) {
          return (
            <div key={folder.id}>
              <Box>
                <div
                  className={
                    selected === folder.id ? "selected_item" : "folder_style"
                  }
                  onClick={() => handleClickShow(folder)}
                >
                  📁
                  {folder.name}
                  <Box>
                    <Button
                      type="submit"
                      onClick={(e) => handleNewFolder(e, true)}
                    >
                      Folder +
                    </Button>
                    <Button onClick={(e) => handleNewFolder(e, false)}>
                      File +
                    </Button>
                  </Box>
                </div>
              </Box>

              {show && selected === folder.id && (
                <div>
                  {showInput.visible && (
                    <div className="inputContainer">
                      <span>{showInput.isFolder ? "📁" : "📄"}</span>
                      <input
                        name="name"
                        type="text"
                        className="inputContainer__input"
                        autoFocus
                        onKeyDown={onAddFolder}
                        onBlur={() =>
                          setShowInput({ ...showInput, visible: false })
                        }
                      />
                    </div>
                  )}
                  {folder.isOpen && (
                    <div style={{ paddingLeft: "3%" }}>
                      <ParentChild
                        key={folder.id}
                        handleInsertNode={handleInsertNode}
                        explorer={folder.items}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        } else {
          return (
            <span className="file" key={folder?.id}>
              📄{folder.name}
            </span>
          );
        }
      })}
    </Box>
  );
}
