import icon from "../assets/csync-icon.png";

export default function Logo({ className = "", showTagline = false }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={icon}
        alt="Csync Tecnologia"
        className="h-8 w-8 md:h-9 md:w-9 object-contain drop-shadow-[0_0_14px_rgba(59,107,255,0.45)]"
      />
      <div className="flex flex-col leading-none">
        <span className="font-display font-semibold text-lg md:text-xl text-mist tracking-tight">
          Csync
        </span>
        {showTagline && (
          <span className="eyebrow text-mist-faint text-[9px] mt-0.5">
            Tecnologia
          </span>
        )}
      </div>
    </div>
  );
}
