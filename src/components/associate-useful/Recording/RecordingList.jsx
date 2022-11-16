import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RecordingService from '../../../services/hooks/RecordingService';
//import { allRecordings, userDetails } from '../../../store';
import { token, userDetails } from '../../../store';

const tableHeader = ['Recording Description', 'Recording Link'];
const RecordingList = (props) => {
  const userToken = useSelector(token);
  const user = useSelector(userDetails);
  const [recordings, setRecordings] = useState([]);
  const [currentRecording, setCurrentRecording] = useState(null);
  //const recording = useSelector(allRecordings);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const BASE_URL = 'http://localhost:9094/recording';

    axios
      .get(BASE_URL + '/get-all-recording', {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((response) => {
        setRecordings(response.data);
        console.log(
          'in Recording list useEffect getall recordings ',
          response.data
        );
      });
    //retrieveTrainings();
  }, []);

  return (
    <TableContainer style={{ margin: '0px', backgroundColor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader &&
              tableHeader.map((header) => {
                return (
                  <TableCell key={header}>
                    <Typography component="h3">
                      <strong>{header}</strong>
                    </Typography>
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.recordings.length > 0 ? (
            props.recordings.map((item) => (
              <TableRow key={item.recordId}>
                <TableCell>{item.recordDesc}</TableCell>
                <TableCell>
                  <a target="_blank" href={item.recordLink}>
                    {item.recordLink}
                  </a>
                  <br />
                  Password : {item.recordLinkPassword}
                </TableCell>
                {(user.role === 'ROLE_ONBOARDING_REVIEWER' || user.role === 'ROLE_ONBOARDING_MANAGER') && (
                  <>
                    <TableCell>
                      <Button
                        type="submit"
                        onClick={() => props.editRecording(item)}
                        variant="contained"
                        size="small"
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="submit"
                        onClick={() => props.deleteRecording(item.recordId)}
                        variant="contained"
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No recording available</td>
            </tr>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RecordingList;
