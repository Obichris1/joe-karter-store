"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { TextField, MenuItem,Box,CircularProgress } from "@mui/material";
import { motion } from "framer-motion"; // <-- import framer-motion

async function getEvent() {
  const query = `*[_type == "eventTicket"][0]{
    title,
    date,
    description,
    location,
    "bannerImageUrl": bannerImage.asset->url,
    tickets[] {
      name,
      price,
      checkoutUrl
    }
  }`;
  return await client.fetch(query);
}

export default function EventPage() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    const events = async () => {
      const eventResult = await getEvent();
      setEvent(eventResult);
      setLoading(false)
    };
    events();
  }, []);
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
         <CircularProgress size={25}sx={{ color: "#000", fontSize:"2px" }} />
      </Box>
    );
  }

  if (!event || !event.tickets || event.tickets.length === 0) {
    return (
      <Typography
        variant="body1"
        color="textSecondary"
        align="center"
        sx={{ py: 4 }}
      >
        No events now
      </Typography>
    );
  }

  return <EventDetails event={event} />;
}

function EventDetails({ event }) {
  const [selectedTicket, setSelectedTicket] = useState(event.tickets?.[0]);

  return (
    <div className="flex flex-col gap-8 items-start justify-center mx-auto w-[90%] py-10">
      <p className="text-2xl md:text-3xl font-bold">
        NBD athleisure presents: The Playground
      </p>

      <div className="event-landing gap-16 flex flex-col md:flex-row items-start">
        {/* Event Image */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {event.bannerImageUrl && (
            <Image
              src={event.bannerImageUrl}
              alt={event.title}
              width={450}
              height={450}
              className="rounded-2xl shadow-lg border border-gray-200"
            />
          )}
        </motion.div>

        {/* Event Details */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-xl md:text-2xl font-bold mb-4">{event.title}</h1>

          <div className="space-y-3 text-lg">
            <p className="text-sm md:text-base leading-7">
              <span className="font-bold">Date & Time: </span>
              {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-sm md:text-base leading-7">
              <span className="font-bold leading-7">Location: </span>
              {event.location}
            </p>
            <p className="text-sm md:text-base leading-7">
              <span className="font-bold">Description: </span>
              {event.description}
            </p>
          </div>

          {/* Ticket Selector */}
          {event.tickets?.length > 0 && (
            <div className="mt-8">
              <label className="block mb-2 font-bold text-base">
                Select Ticket:
              </label>

              <TextField
                select
                variant="outlined"
                value={selectedTicket?.name || ""}
                onChange={(e) =>
                  setSelectedTicket(
                    event.tickets.find((t) => t.name === e.target.value)
                  )
                }
                sx={{
                  minWidth: 250,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                  },
                }}
              >
                {event.tickets.map((ticket) => (
                  <MenuItem key={ticket.name} value={ticket.name}>
                    {ticket.name} — ₦{ticket.price.toLocaleString()}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}

          {/* Selected Ticket Price & Button */}
          {selectedTicket && (
            <div className="flex flex-col md:items-end">
              <h2 className="text-lg font-bold mt-8">
                Price: ₦{selectedTicket.price}
              </h2>

              <a
                href={selectedTicket.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="mt-4 px-8 py-3 text-sm md:text-base bg-black text-white rounded-lg transition-all shadow-md hover:bg-gray-800">
                  Buy {selectedTicket.name}
                </button>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
