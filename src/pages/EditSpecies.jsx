import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import SpeciesAPI from "../api/Species";
import SpeciesTable from "../componants/species/SpeciesTable";
import SpeciesTableFilters from "../componants/species/SpeciesTableFilters";

const natureRoles = ["Grazer", "Roofdier", "Opruimer"];
const categoriesRoles = ["Hoefdieren", "Roofdieren", "Overig"];

const EditSpecies = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

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
      const matchesSearch = species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            species.commonName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(species.category);
      const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(species.roleInNature);

      return matchesSearch && matchesCategory && matchesRole;
    });

    setFilteredData(filtered);
  }, [searchTerm, selectedCategories, selectedRoles, data]);

  return (
    <Paper>
      <SpeciesTableFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        categories={categoriesRoles}
        rolesInNature={natureRoles}
      />
      <SpeciesTable data={filteredData} setData={setData} categories={categoriesRoles} rolesInNature={natureRoles} />
    </Paper>
  );
};

export default EditSpecies;
