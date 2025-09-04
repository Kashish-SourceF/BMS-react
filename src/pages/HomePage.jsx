import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold mb-4">Book Management System</h1>
      <p className="mb-6">
        This system helps manage books efficiently. You can add, view, and
        organize your library with ease.
      </p>

      {/* Button to Library */}
      <Link to="/library">
        <Button variant="contained" color="primary">
          Go to Library of all Books
        </Button>
      </Link>

      {/* Sample Card */}
      <div className="mt-8 flex justify-center">
        <Card sx={{ maxWidth: 300, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              The Alchemist
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: F. Scott Fitzgerald
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Genre: Classic Fiction
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
