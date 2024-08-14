import React, { useEffect } from "react";
import { displayFieldValue, getFieldNames } from "../utils/fieldFormatting";

const GenericList = ({ list, fields, onClick = null }) => {
  useEffect(() => {
    console.log("list loaded");
    console.table(list);
  }, [list]);

  return (
    <div>
      {onClick && (
        <div className="flex justify-end mb-2">
          <button className="btn btn-icon" onClick={() => onClick("add")}>
            <span className="material-symbols-outlined align-middle">add</span>
          </button>
        </div>
      )}
      {!onClick && (
        <div className="mb-20">{" "}</div>
      )}
      <ul className="list">
        {list.map((item) => (
          <li className="list-item" key={item._id}>
            <div className="flex justify-between items-center">
              <h3>{item.name}</h3>
              <div className="grow">
                {Object.keys(fields).map((field) => (
                  <div key={field}>
                    <label>{getFieldNames(field)}: </label>
                    <span>{displayFieldValue(fields[field], item[field])}</span>
                  </div>
                ))}
              </div>
              {onClick && (
                <div className="flex space-x-2">
                  <button
                    className="btn btn-icon hover:bg-gray-300"
                    onClick={() => onClick("edit", item)}
                  >
                    <span className="material-symbols-outlined align-middle">
                      edit
                    </span>
                  </button>
                  <button
                    className="btn btn-icon hover:bg-gray-300"
                    onClick={() => onClick("delete", item)}
                  >
                    <span className="material-symbols-outlined align-middle">
                      delete
                    </span>
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenericList;
