"use client";

import React, { useState } from "react";
// @ts-ignore
import Papa from "papaparse";
import { CgSlack } from "react-icons/cg";
import CardContainer from "./container";

const ReconcilePage = () => {
  const [fileAData, setFileAData] = useState<any[]>([]);
  const [fileBData, setFileBData] = useState<any[]>([]);
  const [reconciledData, setReconciledData] = useState<any[]>([]);
  const [unreconciledData, setUnreconciledData] = useState<any[]>([]);
  const [finalReport, setFinalReport] = useState<any[]>([]);
  const [unreconciledA, setUnreconciledA] = useState<any[]>([]);
  const [unreconciledB, setUnreconciledB] = useState<any[]>([]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileData: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (results: { data: React.SetStateAction<any[]> }) => {
          setFileData(results.data);
        },
      });
    }
  };

  const CSVfilterData = (fileAData: any[]) => {
    let columnValues = [];
    for (let index = 0; index < fileAData.length; index++) {
      // console.log("each element at: ", index, ": ");

      let transactionID = fileAData[index][0];
      if (transactionID !== null && transactionID !== "") {
        columnValues.push(transactionID);
      }
      // console.log("transaction ID: ", transactionID);
      // console.log("file A column values: ", columnValues);
    }
    return columnValues;
  };

  const reconcileData = () => {
    const fileAColumnValues = CSVfilterData(fileAData);
    console.log("file A transaction id values: ",fileAColumnValues);
    const fileBColumnValues = CSVfilterData(fileBData);
    console.log("file B transaction id values: ",fileBColumnValues);

    let reconciled = [];

    for (const rowA of fileAData) {
      if (fileBColumnValues.includes(rowA[0])) {
        reconciled.push(rowA);
      } else {
        unreconciledA.push(rowA);
      }
      console.log("row columnn A value: ",rowA[0])
    }
    console.log("reconciled: ",reconciled.length);
    console.log("Unreconciled A: ",unreconciledA.length);
    
    for (const rowB of fileBData) {
      if (!fileAColumnValues.includes(rowB[0])) {
        unreconciledB.push(rowB);

      }
    }

    setReconciledData([reconciled]);
    setUnreconciledData([["Unreconciled A"], ...unreconciledA, ["Unreconciled B"], ...unreconciledB]);

    console.log("Reconciled Data: ", reconciled);
    console.log("Unreconciled Data: ", unreconciledA);
    console.log("Unreconciled Data: ", unreconciledB);
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
      <br />
      <button className="btn text-white" onClick={reconcileData}>
        Reconcile Data
      </button>

      {reconciledData.length > 0 && (
        <div>
          <h2>Reconciled Data</h2>
          <button
            className="btn-primary"
            onClick={() => downloadCSV(reconciledData, "reconciled.csv")}
          >
            Download Reconciled Data
          </button>
        </div>
      )}

      {unreconciledData.length > 0 && (
        <div>
          <h2>Unreconciled Data</h2>
          <button
            className=" btn-primary"
            onClick={() => downloadCSV(unreconciledData, "unreconciled.csv")}
          >
            Download Unreconciled Data
          </button>
        </div>
      )}

      <div className="p-4 flex bg-white flex-wrap gap-2">
        <CardContainer
          title={"Unreconciled From File A "}
          value={unreconciledA.length.toString()}
        ></CardContainer>
        <CardContainer
          title={"Unreconciled From File B "}
          value={unreconciledB.length.toString()}
        ></CardContainer>
        <CardContainer
          title={"Reconciled "}
          value={reconciledData.length.toString()}
        ></CardContainer>
      </div>
    </div>
  );
};

export default ReconcilePage;
function reject(error: any) {
  throw new Error("Function not implemented.");
}

