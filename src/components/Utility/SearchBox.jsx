import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchBox = ({ searchChange, place }) => {
  return (
    <div>
      <TextField
        variant="outlined"
        style={{ marginBottom: 15, marginTop: 15, width: 400 }}
        placeholder={place}
        type="search"
        onChange={searchChange}
        size="medium"
        InputProps={{
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBox;
