import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" className="bg-gradient-to-r from-blue-500 to-indigo-600">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="font-bold text-white">
          📚 Book Management System
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className="rounded-xl shadow-md"
        >
          Oxford uni
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
