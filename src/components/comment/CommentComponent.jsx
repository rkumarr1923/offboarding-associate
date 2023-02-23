import {
  PeopleAltTwoTone,
  PreviewTwoTone,
  SupportAgentTwoTone,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import moment from 'moment/moment.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comments, userComments, userDetails, token } from '../../store';
import Loader from '../common/Loader';

const CommentComponent = (props) => {
  const userToken = useSelector(token);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userDetails);
  const allComments = useSelector(userComments);
  const empId = props.empId ? props.empId : user.empId;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:9094/comment/' + empId, {
        headers: { Authorization: 'Bearer ' + userToken },
      })
      .then((result) => {
        if (result.data) {
          dispatch(
            comments({
              comments: result.data,
            })
          );
          setLoader(false);
        }
      }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empId]);

  const handleClickOpen = () => {
    setError(false);
    setComment('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertDate = (date) => {
    let updatedDate = moment(new Date(date));
    return updatedDate.calendar(null, {
      lastWeek: '[Last] ddd hh:mm A',
      lastDay: '[Yesterday at] hh:mm A',
      sameDay: function (now) {
        if (moment(date).isSame(moment(new Date()).format())) {
          return '[Now]';
        } else {
          return '[Today at] hh:mm A';
        }
      },
      sameElse: 'YYYY/MM/DD hh:mm A',
    });
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleAddComments = () => {
    if (comment === null || comment === '') setError(true);
    else {
      let updatedComments = {
        empId: empId,
        who: user.name,
        role: user.role,
        comments: comment,
        date: moment(new Date()).format(),
      };
      axios
        .post('http://localhost:9094/comment/add-comment', updatedComments, {
          headers: { Authorization: 'Bearer ' + userToken },
        })
        .then((result) => {
          if (result.data)
            dispatch(
              comments({
                comments: [result.data, ...allComments],
              })
            );
        });
      setError(false);
      setOpen(false);
    }
  };

  return (
    <div
      style={{
        padding: '20px 20px 0 20px',
        paddingBottom: props.empId ? '10px' : '80px',
      }}
    >
      {props.empId ? <></> : <h2>Comment</h2>}
      {loader ? (
        <Loader />
      ) : allComments.length !== 0 ? (
        <List style={{ overflow: 'auto', backgroundColor: 'white' }}>
          {allComments.map((data, index) => {
            return (
              <Fragment key={`comments-${index}`}>
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          variant="h6"
                          color="black"
                          style={{ margin: 0 }}
                        >
                          <Grid container direction="row">
                            <Grid item xs={6}>
                              {user.role === data.role ? (
                                <strong>You:</strong>
                              ) : (
                                <>
                                  <Grid
                                    container
                                    textAlign="start"
                                    alignItems="center"
                                  >
                                    <Grid item xs="auto">
                                      <strong>{data.who}:</strong>
                                    </Grid>
                                    <Grid item xs>
                                      <Tooltip
                                        title={data.role}
                                        placement="right"
                                      >
                                        {data.role === 'REVIEWER' ? (
                                          <PreviewTwoTone
                                            style={{ fontSize: 13 }}
                                          />
                                        ) : data.role === 'ASSOCIATE' ? (
                                          <SupportAgentTwoTone
                                            style={{ fontSize: 13 }}
                                          />
                                        ) : (
                                          <PeopleAltTwoTone
                                            style={{ fontSize: 13 }}
                                          />
                                        )}
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: 'end' }}>
                              <span style={{ fontSize: '10px' }}>
                                {convertDate(data.date)}
                              </span>
                            </Grid>
                          </Grid>
                        </Typography>
                      </>
                    }
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        variant="span"
                        color="black"
                      >
                        {data.comments}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="li" />
              </Fragment>
            );
          })}
        </List>
      ) : (
        'No comments to display.'
      )}
      <Tooltip
        title="Add New comment"
        sx={{ position: 'fixed', bottom: 60, right: 50 }}
      >
        <Fab color="primary" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={comment}
            onChange={handleComment}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddComments}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CommentComponent;
