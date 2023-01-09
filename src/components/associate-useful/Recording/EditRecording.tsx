import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import RecordingService from '../../../services/hooks/RecordingService';
import { token } from '../../../store';
import { useSelector } from 'react-redux';

const EditRecording = (props: any) => {
  const userToken = useSelector(token);
  const [recordings, setRecordings] = useState([]);
  const headers = { Authorization: 'Bearer ' + userToken };
  const BASE_URL = 'http://localhost:9094/recording';
  const [recording, setRecording] = useState(props.currentRecording);

  useEffect(() => {
    setRecording(props.currentRecording);
  }, [props]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setRecording({ ...recording, [name]: value });
  };
  return (<form
    onSubmit={(event) => {
      event.preventDefault();
      if (!recording.recordDesc || !recording.recordLink) return;

      var data = {
        recordDesc: recording.recordDesc,
        recordLink: recording.recordLink,
        recordLinkPassword: recording.recordLinkPassword,
      };
      RecordingService.updateRecording(data, recording.recordId, headers)
        .then((response) => {
          setRecording({
            recordId: response.data.recordId,
            recordDesc: response.data.recordDesc,
            recordLink: response.data.recordLink,
            recordLinkPassword: response.data.recordLinkPassword,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      props.updateRecording(recording.recordId, recording);
    }}
  >

    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={8} md={6} lg={3}>
        <TextField variant="outlined" id="recordDesc" name="recordDesc" value={recording.recordDesc} placeholder="Description" style={{ width: "80%" }} size="small" onChange={handleInputChange} />
      </Grid>
      <Grid item xs={8} md={6} lg={3}>

        <TextField variant="outlined" id="recordLink" name="recordLink" value={recording.recordLink} placeholder="Link" style={{ width: "80%" }} size="small" onChange={handleInputChange} />
      </Grid>
      <Grid item xs={8} md={6} lg={3}>

        <TextField variant="outlined" id="recordLinkPassword" name="recordLinkPassword" value={recording.recordLinkPassword} placeholder="Password" style={{ width: "80%" }} size="small" onChange={handleInputChange} />
      </Grid>

      <Button type='submit' variant="contained" sx={{ mt: 2, mr: 2 }}>
        Edit Recording
      </Button>
      <Button type='reset' onClick={() => props.setEditing(false)} variant="contained" sx={{ mt: 2, mr: 2 }}>
        Cancel
      </Button>
    </Grid>
  </form>);
};
export default EditRecording;