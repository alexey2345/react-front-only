function Logo({ isNightMode, inNavbar }) {
  const textColor = inNavbar
    ? "text-white" // Always white in the navbar
    : isNightMode
    ? "text-white" // White in night mode
    : "text-black"; // Black in day mode

  return <span className={`Bold-text ${textColor}`}>BCard</span>;
}

export default Logo;
