import React from 'react';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

const ExportToExcel = ({ inputExcelData, excelData }) => {
  const workbook = new Excel.Workbook();

  const exportIntoExcel = async () => {
    try {
      const fileName = excelData.workBookName;
      const worksheet = workbook.addWorksheet(excelData.workSheetName);
      worksheet.columns = excelData.columns;
      worksheet.getRow(1).font = { bold: true };

      worksheet.columns.forEach((column) => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: 'center' };
      });

      inputExcelData.forEach((singleData) => {
        worksheet.addRow(singleData);
      });

      worksheet.eachRow({ includeEmpty: false }, (row) => {
        const currentCell = row._cells;
        currentCell.forEach((singleCell) => {
          const cellAddress = singleCell._address;
          worksheet.getCell(cellAddress).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      });

      const buf = await workbook.xlsx.writeBuffer();

      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error('<<<ERRROR>>>', error);
      console.error('Something Went Wrong', error.message);
    } finally {
      workbook.removeWorksheet(excelData.workSheetName);
    }
  };

  return (
    <>
      <div className="download-icon">
        <i
          title="Export to Excel"
          className="fa fa-download"
          onClick={() => exportIntoExcel()}
          aria-hidden="true"
        ></i>
      </div>
    </>
  );
};

export default ExportToExcel;
