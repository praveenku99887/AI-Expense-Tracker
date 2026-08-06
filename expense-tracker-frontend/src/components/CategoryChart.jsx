import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getCategoryReport } from "../services/dashboardService";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#9c27b0",
  "#d32f2f",
  "#0288d1",
  "#7b1fa2",
  "#5d4037",
];

function CategoryChart({ type }) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChart = async () => {

    try {

      setLoading(true);

      const today = new Date();

      let response;

      if (type === "total") {

        response = await getCategoryReport("total");

      } else if (type === "day") {

        const date = today.toISOString().split("T")[0];

        response = await getCategoryReport(
          "day",
          date
        );

      } else if (type === "week") {

        response = await getCategoryReport(
          "week",
          null,
          1,
          today.getMonth() + 1,
          today.getFullYear()
        );

      } else if (type === "month") {

        response = await getCategoryReport(
          "month",
          null,
          null,
          today.getMonth() + 1,
          today.getFullYear()
        );

      } else {

        response = await getCategoryReport(
          "year",
          null,
          null,
          null,
          today.getFullYear()
        );

      }

      setData(response.categories);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadChart();

  }, [type]);

  return (

    <Card
      sx={{
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
          Expense Distribution
        </Typography>

        {loading ? (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={560}
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                outerRadius={190}
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        )}

      </CardContent>

    </Card>

  );

}

export default CategoryChart;