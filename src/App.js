import "./App.css";
import { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";
import { useFetchAge } from "./hooks/fetchAge";

function App() {
  const headers = ["Id", "Name", "Gender", "Age", "Address", "Phone"];
  const URL = `http://hapi.fhir.org/baseR4/Patient?_pretty=true`;
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const actualData = useFetchAge(URL, minVal, maxVal);
  const [filteredData, setFilteredData] = useState(actualData);
  useEffect(() => {
    let dataCopy = [];
    actualData.forEach((item) => {
      let temp = { ...item };
      temp.age = item?.age === 0 ? "NA" : item.age;
      if (item.age >= minVal && item.age <= maxVal) {
        dataCopy.push(temp);
      }
    });
    setFilteredData(dataCopy);
  }, [actualData, maxVal, minVal]);
  const getRange = (min, max) => {
    setMinVal(min);
    setMaxVal(max);
  };
  return (
    <>
      <RangeSlider getRange={getRange} />
      <div className="mainContainer">
        <h4>Scrollable Table</h4>
        <table className="tableMain">
          <th className="tableHeader">
            {headers.map((item) => (
              <td
                style={{ border: "1px solid black", padding: "10px" }}
                className="tableCells"
                key={item}
              >
                {item}
              </td>
            ))}
          </th>
          <tbody style={{ border: "1px solid black" }}>
            {filteredData.length > 0 &&
              filteredData.map((item) => (
                <tr
                  style={{ border: "1px solid black" }}
                  key={item.id}
                  className="tableForm"
                >
                  {item &&
                    Object.keys(item).map((x) => (
                      <td className="tableCells">{item[x]}</td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
