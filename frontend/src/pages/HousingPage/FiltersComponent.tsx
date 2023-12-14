import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface FiltersComponentProps {
  filters: any;
  onFilterChange: (name: string, checked: boolean) => void; // Update for handling filter change
}

const FiltersComponent: React.FC<FiltersComponentProps> = ({ filters, onFilterChange }) => {
  return (
    <FormGroup>
      <div>
        <div>Price</div>
        <FormControlLabel
          control={<Checkbox checked={filters.price} onChange={(e) => onFilterChange('price', e.target.checked)} />}
          label="$500 - $1000"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.price1k3k} onChange={(e) => onFilterChange('price1k3k', e.target.checked)} />}
          label="$1001 - $3000"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.price3k5k} onChange={(e) => onFilterChange('price3k5k', e.target.checked)} />}
          label="$3001 - $5000"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.price5k} onChange={(e) => onFilterChange('price5k', e.target.checked)} />}
          label="$5001 - more"
        />
      </div>
      <div>
        <div>Type</div>
        <FormControlLabel
          control={<Checkbox checked={filters.apartments} onChange={(e) => onFilterChange('apartments', e.target.checked)} />}
          label="Apartments"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.condos} onChange={(e) => onFilterChange('condos', e.target.checked)} />}
          label="Condos"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.houses} onChange={(e) => onFilterChange('houses', e.target.checked)} />}
          label="Houses"
        />
      </div>
      <div>
        <div>Beds</div>
        <FormControlLabel
          control={<Checkbox checked={filters.one} onChange={(e) => onFilterChange('one', e.target.checked)} />}
          label="1"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.two} onChange={(e) => onFilterChange('two', e.target.checked)} />}
          label="2"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.three} onChange={(e) => onFilterChange('three', e.target.checked)} />}
          label="3"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.fourPlus} onChange={(e) => onFilterChange('fourPlus', e.target.checked)} />}
          label="4+"
        />
      </div>
      <div>
        <div>Amenities</div>
        <FormControlLabel
          control={<Checkbox checked={filters.laundry} onChange={(e) => onFilterChange('laundry', e.target.checked)} />}
          label="Laundry Facilities"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.dishwasher} onChange={(e) => onFilterChange('dishwasher', e.target.checked)} />}
          label="Dish-Washer"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.ac} onChange={(e) => onFilterChange('ac', e.target.checked)} />}
          label="AC"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.parking} onChange={(e) => onFilterChange('parking', e.target.checked)} />}
          label="Parking"
        />
      </div>
    </FormGroup>
  );
};

export default FiltersComponent;
