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
        <div>Categories:</div>
        <FormControlLabel
          control={<Checkbox checked={filters.meetAndGreet} onChange={(e) => onFilterChange('meetAndGreet', e.target.checked)} />}
          label="Meet and Greet"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.food} onChange={(e) => onFilterChange('food', e.target.checked)} />}
          label="Food"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.speakerSeries} onChange={(e) => onFilterChange('speakerSeries', e.target.checked)} />}
          label="Speaker Series"
        />
      </div>
      <div>
        <div>Location:</div>
        <FormControlLabel
          control={<Checkbox checked={filters.onCampus} onChange={(e) => onFilterChange('onCampus', e.target.checked)} />}
          label="On Campus"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.offCampus} onChange={(e) => onFilterChange('offCampus', e.target.checked)} />}
          label="Off Campus"
        />
      </div>
      <div>
        <div>Pricing:</div>
        <FormControlLabel
          control={<Checkbox checked={filters.free} onChange={(e) => onFilterChange('free', e.target.checked)} />}
          label="Free"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.paid} onChange={(e) => onFilterChange('paid', e.target.checked)} />}
          label="Paid"
        />
      </div>
      <div>
        <div>Type:</div>
        <FormControlLabel
          control={<Checkbox checked={filters.virtual} onChange={(e) => onFilterChange('virtual', e.target.checked)} />}
          label="Virtual"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.inPerson} onChange={(e) => onFilterChange('inPerson', e.target.checked)} />}
          label="In-person"
        />
      </div>
    </FormGroup>
  );
};

export default FiltersComponent;
