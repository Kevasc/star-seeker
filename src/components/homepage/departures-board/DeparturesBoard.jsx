import "./DeparturesBoard.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const DeparturesBoard = () => {
  // Functional Component
  // const [departures, setDepartures] = useState();
  const departures = useSelector((state) => state.starSeeker.departures);
  //useSelectors grabs the departures from the redux store
  return (
    //returning the functional component(DeparturesBoard)
    <div className="flights-container">
      <div className="departure-board">
        <p className="section-title">
          Departures <span style={{ fontWeight: 800 }}>Information</span>
        </p>
        <p className="section-subheading">Charting Paths to the Stars</p>
      </div>

      <TableContainer id="table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#ffcf33",
                p: 2,
              }}
            >
              <TableCell
                align="center"
                sx={{
                  fontWeight: "light",
                  fontFamily: "Halvar Breitschrift",
                  fontSize: "1.5rem",
                }}
              >
                Destination
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "light",
                  fontFamily: "Halvar Breitschrift",
                  fontSize: "1.5rem",
                }}
              >
                Flight Number
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "light",
                  fontFamily: "Halvar Breitschrift",
                  fontSize: "1.5rem",
                }}
              >
                Connecting Flights
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departures &&
              departures.map((departure) => {
                const connectingFlights = departure.links.map((link) => {
                  return link.code;
                });
                const connectingFlightsJoined = connectingFlights.join(", "); //.join is an object
                return (
                  <TableRow
                    key={departure.name}
                    sx={{
                      bgcolor: "black",
                      p: 2,
                      fontFamily: "Halvar Breitschrift",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      align="center"
                      sx={{ color: "white", fontFamily: "inherit" }}
                      scope="row"
                    >
                      {departure.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontFamily: "inherit" }}
                    >
                      {departure.code}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "white", fontFamily: "inherit" }}
                    >
                      {connectingFlightsJoined}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DeparturesBoard;
