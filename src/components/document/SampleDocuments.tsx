import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { token, userDetails } from '../../store';
import { useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
// import SelectBox from '../core/Select';

import './UploadDocument.css';
import Loader from '../common/Loader';

const SampleDocuments = () => {
  const BASE_URL = 'http://localhost:9003/';
  const userToken = useSelector(token);
  const [documents, setDocuments] = useState([]);
  const user = useSelector(userDetails);
  const [openSnakBar, setSnakBarOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [optionselect, setOptionselect] = useState('');
  const [option, setOption] = useState<any>({});
  const [inputfile, setInputfile] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [docTobeUpdate, setDocTobeUpdate] = useState<any>({});
  const [openUpdate, setUpdateDialogStatus] = useState(false);
  const [docTobeDeleted, setDocIdTobeDeleted] = useState<any>({});
  const [open, setDialogStatus] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchDocuments();
    fetchDocumentTypes();
  }, []);

  const fetchDocuments = () => {
    // const docs = [{"id":"doc001", "name":"Beekeeper.jpg" , "documentType":{"id":0,"name":"Sample Documents"}},
    // {"id":"doc002", "name":"Checklist.doc" , "documentType":{"id":0,"name":"Sample Documents"}}
    // ];
    // setDocuments(docs);
    // setLoader(false);

    axios
      .get(BASE_URL + 'files/sampledoc', {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((res) => {
        setDocuments(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const fetchDocumentTypes = () => {
    // const response = [{"id":0,"name":"Sample Documents"},{"id":1,"name":"Select"}];
    // setOptions([...response]);
    // setOption(response.filter(obj=> obj.id===0)[0]);

    axios
      .get(BASE_URL + 'document/sample', {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((res: any) => {
        setOptions([...res.data]);
        setOption(res.data.filter((obj: { id: number; }) => obj.id === 0)[0]);
        setOptionselect('0');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const optionChanged = (childData: React.SetStateAction<string>) => {
    setOptionselect(childData);
  };

  const fileUpload = () => {
    setInputfile(true);
  };

  const handleSnackClose = () => {
    setSnakBarOpen(false);
  };

  const openUpdateDialog = () => {
    const yy: any = document.getElementById('myfile');
    const updateFileName: any = yy.files[0].name;
    if (optionselect === '0') {
      const filteredObj = documents.filter(
        (obj: any) =>
          obj.documentType.id === parseInt(optionselect) &&
          obj.name === updateFileName
      );
      if (filteredObj && filteredObj.length > 0) {
        setDocTobeUpdate(filteredObj[0]);
        setUpdateDialogStatus(true);
      } else {
        callUploadAPI();
      }
    } else {
      const filteredObj = documents.filter(
        (obj: any) => obj.documentType.id === parseInt(optionselect)
      );
      if (filteredObj && filteredObj.length > 0) {
        setDocTobeUpdate(filteredObj[0]);
        setUpdateDialogStatus(true);
      } else {
        callUploadAPI();
      }
    }
  };

  const callUploadAPI = () => {
    var input: any = document.getElementById('myfile');
    const jsonData = {
      document_type: optionselect,
      employeeId: user.empId,
      role: user.role,
    };
    var formdata = new FormData();
    formdata.append('file', input.files[0], input.files[0].name);
    formdata.append('data', JSON.stringify(jsonData));
    // formdata.append("document_type", optionselect);
    // formdata.append("employeeId", user.empId);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    axios
      .post(BASE_URL + 'files', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + userToken
        },
      })
      .then((result) => {
        updateDialogClose();
        setSnakBarOpen(true);
        setUploadStatus(true);
        fetchDocuments();
        resetFields();
        console.log(result);
      })
      .catch((error) => {
        setSnakBarOpen(true);
        setUploadStatus(false);
        console.log('Error while uploading', error);
      });
  };

  const updateDialogClose = () => {
    setUpdateDialogStatus(false);
  };

  const resetFields = () => {
    const tt = document.getElementById('myfile') as any;
    tt.value = '';
    setOptionselect('0');
    setInputfile(false);
  };

  const download = (id: any, name: string) => {
    axios
      .get(BASE_URL + `files/${id}`, { headers: { Authorization: 'Bearer ' + userToken }, responseType: 'blob' })
      .then((result) => {
        //console.log(result);
        if (result) {
          const file = new Blob([result.data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          var a = document.createElement('a');
          a.href = fileURL;
          a.download = name;
          document.body.appendChild(a);
          a.click();
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const openDialog = (doc: any) => {
    setDocIdTobeDeleted(doc);
    setDialogStatus(true);
  };

  const handleClose = () => {
    setDialogStatus(false);
  };

  const deleteDocs = (id: any) => {
    const deleteUrl = `${BASE_URL}files/delete/${id}`;
    console.log("BASE_URL >>>> " + BASE_URL)
    axios
      .delete(deleteUrl, { headers: { Authorization: 'Bearer ' + userToken }, })
      .then((result) => {
        setDialogStatus(false);
        //console.log(result);
        fetchDocuments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="upload-doc-container">
      {(user.role === 'ROLE_ONBOARDING_MANAGER' ||
        user.role === 'ROLE_ONBOARDING_REVIEWER') && (
          <div>
            <h2>Upload Documents</h2>
            <div className="input-fieldbox">
              <div className="input-select">
                {' '}
                Document Type:&nbsp;
                {/* <SelectBox
                options={options}
                onOptionChanged={optionChanged}
                optionselect={optionselect}
              /> */}
                <label htmlFor="documenttype">
                  <input id="documenttype" name="documenttype" value={option.name} type="text" disabled={true} />
                </label>
              </div>{' '}
              &nbsp;
              <div className="file-upload-wrapper" data-text="Select your file!">
                <label htmlFor="myfile">
                  <input
                    className="input-field"
                    onChange={fileUpload}
                    id="myfile"
                    name="myfile"
                    type="file"
                  />
                </label>{' '}
                &nbsp;
                <Button
                  color="primary"
                  variant="contained"
                  component="span"
                  onClick={() => openUpdateDialog()}
                  disabled={!(optionselect !== '1' && inputfile)}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}
      <div className="button-content">
        <div className="content-left">
          <h3>Sample Documents:</h3>
        </div>
        {documents.length > 0 && (
          <div className="content-right">
            <div className="download-icon">
              <a
                href="http://localhost:9003/files/sampledoc/zip"
                className="fa fa-download"
                title="Download All"
              ></a>
            </div>
            {/* <h3>
        <a href="http://localhost:9003/files/sampledoc/zip" className="btn btn-primary">Download All</a>
      </h3> */}
          </div>
        )}
      </div>
      <div>
        {loader ? (
          <Loader />
        ) : documents.length > 0 ? (
          <div className="table-content">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Document Type</TableCell>
                    {user.role === 'ROLE_ONBOARDING_MANAGER' && (
                      <TableCell>Delete</TableCell>
                    )}
                    <TableCell>Download</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((doc: any, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {doc.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {doc.documentType.name}
                      </TableCell>
                      {user.role === 'ROLE_ONBOARDING_MANAGER' && (
                        <TableCell>
                          <Button
                            color="secondary"
                            onClick={() => openDialog(doc)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => download(doc.id, doc.name)}
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Typography>No Records Exist</Typography>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Are you sure you want to delete the document ${docTobeDeleted.name}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once deleted canot be reverted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => deleteDocs(docTobeDeleted.id)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openUpdate}
          onClose={updateDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`${docTobeUpdate.name} already exists. Do you want to replace it?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once updated canot be reverted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={updateDialogClose}>Cancel</Button>
            <Button onClick={() => callUploadAPI()} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          sx={{ height: '10%' }}
          open={openSnakBar}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity={uploadStatus ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {uploadStatus
              ? 'File uploaded successfully!'
              : 'File upload failed!'}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default SampleDocuments;
