import { Box, IconButton, Divider, TextField, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import MicIcon from "@mui/icons-material/Mic";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Commentbox = () => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        padding: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        maxWidth: { lg: "80%" },
        border: "1px solid #ccc", // Light border for better visibility
      }}
    >
      {/* Icons Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side Icons */}
        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton sx={{ color: "black" }}>
            <AttachFileIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <SentimentSatisfiedAltIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <MicIcon />
          </IconButton>
        </Box>

        {/* Right Side Add Icon */}
        <IconButton sx={{ color: "black" }}>
          <AddCircleIcon />
        </IconButton>
      </Box>

      {/* Input Field & Send Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "5px",
          gap: "10px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          InputProps={{
            sx: {
              height: "35px",
              color: "black",
              backgroundColor: "#f5f5f5", // Light gray background for input
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            },
          }}
          inputProps={{
            style: { fontSize: "10px" },
          }}
          sx={{
            borderRadius: "12px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        />

        {/* Send Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "12px",
            height: "35px",
            minWidth: "100px",
            fontSize: "12px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Send
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ marginTop: "10px", backgroundColor: "#ccc" }} />
    </Box>
  );
};

export default Commentbox;