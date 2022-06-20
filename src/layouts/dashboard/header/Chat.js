import React from "react";

import { Badge, Link } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { IconButtonAnimate } from "../../../components/animate";
import { useState } from "react";

const Chat = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  return (
    <>
      <Link href="/chat">
        <IconButtonAnimate
          color={open ? "primary" : "default"}
          onClick={handleOpen}
          sx={{ width: 50, height: 50 }}
        >
          <Badge badgeContent="0" color="error">
            <Iconify icon="bi:chat-fill" width={25} height={25} />
          </Badge>
        </IconButtonAnimate>
      </Link>
    </>
  );
};

export default Chat;
