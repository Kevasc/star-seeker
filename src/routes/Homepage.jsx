import DeparturesBoard from "../components/homepage/departures-board/DeparturesBoard";
import WelcomePane from "../components/homepage/welcome-pane/WelcomePane";


const Homepage = () => {
  return (
    <div className="App">
      <WelcomePane />
      <DeparturesBoard/>
    </div>
  );
};

export default Homepage;
