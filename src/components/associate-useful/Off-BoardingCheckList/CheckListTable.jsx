import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Input,
  Typography,
  TablePagination,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';

const CheckListTable = (props) => {
  const infoDetails = props.infoData;
  const OffBoardingCheckList = props.offBoardingData.checkListDetails;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const tableHeader = [
    'Off-Boarding Checklist',
    'Date Verified',
    'Yes/No or N/A',
    'Comments',
  ];

  if (infoDetails) {
    let today = new Date(infoDetails.offBoardingDate);
    let date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    // eslint-disable-next-line
    OffBoardingCheckList.map((data) => {
      return (data.date = date);
    });
  }
  const [tableValues, setTableValues] = useState(OffBoardingCheckList);

  const handleChange = (event, id, keyName) => {
    setTableValues((prevState) => {
      const newData = prevState.map((data) => {
        if (data.checkListId === id) {
          if (keyName === 'date') return { ...data, date: event.target.value };
          if (keyName === 'comment')
            return { ...data, comment: event.target.value };
          if (keyName === 'status')
            return { ...data, status: event.target.value };
        }
        return data;
      });
      return newData;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    props.onCheckListSubmit({ checkListDetails: tableValues });
  }, [tableValues]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    OffBoardingCheckList && (
      <Fragment>
        <TableContainer>
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
              {tableValues &&
                tableValues
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((tableValue) => {
                    return (
                      <TableRow key={tableValue.checkListId}>
                        <TableCell style={{ width: '40rem' }}>
                          {tableValue.questions}
                          {tableValue.link && (
                            <div>
                              <a
                                href={tableValue.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                ({tableValue.linkName})
                              </a>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <TextField
                            variant="standard"
                            value={tableValue.date}
                            onChange={(e) =>
                              handleChange(e, tableValue.checkListId, 'date')
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            displayEmpty
                            value={tableValue.status}
                            onChange={(e) =>
                              handleChange(e, tableValue.checkListId, 'status')
                            }
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem disabled value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Y">Yes</MenuItem>
                            <MenuItem value="N">No</MenuItem>
                            <MenuItem value="N/A">N/A</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={tableValue.comment ? tableValue.comment : ''}
                            onChange={(e) => {
                              handleChange(
                                e,
                                tableValue.checkListId,
                                'comment'
                              );
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={OffBoardingCheckList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ margin: 0, padding: 0 }}
        />
      </Fragment>
    )
  );
};

export default CheckListTable;
