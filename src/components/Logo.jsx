import logo from "../assets/csync-logo.png";

export default function Logo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="Csync Tecnologia"
      className={`h-9 md:h-10 w-auto object-contain ${className}`}
    />
  );
}
