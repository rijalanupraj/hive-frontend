import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Link,
  Card,
  Stack,

  Checkbox,

  Typography,
  CardHeader,
  IconButton,

  FormControlLabel
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { useNavigate } from "react-router-dom";
// // utils
// import { fDate } from "../../utils/formatTime";
// import { fShortenNumber } from "../../utils/formatNumber";
// components

import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";


// ----------------------------------------------------------------------


export default function SelectedQuestionCard() {
  return (
    <Card maxWidth="sm">
      <CardHeader
        disableTypography
        
        avatar={

            <MyAvatar />
     
        }
        title={
          <Link
            href="#"
            variant='subtitle2'
            color='text.primary'
          >
            Mamba
          </Link>
        }
        subheader={
          <Typography variant='caption' sx={{ display: "block", color: "text.secondary" }}>
           17 Jun 2022
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        }
      />

      <Stack spacing={0.5} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant='h6' align='justify'>
          How to open bank account?
        </Typography>

        <Typography variant='body1' align='justify'>
          I want to open a bank account but I don't know how to do it. What should I do?
        </Typography>

       

        {/* image */}

        <Stack direction='row' alignItems='center'>
          {/* write  */}
          <FormControlLabel
            control={
              <Link href="#">
                <IconButton>
                  <Iconify icon={"jam:write-f"} width={20} height={20} />
                </IconButton>
              </Link>
            }
            label='answer'
            sx={{ minWidth: 72, mr: 2 }}
          />
          {/* upvote */}
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                color='error'
                icon={<Iconify icon={"bx:upvote"} />}
                checkedIcon={<Iconify icon={"bx:upvote"} />}
              />
            }
            label='3'
            sx={{ minWidth: 72, mr: 0 }}
          />
          {/*  downvote */}
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                color='error'
                icon={<Iconify icon={"bx:downvote"} />}
                checkedIcon={<Iconify icon={"bx:downvote"} />}
              />
            }
            label='11'
            sx={{ minWidth: 72, mr: 0 }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <IconButton>
            <Iconify icon={"bi:bookmark-check"} width={20} height={20} />
          </IconButton>

          <IconButton>
            <Iconify icon={"ant-design:share-alt-outlined"} width={20} height={20} />
          </IconButton>
          <IconButton>
            <Iconify icon={"ic:outline-report-problem"} width={20} height={20} />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
