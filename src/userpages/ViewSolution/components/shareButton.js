import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Chip } from "@mui/material";
import { Instagram, Mail } from "@mui/icons-material";
const shareUrl = `${window.location.href}`;
const title = `${document.title}`;

export default function SharesolutionButton(solution) {
  return (
    <div>
      <DialogContent>
        <DialogActions>
          <EmailShareButton
            url={
              shareUrl +
              "https://ied.eu/wp-content/uploads/2016/03/solution.jpg"
            }
            subject={title}
            imageURL="https://ied.eu/wp-content/uploads/2016/03/solution.jpg"
          >
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
          <FacebookShareButton
            url={shareUrl}
            quote={solution?.solution?.question?.title}
            // hashtag={solution?.solution?.tags[0]}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            title={title}
            url={shareUrl}
            imageURL="https://ied.eu/wp-content/uploads/2016/03/solution.jpg"
            hashtags={solution?.solution?.tags}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </DialogActions>
      </DialogContent>
    </div>
  );
}
