import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #3b82f6, #6366f1)", // blue-500 to indigo-600
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          📚 Book Management System
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "12px",
            boxShadow: 3,
            textTransform: "none", // keeps normal text casing
          }}
        >
          Oxford Uni
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
