import RemoteApi from "../api/api";
import { useState, useEffect } from "react";

export function useApi(key) {
  const [data, setData] = useState([]);

  useEffect(() => {
    RemoteApi.fetchData().then((data) => {
      setData(data);
    });
  }, [key]);

  const saveData = (newData) => {
    RemoteApi.saveData(newData).then(() => {
      setData(newData);
    });
  };

  return [data, saveData];
}
