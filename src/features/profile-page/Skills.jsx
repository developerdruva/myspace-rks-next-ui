"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { FiActivity, FiAward, FiTrendingUp, FiZap } from "react-icons/fi";
import classes from "./CSS/Skills.module.css";
import EchartsBarWithBg from "../../components/charts/EchartsBarWithBg";
import SkillsByCategoryView from "../../components/cards/SkillsViewByCategory";

const getSkillLevel = (value) => {
  if (value >= 80) return "advanced";
  if (value >= 55) return "intermediate";
  return "beginner";
};

const Skills = () => {
  const portfolioDetails = useSelector((state) => state?.portfolioState);
  const mySkills = portfolioDetails?.mySkills;
  const emailId = portfolioDetails?.personDetails?.[0]?.email_id;
  const safeSkills = Array.isArray(mySkills) ? mySkills : [];

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("desc");
  const [topCount, setTopCount] = useState(12);
  const [levelFilter, setLevelFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list");

  const normalizedSkills = useMemo(
    () =>
      safeSkills
        .map((item) => {
          const value = Number(item?.skill_value || 0);
          return {
            name: item?.skill_name || "Unknown",
            value,
            color: item?.skill_style || "#3b82f6",
            level: getSkillLevel(value),
          };
        })
        .filter((item) => item.name && Number.isFinite(item.value)),
    [safeSkills],
  );

  const filteredSkills = useMemo(() => {
    let filtered = normalizedSkills.filter((item) =>
      item.name.toLowerCase().includes(searchText.trim().toLowerCase()),
    );

    if (levelFilter !== "all") {
      filtered = filtered.filter((item) => item.level === levelFilter);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "asc") return a.value - b.value;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.value - a.value;
    });

    return sorted.slice(0, topCount);
  }, [normalizedSkills, searchText, sortBy, topCount, levelFilter]);

  const stats = useMemo(() => {
    const count = normalizedSkills.length;
    const max = normalizedSkills.reduce(
      (current, item) => (item.value > current ? item.value : current),
      0,
    );
    const avg =
      count > 0
        ? Math.round(
            normalizedSkills.reduce((sum, item) => sum + item.value, 0) / count,
          )
        : 0;

    return { count, max, avg };
  }, [normalizedSkills]);

  const topStrengths = useMemo(
    () => [...normalizedSkills].sort((a, b) => b.value - a.value).slice(0, 5),
    [normalizedSkills],
  );

  const growthAreas = useMemo(
    () => [...normalizedSkills].sort((a, b) => a.value - b.value).slice(0, 5),
    [normalizedSkills],
  );

  if (!portfolioDetails) {
    return <div className={classes.box}>Loading...</div>;
  }

  return (
    <div className={classes.box} id="skills">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, md: 2.2 },
          mb: 2,
          borderRadius: 2.5,
          border: "1px solid rgba(148, 163, 184, 0.3)",
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(14,165,233,0.08))",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(37,99,235,0.15)",
              color: "#1d4ed8",
              width: 42,
              height: 42,
            }}
          >
            <FiZap />
          </Avatar>
          <Box display={"flex"}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "#0f172a", mb: 0.2 }}
            >
              Skills
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1.5 }} />
        {/* 
        <Grid container spacing={1.2} sx={{ mb: 1.5 }}>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                p: 1.2,
                borderRadius: 1.5,
                border: "1px solid rgba(148,163,184,0.25)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <FiActivity /> Total Skills
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {stats.count}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                p: 1.2,
                borderRadius: 1.5,
                border: "1px solid rgba(148,163,184,0.25)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <FiAward /> Highest Skill
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {stats.max}%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                p: 1.2,
                borderRadius: 1.5,
                border: "1px solid rgba(148,163,184,0.25)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#64748b",
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                <FiTrendingUp /> Average
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
                {stats.avg}%
              </Typography>
            </Paper>
          </Grid>
        </Grid> */}

        <Grid container spacing={1.2} alignItems="center">
          {/* {/* <Grid item xs={12} md={4}>
            <TextField
              size="small"
              fullWidth
              label="Search skill"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="skills-sort-label">Sort By</InputLabel>
              <Select
                labelId="skills-sort-label"
                value={sortBy}
                label="Sort By"
                onChange={(event) => setSortBy(event.target.value)}
              >
                <MenuItem value="desc">Score: High to Low</MenuItem>
                <MenuItem value="asc">Score: Low to High</MenuItem>
                <MenuItem value="name">Name: A to Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="skills-top-label">Top</InputLabel>
              <Select
                labelId="skills-top-label"
                value={String(topCount)}
                label="Top"
                onChange={(event) => setTopCount(Number(event.target.value))}
              >
                <MenuItem value="8">Top 8</MenuItem>
                <MenuItem value="12">Top 12</MenuItem>
                <MenuItem value="16">Top 16</MenuItem>
                <MenuItem value="1000">All</MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          <Grid item xs={6} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="skills-level-label">Level</InputLabel>
              <Select
                labelId="skills-level-label"
                value={levelFilter}
                label="Level"
                onChange={(event) => setLevelFilter(event.target.value)}
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item size={{ xs: 12, md: 3 }} mb={2}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              size="small"
              onChange={(_, value) => value && setViewMode(value)}
              fullWidth
            >
              <ToggleButton value="chart">Chart</ToggleButton>
              <ToggleButton value="list">List</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, lg: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1.2,
                borderRadius: 2,
                border: "1px solid rgba(148, 163, 184, 0.3)",
              }}
            >
              <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                Skill Performance
              </Typography>

              {viewMode === "chart" ? (
                filteredSkills.length > 0 ? (
                  <EchartsBarWithBg
                    xAxisValues={filteredSkills.map((item) => item.name)}
                    actualValues={filteredSkills.map((item) => ({
                      value: item.value,
                      itemStyle: { color: item.color },
                    }))}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 260,
                      display: "grid",
                      placeItems: "center",
                      color: "#64748b",
                    }}
                  >
                    <Typography variant="body2">
                      No skills available for the selected filters
                    </Typography>
                  </Box>
                )
              ) : filteredSkills.length > 0 ? (
                <List sx={{ maxHeight: 420, overflowY: "auto" }}>
                  {filteredSkills.map((item) => (
                    <ListItem
                      key={item.name}
                      sx={{
                        border: "1px solid rgba(148,163,184,0.2)",
                        borderRadius: 1.5,
                        mb: 1,
                        bgcolor: "#fff",
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={`Level: ${item.level}`}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                      <Box sx={{ width: 180, mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.value}
                          sx={{
                            height: 8,
                            borderRadius: 8,
                            bgcolor: "rgba(148,163,184,0.2)",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: item.color,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          minWidth: 42,
                          textAlign: "right",
                          fontWeight: 700,
                        }}
                      >
                        {item.value}%
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    height: 220,
                    display: "grid",
                    placeItems: "center",
                    color: "#64748b",
                  }}
                >
                  <Typography variant="body2">
                    No skills available for the selected filters
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item size={{ xs: 12, lg: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1.2,
                borderRadius: 2,
                border: "1px solid rgba(148, 163, 184, 0.3)",
                mb: 2,
              }}
            >
              <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                Top Strengths
              </Typography>
              <Stack spacing={0.9}>
                {topStrengths.map((item) => (
                  <Chip
                    key={item.name}
                    label={`${item.name} • ${item.value}%`}
                    size="small"
                    sx={{
                      justifyContent: "space-between",
                      bgcolor: `${item.color}1A`,
                      border: `1px solid ${item.color}55`,
                    }}
                  />
                ))}
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 1.2,
                borderRadius: 2,
                border: "1px solid rgba(148, 163, 184, 0.3)",
              }}
            >
              <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                Growth Areas
              </Typography>
              <Stack spacing={1}>
                {growthAreas.map((item) => (
                  <Box key={item.name}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" sx={{ color: "#334155" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {item.value}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        mt: 0.4,
                        height: 7,
                        borderRadius: 8,
                        bgcolor: "rgba(148,163,184,0.2)",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: item.color,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* <SkillsByCategoryView emailId={emailId} /> */}
    </div>
  );
};

export default Skills;
