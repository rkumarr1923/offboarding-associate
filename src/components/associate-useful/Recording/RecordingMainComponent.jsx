import React, { useState, useEffect } from 'react';
import RecordingList from './RecordingList';
import AddRecording from './AddRecording';
import EditRecording from './EditRecording';
import { Grid } from '@mui/material';
import { token, userDetails } from '../../../store';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../../common/Loader';
import RecordingService from '../../../services/hooks/RecordingService';

const RecordingMainComponent = () => {
  const userToken = useSelector(token);
  const user = useSelector(userDetails);
  //const dispatch = useDispatch();  
  const initialFormState = {
    recordId: '',
    recordDesc: '',
    recordLink: '',
    recordLinkPassword: '',
  };
  const [recordings, setRecordings] = useState([]);
  const headers = { Authorization: 'Bearer ' + userToken };
  useEffect(() => {
    // axios
    //   .get('getAllRecordingsURL', {
    //     headers: { Authorization: 'Bearer ' + userToken },
    //   })
    //   .then((response) => {
    //     //dispatch(recordings({ recordings: response.data }));
    //     setRecordings(response.data);
    //     console.log(
    //       'in Main component useEffect getall recordings ',
    //       response.data
    //     );
    //     setLoader(false);
    //   });
    setLoader(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [editing, setEditing] = useState(false);
  const [currentRecording, setCurrentRecording] = useState(initialFormState);
  
  const [loader, setLoader] = useState(true);
  // Add recording...
  const addRecording = (recording) => {
    //console.log(recording);
    //dispatch(recordings({ recordings }));
    console.log('in main component, add recording', recording);
    setRecordings([...recordings, recording]);
  };
  // delete recordings...
  const deleteRecording = (recordId) => {
    setLoader(true);
    RecordingService.deleteRecording(recordId, headers).then((response) => {
      console.log(response.data);
      setRecordings(
        recordings.filter((recording) => recording.recordId !== recordId)
      );
      setLoader(false);
    });
  };
  // set value for edit recording form...
  const editRecording = (recording) => {
    setEditing(true);
    setCurrentRecording({
      recordId: recording.recordId,
      recordDesc: recording.recordDesc,
      recordLink: recording.recordLink,
      recordLinkPassword: recording.recordLinkPassword,
    });
  };
  //  update recording
  const updateRecording = (recordId, updatedRecording) => {
    setEditing(false);
    console.log(recordId+ 'idd');
    setRecordings(
      recordings.map((item) => {
        return item.recordId === recordId ? updatedRecording : item;
      })
    );
  };
  return (    
    <div style={{ padding: '20px 20px 130px 20px' }}>
      <Grid container>
        {user.role === 'ROLE_ONBOARDING_MANAGER' ||
        user.role === 'ROLE_ONBOARDING_REVIEWER' ? (
          <Grid item xs={12}>
            {editing ? (
              <Grid item xs={12}>
                <h2 style={{ textAlign: 'center' }}>Edit Recording</h2>
                <Grid item xs={12}>
                  <EditRecording
                    editing={editing}
                    setEditing={setEditing}
                    currentRecording={currentRecording}
                    updateRecording={updateRecording}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <h2 style={{ textAlign: 'center' }}>Add Recording</h2>
                <Grid item xs={12}>
                  <AddRecording addRecording={addRecording} />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <h2>Recording</h2>
              {loader ? (
                <Loader />
              ) : (
                <RecordingList
                  recordings={recordings}
                  editRecording={editRecording}
                  deleteRecording={deleteRecording}
                />
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <h2>Recording</h2>
            {loader ? <Loader /> : <RecordingList recording={recordings} />}
          </Grid>
        )}
      </Grid>
    </div>
  );
};
export default RecordingMainComponent;
