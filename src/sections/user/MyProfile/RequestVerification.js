import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useSnackbar } from "notistack";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";

// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import {
  RHFSwitch,
  RHFEditor,
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from "../../../components/hook-form";

//Internal Import
import {
  reportUser,
  requestVerification,
} from "../../../redux/actions/userActions";
import { Grid } from "@mui/material";

export default function RequestVerification() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RequestVerificationSchema = Yup.object().shape({
    contact: Yup.string()
      .required("Contact number is required")

      .min(10, "Phone number must be at least 10 characters"),

    address: Yup.string()
      .required("Permanent address is required")
      .max(100, "Permanent address must be at least 100 characters"),

    citizenshipNumber: Yup.string()
      .required("Citizenship is required")
      .min(3, "Citizenship must be at least 5 characters"),

    citizenshipImage: Yup.mixed(),
  });

  const defaultValues = {
    contact: "",
    address: "",
    citizenshipNumber: "",
    citizenshipImage: null,
  };

  const methods = useForm({
    resolver: yupResolver(RequestVerificationSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    console.log("hello");
    try {
      const formData = new FormData();
      formData.append("contact", values.contact);
      formData.append("address", values.address);
      formData.append("citizenshipNumber", values.citizenshipNumber);
      formData.append("citizenshipimage", values.citizenshipImage);
      dispatch(requestVerification(formData, enqueueSnackbar));
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "citizenshipImage",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="text"
        icon={"ic:outline-report-problem"}
        width={20}
        height={20}
      >
        Request Verification
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Request Verification</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2} textAlign="center">
            Please provide your detail to request verification.
          </DialogContentText>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="contact" label="Contact" />
              <RHFTextField name="citizenshipNumber" label="Citizenship No" />
              <RHFUploadSingleFile
                name="citizenshipImage"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
              />
              <LoadingButton
                type="submit"
                sx={{ mt: 2, mb: 2, width: "100%" }}
                variant="contained"
                loading={isSubmitting}
              >
                Request Verification
              </LoadingButton>
            </Stack>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
