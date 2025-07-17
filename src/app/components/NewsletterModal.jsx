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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export default function NewsletterModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <Dialog
      open={show}
      maxWidth="xs"
      PaperProps={{
         className : "!rounded-2xl"
      }}
     
   
    >
      <DialogTitle
        className="!text-white !text-center w-full !flex !justify-end !p-0"
        sx={{ position: "relative" }}
      >
        <IconButton
          onClick={() => setShow(false)}
          className="!text-white !absolute right-2 top-2"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="flex bg-black flex-col items-center text-white w-full !py-10 !px-8">
      <div className="flex justify-center pb-1">
        <Image
          src="/Jk.png"
          alt="Joe Karter Logo"
          width={60}
          height={60}
        />
      </div>
        <h2 className="text-xl font-semibold mb-2">
          SUBSCRIBE TO OUR NEWSLETTER
        </h2>
        <p className="mb-6 px-8 py-2 text-sm">
          Discover fashion that speaks your vibe. Curated trends, timeless
          pieces, and effortless style—because you deserve to stand out.
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          variant="outlined"
          className="!mb-4 bg-white text-black px-4 outline-none mx-auto !w-[90%] rounded-full h-12"
         
        />

        <DialogActions className="!justify-center w-full">
          <Button
            variant="contained"
            className="!bg-white !text-black !font-bold !rounded-full w-"
          >
            SUBSCRIBE
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
