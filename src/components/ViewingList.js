import React, { useEffect } from "react";
import { formatFieldValue } from "../utils/fieldFormatting";

const ViewingList = ({ list, fields }) => {
  
    useEffect(() => {
      console.log("list loaded");
      console.table(list);
    }, [list]);
  
    return (
      <div>
        <ul>
          {list.map((item) => (
            <li key={item._id}>
              {Object.keys(fields).map((field) => (
                <div key={field}>
                  <label>{field}: </label>
                  <span key={field}>{formatFieldValue(fields[field], item[field])}</span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ViewingList;
  