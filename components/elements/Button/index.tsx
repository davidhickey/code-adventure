
const Button = ({children, type="button", variant="primary", onClick}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => {

  const buttonVariant = variant === "primary" ? 
    "text-lsecCream dark:text-dSecDarkBlue bg-lPrimaryGreen dark:bg-dPrimaryGray hover:bg-lSecBurntOrange dark:hover:bg-dSecMaize" 
    : "bg-lsecCream text-lPrimaryGreen border border-lPrimaryGreen hover:bg-lPrimaryGreen hover:border-lPrimaryGreen hover:text-lSecCream dark:border-dPrimaryGray dark:text-dPrimaryGray dark:bg-dSecDarkBlue dark:hover:bg-dPrimaryGray dark:hover:border-dPrimaryGray dark:hover:text-dSecDarkBlue";

  return (
    <button onClick={onClick} className={`${buttonVariant} font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out`} type={type}>
      {children}
    </button>
  );
}

export default Button;

