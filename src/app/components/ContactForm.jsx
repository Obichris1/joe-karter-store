
import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  NumberTypography,
  InputAdornment,
  CircularProgress,
  MenuItem,
} from "@mui/material";

import {
  AiFillMail,
  AiOutlineUser,
  AiFillCheckCircle,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineCheckCircle,
} from "react-icons/ai";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
    questionaire: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rawDate, setRawDate] = useState(""); // Stores ISO format (YYYY-MM-DD)
  // const [formattedDate, setFormattedDate] = useState("No date selected"); //
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Always reference the latest state
    }));
  };
  console.log(formData);

  // const handleDate = (event) => {
  //   const selectedDate = event.target.value; // ISO date string
  //   setRawDate(selectedDate); // Update the raw date state

  //   if (selectedDate) {
  //     // Format and update the formatted date state
  //     const parsedDate = new Date(selectedDate);
  //     setFormattedDate(format(parsedDate, "MMMM d, yyyy"));
  //   } else {
  //     setFormattedDate("No date selected");
  //   }
  // };

  const payload = {
    ...formData,
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });     

      console.log(response);

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setStatus("Message sent successfully!");
        setSuccess(true);
      } else {
        setStatus("Error sending message. ");
      }

      setFormData({
        name: "",
        email: "",
        message: "",
        phoneNumber: "",
        questionaire: "",
      });
      setRawDate("");
    } catch (error) {
      setStatus("Errorrrrrrrrrrrrrrrrrrrrr");
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  // Get today's date in ISO format for the `min` attribute
  // const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={` ${success ? "hidden" : "flex flex-col gap-8"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <label htmlFor="name">Name:</label> */}
          <TextField
            type="text"
            id="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            required
            className=""
            // margin="normal"
            label="Full Name"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineUser />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* <label htmlFor="email">Email:</label> */}
          <TextField
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            label="Email"
            // margin="normal"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlineMail />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* <label htmlFor="message">Message:</label> */}

          <TextField
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={formData?.phoneNumber || ""}
            onChange={handleChange}
            required
            label="Phone Number"
            // margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AiOutlinePhone />
                  </InputAdornment>
                ),
              },
            }}
          />

   

          <TextField
            label="How did you hear about us?"
            variant="outlined"
            fullWidth
            select
            onChange={handleChange}
            value={formData?.questionaire || ""}
            name="questionaire"
          >
            <MenuItem value="Instagram" className="text-primary-main">
              Instagram
            </MenuItem>
            <MenuItem value="Facebook" className="text-primary-main">
              Facebook
            </MenuItem>

            <MenuItem value="twitter" className="text-primary-main">
              X (twitter)
            </MenuItem>
            <MenuItem value="Paper Flyers" className="text-primary-main">
              Paper Flyers
            </MenuItem>
            <MenuItem value="From a Friend" className="text-primary-main">
              From a Friend
            </MenuItem>
            <MenuItem value="Other" className="text-primary-main">
              Other
            </MenuItem>
          </TextField>

          <TextField
            type="text"
            name="message"
            required
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            aria-label="maximum height"
            // margin="normal"
            label="Describe a shoe to us"
          />
        </div>

        <Button
          type="submit"
          className="!px-4 !py-3 md:!text-xl !self-start !bg-black !text-white hover:scale-105 hover:shadow-md transition-transform  capitalize font-bold rounded-full text-sm"
        >
          {isLoading ? (
             <CircularProgress size={20} sx={{ color: "#000", fontSize:"2px" }} />
          ) : (
            <Typography className="!text-sm !font-semibold ">Submit</Typography>
          )}
        </Button>
      </form>

      {success && (
        <div className="bg-green-200 p-4 my-10 rounded-xl flex justify-center items-center gap-5 w-full md:max-w-6xl m-auto  ">
          <AiOutlineCheckCircle className="text-2xl" />
          <Typography className="text-xs md:text-sm ">
            Thank you for contacting Joe Karter! We will be in touch
            with you shortly.
          </Typography>
        </div>
      )}
    </>
  );
}
