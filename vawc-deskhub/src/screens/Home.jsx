import { useLogout } from "../hooks/useLogout";

function Home() {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div>home</div>
      <button onClick={handleLogout}>log out</button>
    </>
  );
}

export default Home;
