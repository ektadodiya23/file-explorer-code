import {
  Box,
  Button,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import CreateFolder from "./CreateFolder";
import ImageDisplay from "./ImageDisplay";
import ParentChild from "./Parentchild";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import useFetchData from "../hook/useFetchData";
import { setJsonData, deleteFolder } from "../store/reducer/userReducer";
import { Ifolder } from "../data/Filedata";

export default function Home() {
  const [openNewFolder, setOpenNewFolder] = useState<boolean>(false);

  // display nested item data
  const folder = useSelector((state: RootState) => state.users.showList);

  // display folder name
  const selectedFolder = useSelector(
    (state: RootState) => state.users.selectedFolder
  );

  // array
  const jsonData = useSelector((state: RootState) => state.users.value);

  const { insertNode } = useFetchData();
  const dispatch = useDispatch();

  // dialog open-close
  const handleAddFolder = () => {
    setOpenNewFolder(!openNewFolder);
  };
  const handleClose = () => {
    setOpenNewFolder(false);
  };

  // add new file or folder in nested
  const handleInsertNode = (
    folderId: number,
    item: string,
    isFolder: boolean,
    size: number,
    type: string,
    lastModifiedDate : number
  ) => {
    const finalTree = insertNode(
      jsonData,
      folderId,
      item,
      isFolder,
      size,
      type,
      lastModifiedDate
    );
    dispatch(setJsonData({ data: finalTree, id: folderId }));
  };


  // delete folder
  const handleDeleteFolder = () =>{
      console.log("delete" , selectedFolder?.id); 
    if(selectedFolder){
        dispatch(deleteFolder(selectedFolder.id));
       }
   }



   const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
     <Tooltip {...props} classes={{ popper: className }} />
   ))(({ theme }) => ({
     [`& .${tooltipClasses.tooltip}`]: {
       backgroundColor: "#f5f5f9",
       color: "rgba(0, 0, 0, 0.87)",
       maxWidth: 220,
       fontSize: theme.typography.pxToRem(12),
       border: "1px solid #dadde9",
     },
   }));

   
  return (
    <>
      <Box maxWidth="xl" sx={{ marginLeft: "10%", marginTop: "2%" }}>
        <Box>
          <Button
            onClick={handleAddFolder}
            sx={{ marginRight: "1%" }}
            variant="outlined"
          >
            add folder
          </Button>
          <Button variant="outlined" onClick={handleDeleteFolder}>
            delete folder
          </Button>
        </Box>
        <Box
          sx={{ bgcolor: "#f5f5f5", height: "87vh", marginTop: "2%" }}
          className="app_container"
        >
          {/* folder */}
          <Box className="app_section">
            <Box sx={{ marginBottom: "7%" }}>FOLDER</Box>
            <ParentChild
              handleInsertNode={handleInsertNode}
              explorer={jsonData}
            />
          </Box>
          <hr />

          {/* file-details */}
          <Box className="app_section">
            FILE DETAILS AREA
            <Box sx={{ marginTop: "10%" }}>
              {!selectedFolder ? (
                <Typography className="folder_details">
                  No folder selected
                </Typography>
              ) : (
                <Box className="folder_display" sx={{ marginBottom: "3%" }}>
                  📁Folder-name : <span className="add_folder">{selectedFolder?.name}</span>
                </Box>
              )}

              <Box className="display_folder">
                {folder?.map((item) => {
                  if (item.isFolder && selectedFolder) {
                    return <Typography key={item.id}>📁{item.name}</Typography>;
                  } else {
                    return (
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit" variant="body2">
                              File name📄 : {item.name}
                            </Typography>
                            <Typography variant="subtitle2">
                              file size : {item.size}
                            </Typography>
                            <Typography variant="subtitle2">
                              file type : {item.type}
                            </Typography>
                            <Typography variant="subtitle2">
                              Lastmodified : {item.lastModifiedDate}
                            </Typography>
                          </React.Fragment>
                        }
                      >
                        <Typography  key={item.id}>📄{item.name}</Typography>
                      </HtmlTooltip>
                    );
                  }
                })}
              </Box>
            </Box>
          </Box>
          <hr />

          {/* file-upload-area */}
          <Box className="app_section">
            DROP AREA
            <ImageDisplay />
          </Box>
        </Box>
      </Box>
      <CreateFolder openDialog={openNewFolder} handleClose={handleClose} />
    </>
  );
}
