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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                cursor: "pointer", // Change the color when hovered
              },
            }}
            endIcon={<ConnectingAirportsOutlinedIcon />}
          >
            Search
          </Button>
        </div>
        {/* <div className="search-result-prices"> */}
          {journey ? (
            <div className='result-box'>
              {/* <CardMedia
                sx={{ maxWidth: 550 }}
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
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Your route will include stopovers in:
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {journey.route
                      .filter(
                        (_, index) =>
                          index !== journey.route.length - 1 && index !== 0
                      )
                      .map((transfer, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          color="text.primary" //  TODO: add no stops! if no stops on route
                        >
                          {transfer}
                        </Typography>
                      ))}
                  </AccordionDetails>
                </Accordion>
              </CardActions> */}
            </div>
          ) : null}
        {/* </div> */}
      </div>
    </div>
  );
};

export default PlanJourney;
