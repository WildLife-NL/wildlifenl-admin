import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import BelongingAPI from "../../api/Belonging";
import BelongingTable from "../../componants/belongings/BelongingTable";
import BelongingTableFilters from "../../componants/belongings/BelongingTableFilter"

const ModifyBelonging = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BelongingAPI.getAllBelongings();
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching belongings", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((belonging) => {
      const matchesSearch =
        belonging.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;

      const matchesCategory =
        !categoryFilter || belonging.category?.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    setFilteredData(filtered);
  }, [searchTerm, categoryFilter, data]);

  return (
    <Paper>
      <BelongingTableFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <BelongingTable data={filteredData} setData={setData} />
    </Paper>
  );
};

export default ModifyBelonging;