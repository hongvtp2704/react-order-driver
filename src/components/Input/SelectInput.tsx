import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

interface SelectProps {
  label: string;
  value: string;
  name: string;
  itemList: {
    id: string | number;
    value: string | number;
  }[];
  error?: boolean | undefined;
  onChange: (event: SelectChangeEvent) => void;
  errorMessage?: string | undefined;
  variant?: "filled" | "outlined" | "standard";
}

const SelectInput: React.FC<SelectProps> = ({
  label,
  value,
  name,
  itemList,
  error,
  onChange,
  errorMessage,
  variant,
}): React.ReactElement => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant={variant || "filled"}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name={name}
          error={error}
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
        >
          {itemList.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
