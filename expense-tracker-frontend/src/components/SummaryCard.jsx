import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function SummaryCard({
  title,
  amount,
  color,
  icon,
  onClick,
  selected,
}) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        height: 230,
        width: "100%",
        borderRadius: 5,
        border: selected
          ? `3px solid ${color}`
          : "1px solid #E5E7EB",
        boxShadow: selected ? 8 : 3,
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 10,
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Title */}

        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
            color: "#555",
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {/* Amount */}

        <Typography
          sx={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#111827",
            mb: 3,
          }}
        >
          ₹ {amount}
        </Typography>

        {/* Icon */}

        <Box
          sx={{
            width: 85,
            height: 85,
            borderRadius: "24px",
            bgcolor: color,
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& svg": {
              fontSize: 42,
            },
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;