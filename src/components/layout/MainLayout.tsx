
import { Outlet } from "react-router";


const MainLayout = (): React.ReactElement => {
  return (
    <div>
      MainLayout
      <Outlet />
    </div>
  );
};

export default MainLayout;
