import { useState } from "react";
import "./PlanJourney.css";
import { transportCost } from "../api/api.js";
import { useSelector } from "react-redux";
import { setFromLocation, setToLocation } from "../redux/starSeekerSlice";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

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
          <Box sx={{ minWidth: 350 }}>
            <FormControl fullWidth>
              <InputLabel id="from-location-label">From</InputLabel>
              <Select
                labelId="from-location-label"
                id="from-location-select"
                value={fromLocation}
                style={{ backgroundColor: "white", color: "black" }}
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
          <Box sx={{ minWidth: 350 }}>
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
          <Button
            variant="contained"
            onClick={callCostsFetch}
            sx={{
              backgroundColor: "#ffcf33",
              cursor: "pointer",
              width: "100%",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            endIcon={<FlightTakeoffOutlinedIcon />}
          >
            Search
          </Button>
        </div>

        {journey ? (
          <div className="result-box">
            <div className="from-to">
              <div className="result-ports">
                <p>{journey.from.name}</p>
                <Typography gutterBottom variant="h5" component="div">
                  {journey.from.code}
                </Typography>
              </div>
              <EastOutlinedIcon />
              <div className="result-ports">
                <p>{journey.to.name}</p>
                <Typography gutterBottom variant="h5" component="div">
                  {journey.to.code}
                </Typography>
              </div>
            </div>
            <div className="journey-cost">
              <Typography variant="body2" color="text">
                Starting from ${journey.totalCost}
              </Typography>
            </div>

            <div className="stopover-dropdown-box">
              <CardActions>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Your route will include stopovers in
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {journey.route.filter(
                      (_, index) =>
                        index !== journey.route.length - 1 && index !== 0
                    ).length === 0 ? (
                      <Typography variant="body2" color="text.primary">
                        No stopovers on this route!
                      </Typography>
                    ) : (
                      journey.route
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
                            {transfer}
                          </Typography>
                        ))
                    )}
                  </AccordionDetails>
                </Accordion>
              </CardActions>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PlanJourney;
