import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import './UploadDocument.css';
import SelectBox from '../core/Select';
import { token, userDetails } from '../../store';
import { useSelector } from 'react-redux';
import DocumentTable from './DocumentTable';
import Loader from '../common/Loader';

const UploadDocument = () => {
  const BASE_URL = 'http://localhost:9003/';
  const userToken = useSelector(token);
  const location = useLocation();
  console.log("location >>>> "+JSON.stringify(location))
  const { forAssociate } = location.state;
  const [documents, setDocuments] = useState([]);
  const [openSnakBar, setSnakBarOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionselect, setOptionselect] = useState('');
  const [inputfile, setInputfile] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [docTobeUpdate, setDocTobeUpdate] = useState({});
  const [docTypeTobeUpdate, setDocTypeTobeUpdate] = useState({});
  const [updatePopupMessage, setUpdatePopupMessage] = useState('');
  const [isDocTypePopup, setIsDocTypePopup] = useState(false);
  const [openUpdate, setUpdateDialogStatus] = useState(false);
  const user = useSelector(userDetails);
  const [revieweddocuments, setReviewedDocuments] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [associateObj, setAssociate] = useState({
  //   name: 'astik', role: 'ROLE_ASSOCIATE', reviewer: {empId: 'reviewer1', reviewerName: 'Arindam'},
  //   manager: {empId: 'manager1', managerName: 'Arindam'}, empId: '000U2M747'
  // });

  const childRefReviewed = useRef(null);
  const childRefNonReviewed = useRef(null);

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const callUploadAPI = () => {
    var input = document.getElementById('myfile');
    //console.log("inputFileElement.value", input.files[0]);

    const jsonData = {
      document_type: optionselect,
      employeeId:
        user.role === 'ROLE_ASSOCIATE' ? user.empId : forAssociate.empId,
      role: user.role,
      reviewerId: user.role === 'ROLE_ASSOCIATE' ? '' : user.empId,
    };
    var formdata = new FormData();
    formdata.append('file', input.files[0], input.files[0].name);
    formdata.append('data', JSON.stringify(jsonData));
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    const uploadUrl = `${BASE_URL}files`;
    axios
      .post(uploadUrl, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':'Bearer '+userToken
        },
      })
      .then((result) => {
        updateDialogClose();
        setSnakBarOpen(true);
        setUploadStatus(true);
        if (user.role === 'ROLE_ASSOCIATE') {
          childRefNonReviewed.current.fetchChildDocuments();
        } else {
          childRefReviewed.current.fetchChildDocuments();
        }
        resetFields();
        //console.log(result);
      })
      .catch((error) => {
        setSnakBarOpen(true);
        setUploadStatus(false);
        console.log('Error while uploading', error);
      });
  };

  const fileUpload = (event) => {
    //let changedFile = event.target.files[0];
    let uploadedFiles = event.target.files;
    setInputfile(true);
  };

  const handleSnackClose = () => {
    setSnakBarOpen(false);
  };

  const fetchDocumentTypes = () => {
    const role = user.role;
    console.log("role >>>>> "+role);
    axios
      .get(BASE_URL+'document',{headers: { Authorization: 'Bearer ' + userToken }})
      .then((res) => {
        console.log("res >>>>> "+JSON.stringify(res));
        setOptions([...res.data]);
        setOptionselect('1');
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const optionChanged = (childData) => {
    setOptionselect(childData);
  };

  const resetFields = () => {
    document.getElementById('myfile').value = '';
    setOptionselect('1');
    setInputfile(false);
  };

  const openUpdateDialog = () => {
    const updateFileName = document.getElementById('myfile').files[0].name;
    //var filteredObj = [];
    var isPopupDisplay = false;
    if (user.role === 'ROLE_ASSOCIATE') {
      isPopupDisplay = validateUploadFile(documents, updateFileName);
    } else {
      isPopupDisplay = validateUploadFile(revieweddocuments, updateFileName);
    }

    if(isPopupDisplay) {
      //console.log(filteredObj[0])
      //setDocTobeUpdate(filteredObj[0]);
      //setDocTypeTobeUpdate(filteredObj[0].documentType.name);
      setUpdateDialogStatus(true);
    } else {
      callUploadAPI();
    }
  };

  const validateUploadFile = (documentList, updateFileName) => {
    var filteredObj = [];
    const fileName = updateFileName.substring(0, updateFileName.lastIndexOf("."));
    filteredObj = documentList.filter(obj => (obj.documentType.id===parseInt(optionselect)));
    if(filteredObj && filteredObj.length>0) {
      //var filteredObj1 = documentList.filter(obj => (obj.documentType.id===parseInt(optionselect) && obj.name===updateFileName));
      var filteredObj1 = documentList.filter(obj => (obj.documentType.id===parseInt(optionselect) && obj.name.substring(0, obj.name.lastIndexOf(".")) === fileName));
      if(filteredObj1 && filteredObj1.length>0) {
        return setIsPopupDisplay(filteredObj1[0], true);
      } else {
        filteredObj1 = documentList.filter(obj => (obj.name.substring(0, obj.name.lastIndexOf(".")) === fileName));
        if(filteredObj1 && filteredObj1.length>0) {
          return setIsPopupDisplay(filteredObj1[0], false);
        } else {
          return setIsPopupDisplay(filteredObj[0], true);
        }
      }
    } else {
      //filteredObj = documentList.filter(obj => (obj.name===updateFileName));
      filteredObj = documentList.filter(obj => (obj.name.substring(0, obj.name.lastIndexOf(".")) === fileName));
      if(filteredObj && filteredObj.length>0) {
        return setIsPopupDisplay(filteredObj[0], false);
      }
    }
  }

  const setIsPopupDisplay = (fileObj, isDocTypePopup) => {
    if(isDocTypePopup){
      //setUpdatePopupMessage(fileObj.name+" of type "+fileObj.documentType.name+" already exists. Do you want to replace it?");
      setUpdatePopupMessage(fileObj.documentType.name+" type document already exists. Do you want to replace it?");
      setIsDocTypePopup(isDocTypePopup);
    } else {
      //setUpdatePopupMessage(fileObj.name+" of type "+fileObj.documentType.name+" already exists. Please select a different file.");
      setUpdatePopupMessage("Document with this name already exists.");
      setIsDocTypePopup(isDocTypePopup);
    }
    return true;
  }

  const updateDialogClose = () => {
    setUpdateDialogStatus(false);
  };

  const syncDocuments = (documents) => {
    if (documents.documents) {
      setDocuments(documents.documents);
    } else {
      setReviewedDocuments(documents.revieweddocuments);
      setIsReviewed(documents.isReviewed);
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <div className="upload-doc-container">
      <h2>Upload Documents</h2>
      <div className="input-fieldbox">
        <div className="input-select">
          {' '}
          Document Type:&nbsp;
          <SelectBox
            options={options}
            onOptionChanged={optionChanged}
            optionselect={optionselect}
          />
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
            disabled={!(optionselect !== '1' && inputfile) || isReviewed}
          >
            Upload
          </Button>
        </div>
      </div>
      <DocumentTable
        forAssociate={forAssociate}
        onSyncDocuments={syncDocuments}
        ref={childRefNonReviewed}
        type="NOTREVIEWED"
        title="Documents:"
        fetchDocumentURL="http://localhost:9003/files/employee"
      />

      {user.role !== 'ROLE_ASSOCIATE' && (
        <DocumentTable
          forAssociate={forAssociate}
          options={options}
          onSyncDocuments={syncDocuments}
          ref={childRefReviewed}
          type="REVIEWED"
          title="Reviewed Documents:"
          fetchDocumentURL="http://localhost:9003/files/reviewer"
        />
      )}

      <Dialog
        open={openUpdate}
        onClose={updateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {`${docTobeUpdate.name} of type ${docTypeTobeUpdate} already exists. Do you want to replace it?`} */}
          { `${updatePopupMessage}`}
        </DialogTitle>
        <DialogContent>
          {(isDocTypePopup) && 
            <DialogContentText id="alert-dialog-description">
              Once updated canot be reverted.
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={updateDialogClose}>Cancel</Button>
          {(isDocTypePopup) && 
          <Button onClick={() => callUploadAPI()} autoFocus>
            Yes
          </Button>
          }
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
          {uploadStatus ? 'File uploaded successfully!' : 'File upload failed!'}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default UploadDocument;
