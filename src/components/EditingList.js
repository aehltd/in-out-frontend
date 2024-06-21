import React, { useEffect } from "react";
import {
  formatFieldValue
} from "../utils/fieldFormatting";

const EditingList = ({list, fields, onClick }) => {

  useEffect(() => {
    console.log("list loaded");
    console.table(list);
  }, [list]);

  return (
    <div>
      <ul className="list">
        {list.map((item) => (
        <li className="list-item" key={item._id}>
        <div className="flex justify-between items-center">
          <h3>{item.name}</h3>
          <div className="grow">
            {Object.keys(fields).map((field) => (
              <div key={field}>
                <label>{field}: </label>
                <span>{formatFieldValue(fields[field], item[field])}</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-icon" onClick={() => onClick('edit', item)}>
              <span className="material-icons-outlined align-middle">edit</span>
            </button>
            <button className="btn btn-icon" onClick={() => onClick('delete', item)}>
              <span className="material-icons-outlined align-middle">delete</span>
            </button>
         </div>
         </div>
       </li>
        ))}
      </ul>
    </div>
  );
};

export default EditingList;