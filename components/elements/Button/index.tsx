const Button = ({
  children,
  className,
  type = "button",
  variant = "primary",
  disabled = false,
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "custom";
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const buttonVariant =
    variant === "primary"
      ? "bg-lPrimaryGreen text-lSecCream  border border-lPrimaryGreen hover:bg-lSecBurntOrange dark:text-dSecDarkBlue dark:border-dSecDarkBlue dark:bg-dPrimaryGray dark:hover:bg-dSecMaize"
      : variant === "secondary"
        ? "bg-lsecCream text-lPrimaryGreen border border-lPrimaryGreen hover:bg-lPrimaryGreen hover:border-lPrimaryGreen hover:text-lSecCream dark:border-dPrimaryGray dark:text-dPrimaryGray dark:bg-dSecDarkBlue dark:hover:bg-dPrimaryGray dark:hover:border-dPrimaryGray dark:hover:text-dSecDarkBlue"
        : variant === "custom" ? "" : "bg-white dark:bg-dSecDarkBlue text-lPrimaryGreen dark:text-dPrimaryGray border border-lPrimaryGreen dark:border-dSecMaize";

  return (
    <button
      onClick={onClick}
      className={`${buttonVariant} cursor-pointer disabled:cursor-not-allowed font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out ${className}`}
      type={type}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
