import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
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
import { FilterUploadDocumentValidationSchema } from './FilterUploadDocument.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { error } from 'console';
import { InputText } from '../core/InputText/InputText';
import NewSelectBox from '../core/NewSelect';
import { UIConstants } from '../constants/UIConstants';
import { Dropdown } from '../core/Dropdown/Dropdown';
import { FlexRow } from '../common/Application.style';
import { mapAPItoUIDocTypeDropdown } from '../../transformation/reponseMapper';

const UploadDocumentSection = () => {
  const BASE_URL = 'http://localhost:9003/';
  const userToken = useSelector(token);
  const location = useLocation();

  const { forAssociate } = location.state;
  const [documents, setDocuments] = useState([]);
  const [openSnakBar, setSnakBarOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [assocaiteList, setAssocaiteList] = useState<any>([]);
  const [optionselect, setOptionselect] = useState('');
  const [allAssoOptionSelect, setAllAssoOptionSelect] = useState('');

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

  const childRefReviewed = useRef<any>(null);
  const childRefNonReviewed = useRef<any>(null);

  const [ibmId, setIbmId] = useState("AAA");
  const [empId, setEmpId] = useState("");
  const [password, setPswd] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    setError(false);
    if (type === "empId") setEmpId(e.target.value);
    else if (type === "password") setPswd(e.target.value);
  };

  const handleDocumentType = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {

    optionChanged(e.target.value);
  };

  useEffect(() => {
    fetchDocumentTypes();
    fetchAllAssociates();
  }, []);

  const callUploadAPI = () => {
    var input: any = document.getElementById('myfile');
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
          'Authorization': 'Bearer ' + userToken
        },
      })
      .then((result: any) => {
        updateDialogClose();
        setSnakBarOpen(true);
        setUploadStatus(true);
        if (user.role === 'ROLE_ASSOCIATE') {
          childRefNonReviewed.current?.fetchChildDocuments();
        } else {
          childRefReviewed.current?.fetchChildDocuments();
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

  const fileUpload = (event: any) => {
    //let changedFile = event.target.files[0];
    let uploadedFiles = event.target.files;
    setInputfile(true);
  };

  const handleSnackClose = () => {
    setSnakBarOpen(false);
  };

  const fetchDocumentTypes = () => {
    const role = user.role;
    console.log("role >>>>> " + role);
    axios
      .get(BASE_URL + 'document', { headers: { Authorization: 'Bearer ' + userToken } })
      .then((res: any) => {
        // console.log("res >>>>> "+JSON.stringify(res));
        setOptions([...res.data]);
        setOptionselect('1');
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchAllAssociates = () => {

    axios
      .get("http://localhost:9092/pru-associate/get-all-associates", { headers: { Authorization: 'Bearer ' + userToken } })
      .then((result: any) => {
        // console.log("result ==== >"+JSON.stringify(result));

        setAssocaiteList([...result.data]);
        setAllAssoOptionSelect('1');
        setLoader(false);

      });
  }

  const allAssociatesOptionChanged = (childData: any) => {
    setAllAssoOptionSelect(childData);
  };

  const optionChanged = (childData: any) => {
    console.log(":::::::::::: >>>>>" + childData)
    setOptionselect(childData);
  };

  const resetFields = () => {
    var input: any = document.getElementById('myfile');
    input.value = '';

    setOptionselect('1');
    setInputfile(false);
  };

  const openUpdateDialog = () => {
    const myfile: any = document.getElementById('myfile');
    const updateFileName = myfile.files[0].name;
    //var filteredObj = [];
    var isPopupDisplay: boolean | undefined = false;
    if (user.role === 'ROLE_ASSOCIATE') {
      isPopupDisplay = validateUploadFile(documents, updateFileName);
    } else {
      isPopupDisplay = validateUploadFile(revieweddocuments, updateFileName);
    }

    if (isPopupDisplay) {
      //console.log(filteredObj[0])
      //setDocTobeUpdate(filteredObj[0]);
      //setDocTypeTobeUpdate(filteredObj[0].documentType.name);
      setUpdateDialogStatus(true);
    } else {
      callUploadAPI();
    }
  };

  const validateUploadFile = (documentList: any, updateFileName: any) => {
    var filteredObj = [];
    const fileName = updateFileName.substring(0, updateFileName.lastIndexOf("."));
    filteredObj = documentList.filter((obj: any) => (obj.documentType.id === parseInt(optionselect)));
    if (filteredObj && filteredObj.length > 0) {
      //var filteredObj1 = documentList.filter(obj => (obj.documentType.id===parseInt(optionselect) && obj.name===updateFileName));
      var filteredObj1 = documentList.filter((obj: any) => (obj.documentType.id === parseInt(optionselect) && obj.name.substring(0, obj.name.lastIndexOf(".")) === fileName));
      if (filteredObj1 && filteredObj1.length > 0) {
        return setIsPopupDisplay(filteredObj1[0], true);
      } else {
        filteredObj1 = documentList.filter((obj: any) => (obj.name.substring(0, obj.name.lastIndexOf(".")) === fileName));
        if (filteredObj1 && filteredObj1.length > 0) {
          return setIsPopupDisplay(filteredObj1[0], false);
        } else {
          return setIsPopupDisplay(filteredObj[0], true);
        }
      }
    } else {
      //filteredObj = documentList.filter(obj => (obj.name===updateFileName));
      filteredObj = documentList.filter((obj: any) => (obj.name.substring(0, obj.name.lastIndexOf(".")) === fileName));
      if (filteredObj && filteredObj.length > 0) {
        return setIsPopupDisplay(filteredObj[0], false);
      }
    }
  }

  const setIsPopupDisplay = (fileObj: any, isDocTypePopup: any) => {
    if (isDocTypePopup) {
      //setUpdatePopupMessage(fileObj.name+" of type "+fileObj.documentType.name+" already exists. Do you want to replace it?");
      setUpdatePopupMessage(fileObj.documentType.name + " type document already exists. Do you want to replace it?");
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

  const syncDocuments = (documents: any) => {
    if (documents.documents) {
      setDocuments(documents.documents);
    } else {
      setReviewedDocuments(documents.revieweddocuments);
      setIsReviewed(documents.isReviewed);
    }
  };

  const { register, trigger, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(FilterUploadDocumentValidationSchema),
  });


  const onSubmit = (data: any) => {
    console.log("REACT HOOK FORM DATA ---- >" + JSON.stringify(data));

    openUpdateDialog();

  }

  return loader ? (
    <Loader />
  ) : (
    <div className="upload-doc-container ">
      {/* <h2>Upload Documents</h2> */}

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* <div className="border-2px"> */}
        <div className="col-md-12 container">
          <div className="col-md-4 flex-column">
            <Dropdown
              label={UIConstants.selectDocumentType}
              {...register("documentType")}
              error={!!errors?.documentType}
              onChange={handleDocumentType}
              options={mapAPItoUIDocTypeDropdown<any>(options, 'id', 'name')}
              helperText={
                errors.documentType
                  ? errors?.documentType.message
                  : null
              }
            />
          </div>
          <div className="col-md-4 flex-column text-center" data-text="Select your file!">
            <label htmlFor="myfile">
              <input
                className="input-field"
                onChange={fileUpload}
                id="myfile"
                name="myfile"
                type="file"
              />
            </label>
          </div>
          <div className="col-md-4 flex-column">
            <Button
              fullWidth
              variant="contained"
              className="login-btn"
              type="submit"
            >
              Upload
            </Button>
          </div>
        </div>

      </form>



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
export default UploadDocumentSection;
