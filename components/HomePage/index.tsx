const HomePage = ({children}:{children?: React.ReactNode}) => {
  return (
      <div>
      <h1>Home Page</h1>
      {children && <div>{children}</div>}
    </div>
  );
}

export default HomePage;
