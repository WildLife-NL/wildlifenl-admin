import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import SpeciesAPI from "../api/Species";
import SpeciesTable from "../componants/species/SpeciesTable";
import SpeciesTableFilters from "../componants/species/SpeciesTableFilters";

const EditSpecies = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SpeciesAPI.getAllSpecies();
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching species data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((species) => {
      const matchesSearch =
        species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        species.commonName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !categoryFilter || species.category.toLowerCase().includes(categoryFilter.toLowerCase());

      const matchesRole =
        !roleFilter || species.roleInNature.toLowerCase().includes(roleFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesRole;
    });

    setFilteredData(filtered);
  }, [searchTerm, categoryFilter, roleFilter, data]);

  return (
    <Paper>
      <SpeciesTableFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />
      <SpeciesTable data={filteredData} setData={setData} />
    </Paper>
  );
};

export default EditSpecies;
