import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Button, Paper } from "@mui/material";
import axios from "axios";
import { TUTOR_URL } from "../../constants/tutorConstants";
import { toast } from "react-toastify";
import FormHelperText from "@mui/material/FormHelperText";
import validateForm from "../../validattion/tutorRegister.js";
import { useNavigate } from "react-router-dom";
import { useTutorRegisterMutation } from "../../slices/tutorSlices/tutorApiSlice";
import { tutorApi, tutorApiToken } from "../../services/api";
import { setTutorCredentials } from "../../slices/tutorSlices/tutorAuthSlice";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function RegistrationForm({ tutor, profile }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    addressLine: "",
    addressLine2: "",
    state: "",
    country: "",
    city: "",
    zip: "",
    about: "",
  });

  const [tutorDetails, setTutorDetails] = useState(tutor);

  const navigate = useNavigate();

  const [tutorRegister, { isLoading }] = useTutorRegisterMutation();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    profile
      ? setTutorDetails((prev) => ({
          ...prev,
          [name]: value,
        }))
      : setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reg = true;

    const validationErrors = validateForm(formData);
    setErrors(validationErrors, reg);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const {
          firstName,
          lastName,
          email,
          mobile,
          password,
          addressLine,
          addressLine2,
          state,
          country,
          city,
          zip,
          about,
        } = formData;

        const res = await tutorRegister({
          firstName,
          lastName,
          email,
          password,
          mobile,
          addressLine,
          addressLine2,
          state,
          country,
          city,
          zip,
          about,
        }).unwrap();

        if (res) {
          const id = res._id;
          navigate("/tutor/otp", { state: id });
        }
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const reg = false;
    const id = tutorDetails.id;
    const validationErrors = validateForm(tutorDetails, reg);
    setErrors(validationErrors);
    console.log(validationErrors, "errors");
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await tutorApiToken.put(
          `edit_profile?id=${id}`,
          tutorDetails
        );
        if (res) {
          console.log(res);
          setTutorCredentials(res.data);
          toast.success("Profile updated");
          const updated = true;
          navigate("/tutor/profile");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <button
        className="flex flex-row items-center justify-center min-w-[130px] rounded-full font-medium tracking-wide border transition ease-in-out duration-150 text-base bg-white text-black border-transparent h-[38px] py-6 px-8 hover:bg-gray-300 hover:text-gray-900"
        onClick={() => setOpen(true)}
      >
        Click here to Register!
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-30">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex min-h-full min-w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <Paper
                sx={{ maxWidth: 800, mt: 1, ml: "auto", mr: "auto", p: 4 }}
              >
                <Typography
                  textAlign={"center"}
                  mb={5}
                  variant="h6"
                  gutterBottom
                >
                  {profile ? "Edit your porfile" : "Tutors Registration Form"}
                </Typography>

                <Box
                  component="form"
                  onSubmit={profile ? updateProfile : handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={
                          profile ? tutorDetails.firstName : formData.firstName
                        }
                        onChange={inputChangeHandler}
                      />
                      {errors.firstName && (
                        <FormHelperText error={true}>
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={
                          profile ? tutorDetails.lastName : formData.lastName
                        }
                        onChange={inputChangeHandler}
                      />
                      {errors.lastName && (
                        <FormHelperText error={true}>
                          {errors.lastName}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={profile ? tutorDetails.email : formData.email}
                        onChange={inputChangeHandler}
                      />
                      {errors.email && (
                        <FormHelperText error={true}>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={profile ? tutorDetails.mobile : formData.mobile}
                        onChange={inputChangeHandler}
                      />
                      {errors.mobile && (
                        <FormHelperText error={true}>
                          {errors.mobile}
                        </FormHelperText>
                      )}
                    </Grid>
                    {!profile && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="password"
                            name="password"
                            label="password"
                            type="password"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            value={
                              profile
                                ? tutorDetails.password
                                : formData.password
                            }
                            onChange={inputChangeHandler}
                          />
                          {errors.password && (
                            <FormHelperText error={true}>
                              {errors.password}
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            autoComplete="Confirm-password"
                            variant="standard"
                            value={
                              profile
                                ? tutorDetails.confirmPassword
                                : formData.confirmPassword
                            }
                            onChange={inputChangeHandler}
                          />
                          {errors.confirmPassword && (
                            <FormHelperText error={true}>
                              {errors.confirmPassword}
                            </FormHelperText>
                          )}
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="addressLine"
                        name="addressLine"
                        label="Address line 1"
                        fullWidth
                        autoComplete="address-line1"
                        variant="standard"
                        value={
                          profile
                            ? tutorDetails.addressLine
                            : formData.addressLine
                        }
                        onChange={inputChangeHandler}
                      />
                      {errors.addressLine && (
                        <FormHelperText error={true}>
                          {errors.addressLine}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address2"
                        name="address2"
                        label="Address Line2"
                        fullWidth
                        autoComplete="address-line2"
                        variant="standard"
                        value={
                          profile
                            ? tutorDetails.addressLine2
                            : formData.addressLine2
                        }
                        onChange={inputChangeHandler}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={profile ? tutorDetails.city : formData.city}
                        onChange={inputChangeHandler}
                      />
                      {errors.city && (
                        <FormHelperText error={true}>
                          {errors.city}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                        value={profile ? tutorDetails.state : formData.state}
                        onChange={inputChangeHandler}
                      />
                      {errors.state && (
                        <FormHelperText error={true}>
                          {errors.state}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        value={profile ? tutorDetails.zip : formData.zip}
                        onChange={inputChangeHandler}
                      />
                      {errors.zip && (
                        <FormHelperText error={true}>
                          {errors.zip}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={
                          profile ? tutorDetails.country : formData.country
                        }
                        onChange={inputChangeHandler}
                      />
                      {errors.country && (
                        <FormHelperText error={true}>
                          {errors.country}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="about"
                        name="about"
                        label="about"
                        fullWidth
                        variant="standard"
                        autoComplete="about"
                        value={profile ? tutorDetails.about : formData.about}
                        onChange={inputChangeHandler}
                      />
                      {errors.about && (
                        <FormHelperText error={true}>
                          {errors.about}
                        </FormHelperText>
                      )}
                    </Grid>
                    <div className="ml-auto mt-5">
                      <div className="flex gap-4 justify-end">
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                          {profile ? "Upadate" : "Submit"}
                        </button>
                      </div>
                    </div>
                  </Grid>
                </Box>
              </Paper>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
