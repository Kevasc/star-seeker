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
  const [journey, setJourney] = useState();

  const callCostsFetch = async () => {
    const pricingResult = await transportCost(fromLocation, toLocation); // departuresResult is that result of the API
    setJourney(pricingResult); // setjourney has now reassigned costs ([]) to be departuresResult
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
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fromLocation}
                style={({ color: "white" }, { backgroundColor: "white" })}
                label="Destination"
                onChange={(event) =>
                  dispatch(setFromLocation(event.target.value))
                }
              >
                {departures.map((destination) => {
                  //departures is in curly brackets becasue its read as javascript and not just a string
                  return (
                    <MenuItem key={destination.code} value={destination.code}>
                      {destination.name}
                    </MenuItem> //we are now able to access the destinations using the drop down box
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">To</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={toLocation}
                style={({ color: "white" }, { backgroundColor: "white" })}
                label="Destination"
                onChange={(event) =>
                  dispatch(setToLocation(event.target.value))
                }
              >
                {departures.map((destination) => {
                  return (
                    <MenuItem key={destination.code} value={destination.code}>
                      {destination.name}
                    </MenuItem>
                  );
                })}
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
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 50 }}
                image="/static/images/cards/contemplative-reptile.jpg" //TO_DO: make link to images of different planets each time
                title="destination-card"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {journey.to.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <p> Starting from ${journey?.totalCost}</p>
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">
                  Need parking details beofre you go to {journey.to.name}?
                </Button> */}
                {journey.route
                  .filter(
                    (_, index) =>
                      index !== journey.route.length - 1 && index !== 0
                  )
                  .map((transfer, index) => {
                    return <p key={index}>{`your route = ${transfer}`}</p>;
                  })}
              </CardActions>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PlanJourney;
