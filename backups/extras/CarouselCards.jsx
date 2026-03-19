"use client";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef } from "react";

const CarouselCard = ({ items = [] }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "50%",
        p: 2,
        border: "1px solid black",
      }}
    >
      {/* Left Button */}
      <IconButton
        onClick={scrollLeft}
        sx={{
          position: "absolute",
          left: -10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "background.paper",
          boxShadow: 2,
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <MdChevronLeft size={28} />
      </IconButton>

      {/* Scroll Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          p: 5,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((item, idx) => (
          <Card
            key={idx}
            sx={{
              minWidth: 250,
              height: 180,
              flexShrink: 0,
              borderRadius: 3,
              boxShadow: 4,
              p: 1,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Right Button */}
      <IconButton
        onClick={scrollRight}
        sx={{
          position: "absolute",
          right: -10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "background.paper",
          boxShadow: 2,
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <MdChevronRight size={28} />
      </IconButton>
    </Box>
  );
};

export default CarouselCard;
