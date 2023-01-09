import React, { useState } from 'react';
import { Grid, TextField, Button } from "@mui/material";
import RecordingService from '../../../services/hooks/RecordingService';
import { token } from '../../../store';
import { useSelector } from 'react-redux';

const AddRecording = (props: any) => {
  const userToken = useSelector(token);
  const initialFormState = {
    recordId: '',
    recordDesc: '',
    recordLink: '',
    recordLinkPassword: '',
  };
  const [recording, setRecording] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setRecording({ ...recording, [name]: value });
  };
  const newRecording = () => {
    setRecording(initialFormState);
    setSubmitted(false);
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!recording.recordDesc || !recording.recordLink || !recording.recordLinkPassword) return;
        //props.addRecording(recording);
        var data = {
          recordDesc: recording.recordDesc,
          recordLink: recording.recordLink,
          recordLinkPassword: recording.recordLinkPassword,
        };
        const headers = { Authorization: 'Bearer ' + userToken };
        RecordingService.createRecording(data, headers)
          .then((response) => {
            setRecording(response.data);
            setSubmitted(true);
            newRecording();
            console.log(response.data);
            props.addRecording(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
        setRecording(initialFormState);
      }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={8} md={6} lg={3}>
          <TextField
            variant="outlined"
            id="recordDesc"
            name="recordDesc"
            value={recording.recordDesc}
            placeholder="Description"
            style={{ width: "80%" }}
            size="small"
            onChange={handleInputChange} />
        </Grid>
        <Grid item xs={8} md={6} lg={3}>
          <TextField
            variant="outlined"
            id="recordLink"
            name="recordLink"
            value={recording.recordLink}
            placeholder="Link"
            style={{ width: "80%" }}
            size="small"
            onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>

          <TextField
            variant="outlined"
            id="recordLinkPassword"
            name="recordLinkPassword"
            value={recording.recordLinkPassword}
            placeholder="Password"
            style={{ width: "80%" }}
            size="small"
            onChange={handleInputChange} />
        </Grid>

        <Button
          type='submit'
          variant="contained"
          color="success"
          id="recSubmit"
          sx={{ mt: 2, mr: 2 }}>
          Submit
        </Button>

      </Grid>
    </form>);
};
export default AddRecording;