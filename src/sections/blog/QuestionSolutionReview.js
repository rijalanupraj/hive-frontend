import PropTypes from "prop-types";
// @mui
import {
  Box,
  Chip,
  Avatar,
  Checkbox,
  AvatarGroup,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
// utils
import { fShortenNumber } from "../../utils/formatNumber";
// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

export default function QuestionSolutionsReview() {
  return (
    <Box sx={{ py: 3 }}>
      
        <Stack direction="row" alignItems="center">
          {/* upvote  */}
          <IconButton>
            <Iconify icon={"bx:upvote"} width={30} height={30} />
          </IconButton>
          <Typography variant="caption">10K</Typography>

          <IconButton>
            <Iconify icon={"bx:downvote"} width={30} height={30} />
          </IconButton>
          <Typography variant="caption">1k</Typography>
          {/* comment */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                icon={<Iconify icon={"fa-regular:comment"} />}
                checkedIcon={<Iconify icon={"fa-regular:comment"} />}
              />
            }
            label="5"
            sx={{ minWidth: 72, mr: 0, ml: 1 }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <IconButton>
            <Iconify icon={"bi:bookmark-check"} width={30} height={30} />
          </IconButton>

          <IconButton>
            <Iconify
              icon={"ant-design:share-alt-outlined"}
              width={30}
              height={30}
            />
          </IconButton>
          <IconButton>
            <Iconify
              icon={"ic:outline-report-problem"}
              width={30}
              height={30}
            />
          </IconButton>
        </Stack>

    </Box>
  );
}
