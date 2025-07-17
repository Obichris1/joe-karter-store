"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

export default function NewsletterModal() {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("newsletterModalShown");

    if (!hasSeenModal) {
      const timeout = setTimeout(() => {
        setShow(true);
        localStorage.setItem("newsletterModalShown", "true");
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, []);

  if (!show) return null;

  return (
    <Dialog
      open={show}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        className: "!rounded-2xl",
        style: {
          backgroundColor: "black",
          padding: isMobile ? "1.5rem" : "2rem",
        },
      }}
    >
      <DialogTitle
        className="!text-white !text-center !p-0"
        sx={{ position: "relative" }}
      >
        <IconButton
          onClick={() => setShow(false)}
          className="!text-white !absolute right-2 top-2"
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent className="flex flex-col items-center text-white w-full !p-0">
        <div className="flex justify-center pb-3">
          <Image src="/Jk.png" alt="Joe Karter Logo" width={50} height={50} />
        </div>

        <h2 className="text-base sm:text-xl font-semibold mb-2 text-center">
          SUBSCRIBE TO OUR NEWSLETTER
        </h2>

        <p className="mb-6 text-sm sm:text-sm leading-6 text-center ">
          Discover fashion that speaks your vibe. Curated trends, timeless
          pieces, and effortless style—because you deserve to stand out.
        </p>

        <TextField
          type="email"
          placeholder="Please enter your email"
          fullWidth
          InputProps={{
            className:
              "bg-white !text-black !px-4 !text-sm !rounded-full h-11 sm:h-12 w-full",
          }}
          variant="outlined"
          className="!mb-4"
        />

        <DialogActions className="!justify-center w-full">
          <Button
            variant="contained"
            className="!bg-white !text-black !font-bold !rounded-full !px-6 !py-3 !text-xs sm:!text-sm"
          >
            SUBSCRIBE
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
