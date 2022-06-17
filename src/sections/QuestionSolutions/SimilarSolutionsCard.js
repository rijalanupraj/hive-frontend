import PropTypes from "prop-types";
import { paramCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Card,
  Avatar,
  Typography,
  CardContent,
  Stack,
} from "@mui/material";
// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from "../../hooks/useResponsive";
// utils
import { fDate } from "../../utils/formatTime";
import { fShortenNumber } from "../../utils/formatNumber";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import TextMaxLine from "../../components/TextMaxLine";
import TextIconLabel from "../../components/TextIconLabel";
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const OverlayStyle = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

const POST_INFO = [
  { number: '10', icon: "bx:upvote"},
  { number: '1', icon: "bx:downvote"},
  { number: '7', icon: "fa-regular:comment"},
  { number: "13", icon: "carbon:view" },

];

// ----------------------------------------------------------------------

export default function SimilarSolutionsCard() {
  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center", pt: 4.5, ml:3}} >
        
          <Avatar
            alt="experts"
            src="https://www.meme-arsenal.com/memes/d4390d0c25041eb621629a73334d6c24.jpg"
            sx={{ width: 42, height: 42 }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" >
              Mamba Dai
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              {/* {fDate(createdAt)} */} 14 Jun 2022
            </Typography>
          </Box>
        

        {/* <Image alt="cover" src="https://www.themarysue.com/wp-content/uploads/2022/05/FTTzceRX0AEe4ib.jpg" ratio="4/3" /> */}
      </Box>

      <CardContent
        sx={{
          pt: 3,
          width: 1,
        }}
      >
       

        <Link to="/" color="inherit">
          <TextMaxLine variant="subtitle2" line={2} persistent>
            Opening a Bank Account in Nepal is.....
          </TextMaxLine>
        </Link>

        <Stack flexWrap="wrap" direction="row" justifyContent="flex-end">
          {POST_INFO.map((info, index) => (
            <TextIconLabel
              key={index}
              icon={
                <Iconify
                  icon={info.icon}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                />
              }
              value={fShortenNumber(info.number)}
              sx={{ typography: "caption", ml: index === 0 ? 0 : 1.5 }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------
