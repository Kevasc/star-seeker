import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import PlanJourney from "./routes/PlanJourney";
import Homepage from "./routes/Homepage";
import Status from "./routes/Status";
import JourneyMemory from "./routes/JourneyMemory";
import Header from "./components/header/Header";
import { useEffect } from "react";
import { getDepartures } from "./api/api";
import { setDepartures } from "./redux/starSeekerSlice";
import { useDispatch } from "react-redux";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/plan-journey",
        element: <PlanJourney />,
      },
      {
        path: "/status",
        element: <Status />,
      },
      {
        path: "/journey-memory",
        element: <JourneyMemory />,
      },
    ],
  },
]);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // we use useEffect as we only want the function to run once
    const callDeparturesFetch = async () => {
      const departuresResult = await getDepartures(); // departuresResult is that result of the API
      departuresResult.sort((a, b) => {
        // computer is smart and will check if a value if great than b value, or other way round, running thorough departuresResult
        if (a.name < b.name) {
          return -1; //return b value first
        } else {
          return 1; //return a value first
        }
      });
      // set departures has now reassigned departures ([]) to be departuresResult
      dispatch(setDepartures(departuresResult));
    };
    callDeparturesFetch(); //this being called, makes the code go back to line 23 and start the function
  }, [dispatch]); // dependency array ensures the function will only run once if empty

  return (
    <div className="homepage">
      <RouterProvider router={router} />
    </div>
  );
}
