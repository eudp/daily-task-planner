import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    marginLeft: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

const SearchType = ({ searchType, handleTypeChange, classes }) => {

  return (
    <div className={classes.root}>
      <FormControl
        required
        className={classes.formControl}
      >
        <RadioGroup
          aria-label="Type of search"
          name="search-type"
          className={classes.group}
          value={searchType}
          onChange={handleTypeChange}
          row
        >
          <FormControlLabel value="default" control={<Radio />} label="Default"/>
          <FormControlLabel value="week" control={<Radio />} label="Week" />
          <FormControlLabel value="month" control={<Radio />} label="Month" />
        </RadioGroup>
      </FormControl>
    </div>
  );
  
}


export default withStyles(styles)(SearchType);
