import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadHousing } from "../../store/housing";
import { Housing } from "../../models/housing";
import HousingCard from "./HousingCard";
import FiltersComponent from "./FiltersComponent";
import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { HousingHeader } from "./HousingHeader";

interface FiltersState {
  upto1K: boolean;
  upto3K: boolean;
  upto5K: boolean;
  price5k: boolean;
  more5K: boolean;
  apartments: boolean;
  condos: boolean;
  houses: boolean;
  one: boolean;
  two: boolean;
  three: boolean;
  fourPlus: boolean;
  laundry: boolean;
  dishwasher: boolean;
  ac: boolean;
  parking: boolean;
}

const HousingPage: React.FC = () => {
  const housing = useSelector((state: any) => state.entities.housing.list);
  const dispatch = useDispatch();
  const [filteredHousing, setFilteredHousing] = useState<Housing[]>(housing);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<FiltersState>({
    upto1K: false,
    upto3K: false,
    upto5K: false,
    price5k: false,
    more5K: false,
    apartments: false,
    condos: false,
    houses: false,
    one: false,
    two: false,
    three: false,
    fourPlus: false,
    laundry: false,
    dishwasher: false,
    ac: false,
    parking: false,
  });

  useEffect(() => {
    // Mock data fetching
    dispatch(loadHousing());
  }, []);

  const handleSearchChange = (
    housingLocation: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = housingLocation.target.value;
    setSearchQuery(query);
    applyFilters(query, filters);
  };

  const applyFilters = (query: string, filterOptions: FiltersState) => {
    let result = housing.filter((housing: Housing) => {
      const queryCheck = housing.location
        .toLowerCase()
        .includes(query.toLowerCase());
      const priceCheck =
        !filterOptions.upto1K ||
        (housing.price >= 500 && housing.price <= 1000) ||
        !filterOptions.upto3K ||
        (housing.price >= 1001 && housing.price <= 3000) ||
        !filterOptions.upto5K ||
        (housing.price >= 3001 && housing.price <= 5000) ||
        !filterOptions.more5K ||
        housing.price > 5000;

      const typeCheck =
        (!filterOptions.apartments || housing.type.includes("Apartment")) &&
        (!filterOptions.condos || housing.type.includes("Condo")) &&
        (!filterOptions.houses || housing.type.includes("House"));

      const bedsCheck =
        (!filterOptions.one || housing.beds.toString().includes("1")) &&
        (!filterOptions.two || housing.beds.toString().includes("2")) &&
        (!filterOptions.three || housing.beds.toString().includes("3")) &&
        (!filterOptions.fourPlus || housing.beds.toString().includes("4+"));

      const amenitiesCheck =
        (!filterOptions.laundry || housing.amenities1.includes("laundry")) &&
        (!filterOptions.dishwasher ||
          housing.amenities2.includes("Dishwasher")) &&
        (!filterOptions.ac || housing.amenities3.includes("AC")) &&
        (!filterOptions.parking || housing.amenities4.includes("Parking"));
    });
    setFilteredHousing(result);
  };

  const handleFilterChange = (name: string, checked: boolean) => {
    const newFilters = { ...filters, [name]: checked };
    setFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  const saveHousing = (houseID: string) => {
    console.log(houseID);
  };

  //   const focusEventOnMap = (location: string) => {
  //     alert(location)
  //   };

  return (
    <>
      <HousingHeader />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Paper
              elevation={3}
              sx={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                p: 2,
                borderRight: "1px solid #ccc",
                mb: 2,
              }}
            >
              <FiltersComponent
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              fullWidth
              sx={{ paddingBottom: "10px" }}
              label="Search Location"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {filteredHousing.map((housing) => (
              <HousingCard
                key={housing._id}
                housing={housing}
                onSave={saveHousing}
              />
            ))}
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <MapView events={filteredHousing} onLocationSelect={focusEventOnMap}/>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default HousingPage;
