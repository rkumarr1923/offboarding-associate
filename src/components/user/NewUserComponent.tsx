import { InfoRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
  useTheme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  allManagers,
  allReviewers,
  allRoles,
  // createFristName,
  // createLastName,
  createNewUser,
  createNewUserDetails,
  managers,
  resetCreateNewUserDetails,
  reviewers,
  roles,
  token,
} from '../../store';
import '../styles/login.css';
import { generate, generateMultiple, validate } from '@wcj/generate-password';
import { InputText } from '../core/InputText/InputText';
import { newUserFormDefaultValues, NewUserValidationSchema } from './NewUserComponent.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { mapAPItoUIDocTypeDropdown } from '../../transformation/reponseMapper';
import { UIConstants } from '../constants/UIConstants';
import { Dropdown } from '../core/Dropdown/Dropdown';
import React from 'react';
import { saveNewUser } from '../../services/NewUserService';
import { mapNewUserModel_UItoAPI } from '../../transformation/UserMapper';


const NewUserComponent = () => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));
  const dispatch = useDispatch();
  const userToken = useSelector(token);
  // const FristName=useSelector(createFristName);
  // const LastName=useSelector(createLastName);
  const newUserDetails = useSelector(createNewUser);
  const allRole = useSelector(allRoles);


  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [attribteType, setAttribteType] = useState('password');
  const [userRoleType, setUserRoleType] = useState('');
  const [openSnakBar, setSnakBarOpen] = useState(false);


  const isEmail = (email: any) =>
    /^[A-Z0-9._%+-]+@[IBM,ibm]+\.[COM,com]{2,4}$/i.test(email);

  const getRoleName = (roleId: string) => {
    allRole.filter((data: any) => {
      if (data.id == roleId) {
        return data.name;

      }
    })
  };

  const assosiateRoleId = allRole.find((data: any) => {
    return data.name == 'ROLE_ASSOCIATE';
  });
  const reviewerRoleId = allRole.find((data: any) => {
    return data.name == 'ROLE_ONBOARDING_REVIEWER';
  });
  const allManager = useSelector(allManagers).filter(
    (item: any) => item.empId !== 'N/A'
  );
  const allReviewer = useSelector(allReviewers).filter(
    (item: any) => item.empId !== 'N/A'
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect((): any => {
    axios.get('http://localhost:9099/roles').then((response) => {
      if (response.data) {
        dispatch(roles({ roles: response.data }));
        console.log("response.data :::::: >>>>> " + JSON.stringify(response.data))
      } else console.log('No Roles');
    });
    axios.get('http://localhost:9099/managers').then((response) => {
      if (response.data) dispatch(managers({ managers: response.data }));
      else console.log('No managers');
    });
    axios.get('http://localhost:9099/reviewers').then((response) => {
      if (response.data) dispatch(reviewers({ reviewers: response.data }));
      else console.log('No Reviewers');
    });

    return () => dispatch(resetCreateNewUserDetails());


  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUserDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    // do something
    setUserRoleType(e.target.value);
    // e.preventDefault();
    // console.log(e.target.value);
  };

  const handleReviewerDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    // do something
  };

  const handleManagerDropdownChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    // do something
  };



  const generatePassword = () => {

    const randomPasword = generate({ length: 15 });
    const passWordStrength = validate(randomPasword);

    console.log("randomPasword is :: >>>>>>>" + randomPasword);
    console.log("passWordStrength is :: >>>>>>>" + passWordStrength);

    setFocus("password");
    setPassword(randomPasword);

    // if (newUserDetails.employeeId !== '' && newUserDetails.FristName !== '') {
    //   const generatedPassword =
    //     newUserDetails.FristName.replace(/\s+/g, '').slice(0, 3) +
    //     newUserDetails.employeeId;
    //   dispatch(
    //     createNewUserDetails({
    //       createNewUser: {
    //         ...newUserDetails,
    //         isGeneratedButtonDisabled: true,
    //         password: generatedPassword,
    //         error: {
    //           ...newUserDetails.error,
    //           errorPassword: false,
    //           errorGeneratebutton: false,
    //         },
    //       },
    //     })
    //   );
    // } else {
    //   let errorEmployeeId = false;
    //   let errorUserName = false;
    //   let errorFristName = false;
    //   let errorLastName = false;
    //   if (newUserDetails.employeeId === '') errorEmployeeId = true;
    //   if (newUserDetails.FristName === '') errorFristName = true;
    //   if (newUserDetails.LastName === '') errorLastName = true;
    //   if (newUserDetails.UserName === '') errorUserName = true;
    //   dispatch(
    //     createNewUserDetails({
    //       createNewUser: {
    //         ...newUserDetails,
    //         error: { ...newUserDetails.error, errorEmployeeId, errorUserName, errorFristName, errorLastName },
    //       },
    //     })
    //   );
    // }
  };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
  //   if (type == "employeeId") {
  //     // setEmployeeId(e.target.value);
  //   } else if (type == "email") {
  //     // setEmail(e.target.value);
  //   } else if (type == "firstName") {
  //     // setFirstName(e.target.value);
  //   } else if (type == "lastName") {
  //     // setLastName(e.target.value);
  //   } else if (type == "password") {
  //     // setPassword(e.target.value);
  //   }


  // };


  // const handleChange = (prop: any, errorType: any) => (event: any) => {
  //   event.preventDefault();
  //   dispatch(
  //     createNewUserDetails({
  //       createNewUser: {
  //         ...newUserDetails,
  //         [prop]: event.target.value,
  //         isGeneratedButtonDisabled:
  //           // prop === 'UserName' || 
  //           prop === 'employeeId'
  //             ? false
  //             : newUserDetails.isGeneratedButtonDisabled,
  //         error: { ...newUserDetails.error, [errorType]: false },
  //       },
  //     })
  //   );
  // };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleNewUser = (e: any) => {
  //   e.preventDefault();
  //   let error = {};
  //   // if (newUserDetails.email === '') error = { ...error, errorEmail: true };

  //   // if (!isEmail(newUserDetails.email)) {
  //   //   error = { ...error, errorEmail: true };
  //   // }

  //   // if (newUserDetails.employeeId === '')
  //   //   error = { ...error, errorEmployeeId: true };

  //   // // if (newUserDetails.employeeId) {
  //   // //   error = { ...error, errorEmployeeId: true };
  //   // } 
  //   // else if (newUserDetails.employeeId.length > 6) {
  //   //   error = { ...error, errorEmployeeId: true };
  //   // }

  //   // if (
  //   //   newUserDetails.reviewerName === '' &&
  //   //   newUserDetails.role === assosiateRoleId?.id
  //   // )
  //   //   error = { ...error, errorReviewerName: true };

  //   // if (
  //   //   newUserDetails.managerName === '' &&
  //   //   (newUserDetails.role === assosiateRoleId?.id ||
  //   //     newUserDetails.role === reviewerRoleId?.id)
  //   // )
  //   //   error = { ...error, errorManagerName: true };
  //   // if (newUserDetails.role === '') error = { ...error, errorRole: true };

  //   // if (newUserDetails.userName === '')
  //   //   error = { ...error, errorUserName: true };

  //   // if (newUserDetails.FristName === '')
  //   //   error = { ...error, errorFristName: true };
  //   // if (newUserDetails.FristName)
  //   // error = { ...error, errorFristName: true };

  //   // if (newUserDetails.LastName === '')
  //   //   error = { ...error, errorLastName: true };
  //   // if (newUserDetails.LastName)
  //   // error = { ...error, errorLastName: true };

  //   // if (newUserDetails.password === '')
  //   //   error = { ...error, errorPassword: true };
  //   // if (newUserDetails.employeeId.length > 6) {
  //   //   error = { ...error, errorEmployeeId: true };
  //   // }
  //   dispatch(
  //     createNewUserDetails({
  //       createNewUser: { ...newUserDetails, error },
  //     })
  //   );
  //   // console.log('Error '+JSON.stringify(error));
  //   if (JSON.stringify(error) === '{}') {
  //     if (!newUserDetails.isGeneratedButtonDisabled) {
  //       dispatch(
  //         createNewUserDetails({
  //           createNewUser: {
  //             ...newUserDetails,
  //             error: { errorGeneratebutton: true },
  //           },
  //         })
  //       );
  //     } else {
  //       const requestData = {
  //         employeeId: newUserDetails.employeeId,
  //         email: newUserDetails.email,
  //         // userName: newUserDetails.userName,
  //         FristName: newUserDetails.FristName,
  //         LastName: newUserDetails.LastName,
  //         password: newUserDetails.password,
  //         roleId: newUserDetails.role,
  //         reviewerEmpId:
  //           newUserDetails.role === assosiateRoleId?.id
  //             ? newUserDetails.reviewerName
  //             : 'N/A',
  //         managerEmpId:
  //           newUserDetails.role === assosiateRoleId?.id ||
  //             newUserDetails.role === reviewerRoleId?.id
  //             ? newUserDetails.managerName
  //             : 'N/A',
  //       };
  //       axios
  //         .post('http://localhost:9099/user_add', requestData)
  //         .then((response) => {
  //           if (response.data.role.name === 'ROLE_ASSOCIATE') {
  //             const saveAssociateReq = {
  //               associateName: response.data.userName,
  //               ibmId: response.data.employeeId,
  //               emailIbm: response.data.email,
  //               FristName: response.data.FristName,
  //               LastName: response.data.LastName,
  //               activeInactive: 'Yet to be started',
  //             };
  //             const associateResponse = axios.post(
  //               'http://localhost:9092/pru-associate/new-associate',
  //               saveAssociateReq,
  //               {
  //                 headers: { Authorization: 'Bearer ' + userToken },
  //               }
  //             );
  //             console.log(associateResponse);
  //           }
  //           setSnackbarOpen(true);
  //           dispatch(resetCreateNewUserDetails());
  //         });
  //     }
  //   } else console.log('Error');
  // };

  const handleClickShowPassword = () => {

    if (attribteType === "text") {
      setAttribteType('password');
    } else {
      setAttribteType('text');
    }

    // if (!newUserDetails.showPassword)
    //   document.getElementById('password').type = 'text';
    // else document.getElementById('password').type = 'password';
    // dispatch(
    //   createNewUserDetails({
    //     createNewUser: {
    //       ...newUserDetails,
    //       showPassword: !newUserDetails.showPassword,
    //     },
    //   })
    // );
  };


  const resetForm = () => {

    reset(newUserFormDefaultValues);
    setPassword(newUserFormDefaultValues.password);
    // setValue('roleId', '');
    resetField('roleId')
    trigger('roleId');
  }

  const { register, trigger, reset, resetField, getValues, setValue, setFocus, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'all',
    defaultValues: newUserFormDefaultValues,
    resolver: yupResolver(NewUserValidationSchema),
  });


  const onSubmit = (data: any) => {
    const UIData = { ...data, 'userName': getValues('firstName') + " " + getValues('lastName') };
    console.log("REACT HOOK FORM DATA FINAL ---- >" + JSON.stringify(UIData));

    console.log("REACT HOOK errors  ---- >" + JSON.stringify(errors));

    const apiData = mapNewUserModel_UItoAPI(UIData);

    try {
      saveNewUser(apiData, userToken);
      resetForm();
    } catch {
      console.log("something went wrong!!!");
    }


    // axios.post('http://localhost:9099/user_add', requestData)
    //   .then((response) => {
    //     console.log("response is ::::: >>>>" + JSON.stringify(response));
    //     setSnakBarOpen(true);

    //     if (response.data.role.name === 'ROLE_ASSOCIATE') {
    //       const saveAssociateReq = {
    //         associateName: response.data.userName,
    //         ibmId: response.data.employeeId,
    //         emailIbm: response.data.email,
    //         FristName: response.data.FristName,
    //         LastName: response.data.LastName,
    //         activeInactive: 'Yet to be started',
    //       };
    //       const associateResponse = axios.post(
    //         'http://localhost:9092/pru-associate/new-associate',
    //         saveAssociateReq,
    //         {
    //           headers: { Authorization: 'Bearer ' + userToken },
    //         }
    //       );
    //       console.log("associateResponse ::: >>>" + JSON.stringify(associateResponse));
    //     }
    //     // setSnackbarOpen(true);
    //     // dispatch(resetCreateNewUserDetails());
    //   });

  }

  return (
    <div
      style={{
        textAlign: 'center',
        width: matchesMD ? '80%' : matchesXL ? '40%' : '30%',
        margin: 'auto',
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className="pt-3"
        style={{ marginBottom: '10rem' }}
      >
        <Grid item xs={12}>
          <Typography variant="h6">
            <strong>{UIConstants.addNewUserLabel}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} className="pt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent>

                <InputText
                  label={UIConstants.employeeIdLabel}
                  autoFocus
                  // value={employeeId}
                  error={!!errors?.employeeId}
                  {...register("employeeId")}
                  // onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "employeeId")}
                  helperText={
                    errors.employeeId
                      ? errors?.employeeId.message
                      : null
                  }
                />

                <InputText
                  label={UIConstants.emailIdLabel}
                  type="email"
                  // value={email}
                  error={!!errors?.email}
                  {...register("email")}
                  placeholder="Please enter email, for exapmle 'xyz@ibm.com'"
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "email")}
                  helperText={
                    errors.email
                      ? errors?.email.message
                      : null
                  }
                />

                <InputText
                  label={UIConstants.firstNameLabel}
                  // value={firstName}
                  {...register("firstName")}
                  error={!!errors?.firstName}
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "firstName")}
                  helperText={
                    errors.firstName
                      ? errors?.firstName.message
                      : null
                  }
                />

                <InputText
                  label={UIConstants.lastNameLabel}
                  // value={lastName}
                  {...register("lastName")}
                  error={!!errors?.lastName}
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "lastName")}
                  helperText={
                    errors.lastName
                      ? errors?.lastName.message
                      : null
                  }
                />


                {/* <TextField
                  className="btn-color"
                  autoFocus
                  margin="dense"
                  label="Employee id"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newUserDetails.employeeId}
                  error={newUserDetails.error.errorEmployeeId}
                  onChange={handleChange('employeeId', 'errorEmployeeId')}
                />
                <Typography
                  variant="caption"
                  color={newUserDetails.error.errorEmployeeId ? 'red' : 'black'}
                >
                  Please enter IBM employee ID in 6 character. Eg: xxxxxx
                </Typography> */}
                {/* <TextField
                  margin="dense"
                  label="Email Id"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={newUserDetails.email}
                  error={newUserDetails.error.errorEmail}
                  onChange={handleChange('email', 'errorEmail')}
                />
                <Typography
                  variant="caption"
                  color={newUserDetails.error.errorEmail ? 'red' : 'black'}
                >
                  Please enter email for exapmle "xyz@ibm.com"
                </Typography> */}
                {/* <TextField
                margin="dense"
                label="Employee Name"
                type="text"
                fullWidth
                variant="standard"
                value={newUserDetails.userName}
                error={newUserDetails.error.errorUserName}
                onChange={handleChange('userName', 'errorUserName')}
              /> */}
                {/* <TextField
                  margin="dense"
                  label="FirstName"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newUserDetails.FristName}
                  error={newUserDetails.error.errorFristName}
                  onChange={handleChange('FristName', 'errorFristName')}
                />
                <TextField
                  margin="dense"
                  label="LastName"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newUserDetails.LastName}
                  error={newUserDetails.error.errorLastName}
                  onChange={handleChange('LastName', 'errorLastName')}
                /> */}
                {/* <Typography
                  variant="caption"
                  color={
                    newUserDetails.error.errorGeneratebutton ? 'red' : 'black'
                  }
                >
                  Please Enter LastName
                </Typography> */}


                <InputText
                  label={UIConstants.passwordLabel}
                  value={password}
                  disable
                  type={attribteType}
                  {...register("password")}
                  error={!!errors?.password}
                  //onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleInputChange(e, "password")}
                  helperText={
                    errors.password
                      ? errors?.password.message
                      : null
                  }
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                          <Tooltip
                            title={UIConstants.newUserPasswordTooltip}
                          >
                            <IconButton>
                              <InfoRounded />
                            </IconButton>
                          </Tooltip>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {attribteType === 'text' ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                />


                {/* <TextField
                  id="password"
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={newUserDetails.password}
                  error={newUserDetails.error.errorPassword}
                  onChange={handleChange('password', 'errorPassword')}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                          <Tooltip
                            title="Password will be generated based on EmployeeID and Employee Name.
  Ex: EmployeeID - 123456, Employee Name - x test
  Generated Password - xte123456"
                          >
                            <IconButton>
                              <InfoRounded />
                            </IconButton>
                          </Tooltip>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {newUserDetails.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      </>
                    ),
                  }}
                /> */}
                <Button
                  fullWidth
                  variant="contained"
                  disabled={newUserDetails.isGeneratedButtonDisabled}
                  onClick={generatePassword}
                  style={{ marginTop: '10px' }}
                >
                  {UIConstants.generatePasswordBtnLabel}
                </Button>
                {/* <Typography
                  variant="caption"
                  color={
                    newUserDetails.error.errorGeneratebutton ? 'red' : 'black'
                  }
                >
                  Please generate password
                </Typography> */}
                {allRole && (
                  <>

                    <Dropdown
                      label={UIConstants.selectUser}
                      {...register("roleId")}
                      error={!!errors?.roleId}
                      onChange={handleUserDropdownChange}
                      options={mapAPItoUIDocTypeDropdown(allRole, 'id', 'name')}
                      selectAnOption
                      helperText={
                        errors.roleId
                          ? errors?.roleId.message
                          : null
                      }
                    />

                    {/* <Select
                      margin="dense"
                      displayEmpty
                      id="role"
                      value={newUserDetails.role}
                      error={newUserDetails.error.errorRole}
                      size="small"
                      fullWidth
                      onChange={handleChange('role', 'errorRole')}
                      style={{ marginTop: '1.5rem' }}
                      sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0 },
                      }}
                    //   inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem disabled value="">
                        UserRole
                      </MenuItem>
                      {allRole.map((data: any) => {
                        return (
                          <MenuItem value={data?.id} key={data?.id}>
                            {data?.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Typography
                      variant="caption"
                      color={newUserDetails.error.errorRole ? 'red' : 'black'}
                    >
                      Please select the role for the user
                    </Typography> */}
                  </>
                )}
                {/* {newUserDetails.role === assosiateRoleId?.id && allReviewer && ( */}
                <>

                  {userRoleType === "63bbedee42fd516ddaf2e7be" && (
                    <Dropdown
                      label={UIConstants.selectReviewer}
                      {...register("reviewerEmpId")}
                      error={!!errors?.reviewerEmpId}
                      onChange={handleReviewerDropdownChange}
                      options={mapAPItoUIDocTypeDropdown(allReviewer, 'empId', 'reviewerName')}
                      selectAnOption
                      helperText={
                        errors.reviewerEmpId
                          ? errors?.reviewerEmpId.message
                          : null
                      }
                    />
                  )}
                  {/* <Select
                    margin="dense"
                    displayEmpty
                    id="reviewer"
                    value={newUserDetails.reviewerName}
                    error={newUserDetails.error.errorReviewerName}
                    size="small"
                    fullWidth
                    onChange={handleChange('reviewerName', 'errorReviewerName')}
                    style={{ marginTop: '1.5rem' }}
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                  //   inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      Reviewer Name
                    </MenuItem>
                    {allReviewer.map((data: any) => {
                      return (
                        <MenuItem value={data.empId} key={data.empId}>
                          {data.reviewerName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Typography
                    variant="caption"
                    color={
                      newUserDetails.error.errorReviewerName ? 'red' : 'black'
                    }
                  >
                    Please select the Reviewer Name
                  </Typography> */}
                </>
                {/* )} */}
                {/* {(newUserDetails.role === assosiateRoleId?.id ||
                  newUserDetails.role === reviewerRoleId?.id) &&
                  allManager && ( */}
                <>

                  {/* ---{userRoleType}--- */}
                  {(userRoleType === "63885ca42c2a9f5a595f487a" || userRoleType === "63bbedee42fd516ddaf2e7be") && (
                    <Dropdown
                      label={UIConstants.selectManager}
                      {...register("managerEmpId")}
                      error={!!errors?.managerEmpId}
                      onChange={handleManagerDropdownChange}
                      options={mapAPItoUIDocTypeDropdown(allManager, 'empId', 'managerName')}
                      selectAnOption
                      helperText={
                        errors.managerEmpId
                          ? errors?.managerEmpId.message
                          : null
                      }
                    />
                  )}
                  {/* <Select
                    margin="dense"
                    displayEmpty
                    id="manager"
                    value={newUserDetails.managerName}
                    error={newUserDetails.error.errorManagerName}
                    size="small"
                    fullWidth
                    onChange={handleChange('managerName', 'errorManagerName')}
                    style={{ marginTop: '1.5rem' }}
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0 },
                    }}
                  //   inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      Manager Name
                    </MenuItem>
                    {allManager.map((data: any) => {
                      return (
                        <MenuItem value={data.empId} key={data.empId}>
                          {data.managerName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Typography
                    variant="caption"
                    color={
                      newUserDetails.error.errorManagerName ? 'red' : 'black'
                    }
                  >
                    Please select the Manager Name
                  </Typography> */}
                </>
                {/* )} */}
              </CardContent>
              <CardActions>
                {/* <Button
                fullWidth
                variant="contained"
                disabled={newUserDetails.isLoginButonDisabled}
                onClick={handleNewUser}
              >
                Add
              </Button> */}

                <Button
                  fullWidth
                  variant="contained"
                  className="login-btn"
                  type="submit"
                >
                  Add
                </Button>

              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
      <Snackbar
        sx={{ height: '20%' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          New User created!!!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewUserComponent;
