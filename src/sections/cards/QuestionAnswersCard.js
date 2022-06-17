
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

  FormControlLabel,
  Divider
} from "@mui/material";

import Image from "../../components/Image";

// utils

// import { fShortenNumber } from "../../../utils/formatNumber";

import Iconify from "../../components/Iconify";
import MyAvatar from "../../components/MyAvatar";


// ----------------------------------------------------------------------

export default function QuestionAnswersCard() {

  return (
    <Card
      style={{
        marginTop: "1rem",
        marginBottom: "1rem"
      }}
    >
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
            Flying Slipper
          </Link>
        }
        subheader={
          <Typography variant='caption' sx={{ display: "block", color: "text.secondary" }}>
            17 Jun 2022
          </Typography>
        }
        action={
          <IconButton>
            <Iconify icon={"charm:circle-cross"} width={20} height={20} color="red"/>
          </IconButton>
        }

      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {/* Question */}
        <Typography variant='h6' align='justify'>
        Being pretty isn't about looking cute, hot or gorgeous.
        </Typography>

        {/* Answer */}
        <Typography variant="inherit" align='justify'>
        It’s not that you’re ugly, it’s that you don’t find yourself attractive. 
        That’s ok though, because you’re not gonna date yourself.
         There’s gonna be people who will find you attractive and people who don’t, 
         everyone has different tastes.
        </Typography>
        

        {/* image optional */}

        {/* <Image
          alt='post media'
          src='https://www.thebalance.com/thmb/vL5vZOQdtTcrRaT-c9cOahUS1_Y=/1500x1000/filters:fill(auto,1)/how-can-i-easily-open-bank-accounts-315723-FINAL-051b5ab589064905b1de8181e2175172.png'
          ratio='4/3'
          sx={{ borderRadius: 1 }}
        /> */}
        <Divider />
        <Stack direction='row' alignItems='center'>
        
          {/* upvote  */}
          <IconButton >
            <Iconify icon={"bx:upvote"} width={20} height={20} />
          </IconButton>
          <Typography variant='caption'>12</Typography>

          <IconButton>
            <Iconify icon={"bx:downvote"} width={20} height={20} />
          </IconButton>
          <Typography variant='caption'>14</Typography>
          {/* comment */}
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                color='error'
                icon={<Iconify icon={"fa-regular:comment"} />}
                checkedIcon={<Iconify icon={"fa-regular:comment"} />}
              />
            }
            label='5'
            sx={{ minWidth: 72, mr: 0, ml: 1 }}
          />

          <Box sx={{ flexGrow: 1 }} />

            <IconButton >
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
