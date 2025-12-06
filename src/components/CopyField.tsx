import { Switch, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";

const CopyField = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  return (
    <div className="w-[90%] flex flex-col items-center gap-4 p-4">
      <div className="flex align-center w-[65%] p-5 rounded-lg border-1 border-slate-300  hover:border-[#6258DC]  transition-all duration-300 ease-in-out mb-4 box-shadow-sm">
        <FormControlLabel
          control={
            <Switch
              onClick={() => {
                setIsChecked(!isChecked);
              }}
              checked={isChecked}
              size="medium"
            />
          }
          label="Enable Sharing"
          labelPlacement="start"
        />
      </div>
      <div
        className={`transition-all  duration-400 ease-in-out w-full ${isChecked ? "opacity-100" : "opacity-0"}`}
      >
        <TextField
          fullWidth
          label="Shareable Link"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default CopyField;
