"use client";

import React, { useState } from "react";
// @ts-ignore
import Papa from "papaparse";
import { CgSlack } from "react-icons/cg";


const ReconcilePage = () => {
  const [fileAData, setFileAData] = useState<any[]>([]);
  const [fileBData, setFileBData] = useState<any[]>([]);
  const [reconciledData, setReconciledData] = useState<any[]>([]);
  const [unreconciledData, setUnreconciledData] = useState<any[]>([]);
  const [finalReport, setFinalReport] = useState<any[]>([]);
  let reconciled = [];
  let unreconciledA = [];
  let unreconciledB = [];
  const comparedColumn = 0;

// Add Promise and resolve at the top of the file


// ...
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setFileData: React.Dispatch<React.SetStateAction<any[]>>) => {
  const file = e.target.files?.[0];
  if (file) {
    Papa.parse(file, {
      header: false, // Ensures that the first row is treated as headers
      dynamicTyping: true, // Automatically converts numbers to numeric types
      skipEmptyLines: true, // Skips empty lines
      complete: function(results: { data: any; }) {
        // Use Promise and resolve to fix the error
        new Promise((resolve: (arg0: any) => void) => {
          resolve(results.data);
        }).then((data: React.SetStateAction<any[]>) => {
          setFileData(data);
        });
      },
      error: function(error: any) {
        reject(error);
      }
    });
  }
};

// ...

  const reconcileData = () => {

    const fileAColumnValues = fileAData.map(row => row[comparedColumn]);
    // console.log(Object.values(fileAColumnValues));
    console.log("FileA column values: ",fileAColumnValues);
    
    const fileBColumnValues = fileBData.map(row => row[comparedColumn]);
    console.log("FileB column values: ",fileBColumnValues);
    // reconciled = [];
    for (const rowA of fileAData) {
      if (fileBColumnValues.includes(rowA[comparedColumn])) {
        reconciled.push(rowA);
        
      } else {
        unreconciledA.push(rowA);
      }
    }
    console.log("reconciled: ",reconciled.length);
    console.log("Unreconciled A: ",unreconciledA.length);
    
    for (const rowB of fileBData) {
      if (!fileAColumnValues.includes(rowB[comparedColumn])) {
        unreconciledB.push(rowB);
      }
    }
    console.log("Unreconciled B: ",unreconciledB.length);

    setReconciledData(reconciled);
    setUnreconciledData([...unreconciledA, ...unreconciledB]);
  };

  const downloadCSV = (data: any[], filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>CSV Reconciliation</h1>
      <div>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleFileUpload(e, setFileAData)}
        />
        <label>Upload File A</label>
      </div>
      <div>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleFileUpload(e, setFileBData)}
        />
        <label>Upload File B</label>
      </div>
      <button onClick={reconcileData}>Reconcile Data</button>

      {reconciledData.length > 0 && (
        <div>
          <h2>Reconciled Data</h2>
          <button onClick={() => downloadCSV(reconciledData, "reconciled.csv")}>Download Reconciled Data</button>
        </div>
      )}

      {unreconciledData.length > 0 && (
        <div>
          <h2>Unreconciled Data</h2>
          <button onClick={() => downloadCSV(unreconciledData, "unreconciled.csv")}>Download Unreconciled Data</button>
        </div>
      )}
    </div>
  );
};

export default ReconcilePage;
function reject(error: any) {
  throw new Error("Function not implemented.");
}

