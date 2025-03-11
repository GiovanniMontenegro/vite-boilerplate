import { Outlet } from "react-router";

function MainLayout(): React.ReactElement {
  return (
    <div>
      HomeLayout
      <Outlet />
    </div>
  );
}

export {
  MainLayout
}