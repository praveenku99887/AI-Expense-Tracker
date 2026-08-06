import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import SummaryCard from "../components/SummaryCard";
import CategoryChart from "../components/CategoryChart";

import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import { getDashboardSummary } from "../services/dashboardService";

function Dashboard() {

  const [summary, setSummary] = useState({
    total_expense: 0,
    today: 0,
    this_week: 0,
    this_month: 0,
    this_year: 0,
  });

  const [selectedType, setSelectedType] = useState("total");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>

      <Box
        sx={{
          maxWidth: "1700px",
          mx: "auto",
        }}
      >

        {/* Title */}

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
          >
            AI Expense Tracker Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Track, Analyze & Manage your expenses with AI
          </Typography>

        </Paper>

        {/* Summary Cards */}

        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 5,
            mb: 5,
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >

            <Box sx={{ flex: "1 1 230px", maxWidth: 250 }}>
              <SummaryCard
                title="Total"
                amount={summary.total_expense}
                color="#2563EB"
                icon={<SavingsRoundedIcon />}
                selected={selectedType === "total"}
                onClick={() => setSelectedType("total")}
              />
            </Box>

            <Box sx={{ flex: "1 1 230px", maxWidth: 250 }}>
              <SummaryCard
                title="Today"
                amount={summary.today}
                color="#22C55E"
                icon={<TodayRoundedIcon />}
                selected={selectedType === "day"}
                onClick={() => setSelectedType("day")}
              />
            </Box>

            <Box sx={{ flex: "1 1 230px", maxWidth: 250 }}>
              <SummaryCard
                title="Week"
                amount={summary.this_week}
                color="#F59E0B"
                icon={<DateRangeRoundedIcon />}
                selected={selectedType === "week"}
                onClick={() => setSelectedType("week")}
              />
            </Box>

            <Box sx={{ flex: "1 1 230px", maxWidth: 250 }}>
              <SummaryCard
                title="Month"
                amount={summary.this_month}
                color="#8B5CF6"
                icon={<CalendarMonthRoundedIcon />}
                selected={selectedType === "month"}
                onClick={() => setSelectedType("month")}
              />
            </Box>

            <Box sx={{ flex: "1 1 230px", maxWidth: 250 }}>
              <SummaryCard
                title="Year"
                amount={summary.this_year}
                color="#EF4444"
                icon={<PaidRoundedIcon />}
                selected={selectedType === "year"}
                onClick={() => setSelectedType("year")}
              />
            </Box>

          </Box>

        </Paper>

        {/* Pie Chart */}

        <Paper
          elevation={3}
          sx={{
            borderRadius: 5,
            p: 4,
          }}
        >

          <CategoryChart
            type={selectedType}
          />

        </Paper>

      </Box>

    </MainLayout>
  );
}

export default Dashboard;