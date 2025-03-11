import { Outlet } from "react-router";

function ConsoleLayout(): React.ReactElement {
  return (
    <div>
      ConsoleLayout
      <Outlet />
    </div>
  );
}

export {
  ConsoleLayout
}