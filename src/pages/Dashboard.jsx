import { Grid, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      {[1,2,3,4].map((item) => (
        <Grid item xs={12} md={3} key={item}>
          <Card>
            <CardContent>
              <Typography variant="h6">Card {item}</Typography>
              <Typography variant="body2">
                Some statistics here
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;