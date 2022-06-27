import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Divider,
  Collapse,
} from "@mui/material";

import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import MyAvatar from "../../../components/MyAvatar";
import EmojiPicker from "../../../components/EmojiPicker";

const SearchQuestion = () => {
  return (
    <>
      <Paper>
        {/* write comment */}
        <Stack direction="row" alignItems="center" sx={{ mb: 2, mt:4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search Question"
            sx={{
              ml: 2,
              mr: 1,
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: (theme) =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          <IconButton>
            <Iconify icon={"ic:round-send"} width={24} height={24} />
          </IconButton>
          <input type="file" style={{ display: "none" }} />
        </Stack>

    
        
      </Paper>
    </>
  );
};

export default SearchQuestion;
