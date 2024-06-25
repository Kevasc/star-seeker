import "./PlanJourney.css";
import { transportCost } from "../api/api.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { setFromLocation, setToLocation } from "../redux/starSeekerSlice";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import { useState } from "react";

const PlanJourney = () => {
  const dispatch = useDispatch();
  const departures = useSelector((state) => state.starSeeker.departures);
  const fromLocation = useSelector((state) => state.starSeeker.fromLocation);
  const toLocation = useSelector((state) => state.starSeeker.toLocation);
  const [journey, setJourney] = useState(null);

  const callCostsFetch = async () => {
    try {
      const pricingResult = await transportCost(fromLocation, toLocation);
      setJourney(pricingResult);
    } catch (error) {
      console.error("Error fetching transport costs:", error);
      setJourney(null);
    }
  };

  return (
    <div className="journey-image-container">
      <div className="top-section-content">
        <p className="section-title">
          Plan your <span style={{ fontWeight: 800 }}>journey</span>
        </p>
        <div className="drop-down-boxes">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="from-location-label">From</InputLabel>
              <Select
                labelId="from-location-label"
                id="from-location-select"
                value={fromLocation}
                style={{ backgroundColor: "white", color: 'black' }}
                label="From"
                onChange={(event) =>
                  dispatch(setFromLocation(event.target.value))
                }
              >
                {departures.map((destination) => (
                  <MenuItem key={destination.code} value={destination.code}>
                    {destination.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="to-location-label">To</InputLabel>
              <Select
                labelId="to-location-label"
                id="to-location-select"
                value={toLocation}
                style={{ backgroundColor: "white" }}
                label="To"
                onChange={(event) =>
                  dispatch(setToLocation(event.target.value))
                }
              >
                {departures.map((destination) => (
                  <MenuItem key={destination.code} value={destination.code}>
                    {destination.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <div className="searchResultPrices">
            <Button
              variant="contained"
              onClick={callCostsFetch}
              style={{ backgroundColor: "#ffcf33" }}
              endIcon={<ConnectingAirportsOutlinedIcon />}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="searchResultPrices">
          {journey ? (
            <Card sx={{ maxWidth: 200 }}>
              <CardMedia
                sx={{ height: 140 }}
                // image="/static/images/cards/contemplative-reptile.jpg" // TODO: replace with dynamic images based on the destination
                title="destination-card"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {journey.to.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Starting from ${journey.totalCost}
                </Typography>
              </CardContent>
              <CardActions>
                {journey.route
                  .filter(
                    (_, index) =>
                      index !== journey.route.length - 1 && index !== 0
                  )
                  .map((transfer, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.primary"
                    >
                      {`Your route will include stopovers in: ${transfer.split(' ,')}`}
                    </Typography>
                  ))}
              </CardActions>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PlanJourney;
