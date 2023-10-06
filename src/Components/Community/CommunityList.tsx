const CommunityList = () => {
  return (
    <div
      style={{
        display: "flex",
        textAlign: "left",
        flexDirection: "column",
        padding: "5px 10px",
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "var(--font-color-muted)",
          marginBottom: "10px",
        }}
      >
        INFORMATION
      </div>
      <div className="clickableHeading"># Introduction</div>
      <div className="clickableHeading"># Explore</div>
      <div className="clickableHeading"># Learn</div>
      <div
        style={{
          fontSize: "12px",
          color: "var(--font-color-muted)",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        GENERAL
      </div>
      <div className="clickableHeading"># DSA</div>
      <div
        style={{
          fontSize: "12px",
          color: "var(--font-color-muted)",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        CODING
      </div>
      <div className="clickableHeading"># DSA</div>
    </div>
  );
};

export default CommunityList;
