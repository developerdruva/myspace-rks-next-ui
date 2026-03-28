"use client";

import { Avatar, Grid, Paper, Stack, Typography } from "@mui/material";
import { IconType } from "react-icons";
import styles from "../spends.module.css";

type StatCardItem = {
  title: string;
  value: string;
  icon: IconType;
  color: string;
  subtitle?: string;
};

type DashboardStatCardsProps = {
  items: StatCardItem[];
};

export default function DashboardStatCards({ items }: DashboardStatCardsProps) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Paper className={styles.card} sx={{ p: 1.5 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: `${item.color}1A`,
                    color: item.color,
                  }}
                >
                  <Icon size={20} />
                </Avatar>
                <div>
                  <Typography className={styles.cardSubTitle}>
                    {item.title}
                  </Typography>
                  <Typography className={styles.cardTitle}>
                    {item.value}
                  </Typography>
                  {item.subtitle ? (
                    <Typography className={styles.cardSubTitle}>
                      {item.subtitle}
                    </Typography>
                  ) : null}
                </div>
              </Stack>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
