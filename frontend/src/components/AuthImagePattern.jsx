import { useThemeStore } from "../store/useThemeStore";

const AuthImagePattern = ({ title, subtitle }) => {
  const { theme } = useThemeStore();

  return (
    <div
      className={`hidden lg:flex items-center justify-center p-12 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-neutral text-neutral-content"
          : "bg-base-200 text-base-content"
      }`}
      data-theme={theme} // optional: helps ensure DaisyUI applies styles properly
    >
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${
                theme === "dark" ? "bg-white/10" : "bg-black/10"
              } ${i % 2 === 0 ? "animate-pulse" : ""}`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
