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
  Button,
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
        <Stack direction="row" alignItems="center" sx={{ mb: 2, mt: 3 }}>
          <TextField
            fullWidth
            size="medium"
            placeholder="Search Question"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button size="medium" variant="outlined" >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              ml: 2,
              mr: 5,
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: (theme) =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
          />
          {/* <IconButton>
            <Iconify icon={"charm:search"} width={24} height={24} />
          </IconButton> */}
          <input type="file" style={{ display: "none" }} />
        </Stack>
      </Paper>
    </>
  );
};

export default SearchQuestion;
