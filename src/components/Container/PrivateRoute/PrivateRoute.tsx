import { FC } from "react";
import { Navigate } from "react-router-dom";
import { HomeTemplate } from "HOC";

interface PropType {
  component: React.FC;
  token: boolean;
}

const PrivateRoute: FC<PropType> = ({ component: Component, token }) => {
  if (token)
    return (
      <HomeTemplate>
        <Component />
      </HomeTemplate>
    );
  return <Navigate to="/login" />;
};

export default PrivateRoute;
