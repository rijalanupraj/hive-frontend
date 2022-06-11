import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
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
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// utils
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
// components
import Image from "../../../components/Image";
import Iconify from "../../../components/Iconify";
import MyAvatar from "../../../components/MyAvatar";
import EmojiPicker from "../../../components/EmojiPicker";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = name => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  chat: getIcon("ic_chat"),
};


ProfilePostCard.propTypes = {
  post: PropTypes.object,
};

export default function QuestionPostCard() {
  const commentInputRef = useRef(null);

  const fileInputRef = useRef(null);

  const [isLiked, setLiked] = useState(post.isLiked);

  const [likes, setLikes] = useState(post.personLikes.length);

  const [message, setMessage] = useState("");

  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClickComment = () => {
    commentInputRef.current?.focus();
  };

  return (
    <Card
      style={{
        border: "2px solid #e0e0e0",
        marginTop: "1rem",
      }}
    >
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link
            to="#"
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            Mamba
          </Link>
          
        }
        
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {/* {fDate(post.createdAt)} */} 11 June 2020
          </Typography>
          
        }
        action={
          <IconButton>
            <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
          </IconButton>
        }
        // action={
        //   <LoadingButton
        //     fullWidth
        //     size="small"
        //     type="submit"
        //     variant="contained"
        //   >
        //     Follow
        //   </LoadingButton>
        // }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant='h6' align="justify" >How to make a passport?</Typography>

        <Typography variant='inherit' align="justify">
       5 Answers
        </Typography>


         {/* image */}

        <Stack direction="row" alignItems="center">
          
          {/* upvote  */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
                checked={isLiked}
                icon={<Iconify icon={"bxs:upvote"} />}
                checkedIcon={<Iconify icon={"bxs:upvote"} />}
                onChange={isLiked ? handleUnlike : handleLike}
              />
            }
            label={fShortenNumber(likes)}
            sx={{ minWidth: 72, mr: 0 }}
          />
          {/*  downvote */}
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="error"
             
                icon={<Iconify icon={"bxs:downvote"} />}
                checkedIcon={<Iconify icon={"bxs:downvote"} />}
                
              />
            }
            label='11'
            sx={{ minWidth: 72, mr: 0 }}
          />
          
          

     
          <Box sx={{ flexGrow: 1 }} />
         
          <IconButton>
            <Iconify icon={"el:share-alt"} width={20} height={20} />
          </IconButton>
          <IconButton onClick={handleClickComment}>
            <Iconify icon={"ic:baseline-report-problem"} width={20} height={20} />
          </IconButton>

          
        </Stack>

       

        
       
        {/* <Typography variant="h6">
        View more comments    
        </Typography> */}
        <Link href="/" sx={{ color: "text.secondary" }} mt={-5}>
        View more comments
        </Link>
      </Stack>
    </Card>
  );
}
