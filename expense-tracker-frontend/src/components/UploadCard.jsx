import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";

import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import { uploadCSV } from "../services/uploadService";
import { toast } from "react-toastify";

function UploadCard({ onUploadSuccess }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {

    if (!file) {
      toast.error("Please select a CSV file.");
      return;
    }

    try {

      setLoading(true);

      const response = await uploadCSV(file);

      toast.success(response.message);

      // Send response to parent component
      if (onUploadSuccess) {
        onUploadSuccess(response);
      }

      // Clear selected file
      setFile(null);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "CSV Upload Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Card
      sx={{
        mt: 3,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >

      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          📂 Upload CSV Statement
        </Typography>

        <Box
          sx={{
            border: "2px dashed #1976d2",
            borderRadius: 3,
            p: 5,
            textAlign: "center",
            backgroundColor: "#F8FAFC",
          }}
        >

          <CloudUploadRoundedIcon
            sx={{
              fontSize: 70,
              color: "#1976d2",
            }}
          />

          <Typography
            mt={2}
            mb={2}
          >
            Choose your bank statement (.csv)
          </Typography>

          <Button
            variant="contained"
            component="label"
          >
            Select CSV File

            <input
              hidden
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />

          </Button>

          {file && (

            <Typography
              mt={2}
              color="primary"
              fontWeight="bold"
            >
              📄 {file.name}
            </Typography>

          )}

          <Box mt={3}>

            <Button
              variant="contained"
              color="success"
              size="large"
              disabled={loading || !file}
              onClick={handleUpload}
            >
              Upload & Analyze
            </Button>

          </Box>

          {loading && (

            <Box mt={4}>

              <Typography mb={1}>
                🤖 Gemini AI is categorizing your expenses...
              </Typography>

              <LinearProgress />

            </Box>

          )}

        </Box>

      </CardContent>

    </Card>

  );

}

export default UploadCard;