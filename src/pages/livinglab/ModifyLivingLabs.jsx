import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import LivingLabAPI from "../../api/LivingLab";
import LivingLabTable from "../../componants/livinglab/LivingLabTable";
import LivingLabTableFilters from "../../componants/livinglab/LivingLabTableFilters";

const ModifyLivingLabs = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LivingLabAPI.getAllLivingLabs();
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching living lab data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((livingLab) =>
      livingLab.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <Paper>
      <LivingLabTableFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <LivingLabTable data={filteredData} setData={setData} />
    </Paper>
  );
};

export default ModifyLivingLabs;
