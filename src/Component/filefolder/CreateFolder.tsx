import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import  { Ifolder } from "../data/Filedata";
import { useSelector , useDispatch } from 'react-redux';
import { setJsonData } from "../store/reducer/userReducer";
import { RootState } from '../store/Store';
import useFetchData from '../hook/useFetchData';

type Dialogprops = {
  openDialog: boolean;
  handleClose: () => void;
 
};



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CreateFolder(props: Dialogprops) {
     const { openDialog, handleClose } = props;

     const dispatch = useDispatch();
      const selectedFolder = useSelector(
        (state: RootState) => state.users.selectedFolder
      );
    const { insertNode } = useFetchData();
    
      const data = useSelector((state: RootState) => state.users.value);
     const [addName , setAddName] = useState("");
     const uId = Math.floor(Math.random() * 1000000 + 1);

        
         
const handleSubmit = (e: any) => {
  e.preventDefault();
 const newFolder: Ifolder = {
   id: new Date().getTime(),
   name: addName,
   isFolder: true,
   items: [],
   isOpen: true,
   size: 0,
   type: '',
   lastModifiedDate: new Date().getTime()
 };
  const newData: Ifolder[] = [...data, newFolder];
  dispatch(setJsonData({ data: newData, id: newFolder.id }));
  setAddName("");
  handleClose();
};



  return (
    <Box>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add New Folder</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ marginTop: "-10%" }}>
            <DialogContentText id="alert-dialog-slide-description">
              <FormControl>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="📁name"
                  type="text"
                  fullWidth
                  variant="standard"
                  name=" name"
                  value={addName}
                  onChange={(e: any) => setAddName(e.target.value)}
                />
              </FormControl>
            </DialogContentText>
            <Button
              sx={{ marginTop: "5%", marginRight: "8%" }}
              type="submit"
              variant="outlined"
            >
              Add
            </Button>
            <Button
              sx={{ marginTop: "5%" }}
              variant="outlined"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogContent>
        </form>
      </Dialog>
    </Box>
  );
}



 //  const data: any = {
        //     id: new Date().getTime(),
        //     name: addName,
        //     isFolder: true,
        //     items: [],
        //   };

        //   dispatch(addFile(data));