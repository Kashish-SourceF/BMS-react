import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "grey.300",
        textAlign: "center",
        py: 2,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Book Management System | All rights reserved
      </Typography>
    </Box>
  );
}

export default Footer;
