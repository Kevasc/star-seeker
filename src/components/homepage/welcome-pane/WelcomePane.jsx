import "./WelcomePane.css";

const WelcomePane = () => {
  return (
    <div className="welcome-container">
      <div className="titles-box">
        <p className="section-title">
          Welcome to <span style={{ fontWeight: 800 }}>Star Seeker</span>
        </p>
        <p className="section-subheading">Your passport to the cosmos</p>
      </div>
    </div>
  );
};
export default WelcomePane;
