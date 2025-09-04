import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      className="bg-gray-800 text-center py-4"
    >
      <Typography variant="body2" className="text-gray-300">
        © {new Date().getFullYear()} Book Management System | All rights reserved
      </Typography>
    </Box>
  );
}

export default Footer;
