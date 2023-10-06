import { BsTrophy } from "react-icons/bs";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { TbWorldCode } from "react-icons/tb";
const HomeLinks = () => {
  const textStyle = {
    color: "var(--font-color-muted)",
    fontWeight: "500",
  };
  const linkStyle = {
    textAlign: "left",
    width: "100%",
    justifyContent: "flex-start",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "10px 20px",
      }}
    >
      <div className="text-and-icon-center" style={linkStyle as any}>
        <TbWorldCode color="grey" />
        <div style={textStyle}>Problems</div>
      </div>
      <div className="text-and-icon-center" style={linkStyle as any}>
        <PiChalkboardTeacherDuotone color="grey" />
        <div style={textStyle}>Learn</div>
      </div>
      <div className="text-and-icon-center" style={linkStyle as any}>
        <BsTrophy color="grey" />
        <div style={textStyle}>Contests</div>
      </div>
      <div className="text-and-icon-center" style={linkStyle as any}>
        <TbWorldCode color="grey" />
        <div style={textStyle}>Leaderboard</div>
      </div>
    </div>
  );
};

export default HomeLinks;
