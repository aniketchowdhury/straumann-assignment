import { useEffect, useState } from "react";
/*
hooks which fetches data and returns the patient data
*/
export const useFetchAge = (URL) => {
  const [data, setData] = useState([]);
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? 0 : age;
  }
  const getName = (name) => {
    let resName = name[0];
    resName = resName?.family + " " + resName?.given.join(" ");
    return resName;
  };
  const getAddress = (address) => {
    if (!Array.isArray(address)) return "NA";
    let resAddress = address[0] ?? "";
    return resAddress?.city ?? "";
  };
  const getPhone = (phone) => {
    if (!Array.isArray(phone)) return "NA";
    let resPhone = phone[0] ?? "";
    return resPhone?.value ?? "";
  };
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL);
      if (res.ok) {
        const result = await res.json();
        let arr = [];
        result.entry.forEach((element) => {
          let obj = {};
          obj["id"] = element.resource?.id;
          obj["name"] = getName(element.resource?.name);
          obj["gender"] = element.resource?.gender ?? "NA";
          obj["age"] = getAge(element.resource?.birthDate);
          obj["address"] = getAddress(element.resource?.address);
          obj["phone"] = getPhone(element.resource?.telecom);
          arr.push(obj);
        });
        setData(arr);
      }
    };
    getData();
  }, [URL]);
  return data;
};
