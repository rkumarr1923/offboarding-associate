import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { templateSummary } from "../../../json/templateSummary";

const tableHeader = ["Version #", "Version Date", "Author", "Nature of Change"];

const TemplateSummary = () => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeader &&
                tableHeader.map((header) => {
                  return (
                    <TableCell key={header}>
                      <Typography variant="span">
                        <strong>{header}</strong>
                      </Typography>
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {templateSummary &&
              templateSummary.map((tableValue) => {
                return (
                  <TableRow key={tableValue.version}>
                    <TableCell>{tableValue.version}</TableCell>
                    <TableCell>{tableValue.versionDate}</TableCell>
                    <TableCell>{tableValue.author}</TableCell>
                    <TableCell>{tableValue.natureOfChange}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TemplateSummary;
