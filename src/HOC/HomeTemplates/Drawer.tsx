import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer as DrawerComponent,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  TouchApp,
  EventNote,
  ShowChart,
  History,
  ExitToApp,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";

import { resetToken } from "store/slices/auth/authSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
};

const Drawer: FC<Props> = ({ onClick, onClose, open }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = (path: string) => {
    onClick();
    navigate(path);
  };

  return (
    <>
      <DrawerComponent anchor="left" open={open} onClose={onClose}>
        <List>
          <ListItem button onClick={() => handleOnClick("/")}>
            <ListItemIcon>
              <TouchApp />
            </ListItemIcon>
            <ListItemText primary="Take Orders" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleOnClick("/your-order")}>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText primary="Current Order" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleOnClick("/analyst")}>
            <ListItemIcon>
              <ShowChart />
            </ListItemIcon>
            <ListItemText primary="Analyst" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleOnClick("/order-history")}>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText primary="Order History" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              dispatch(resetToken());
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </DrawerComponent>
    </>
  );
};

export default Drawer;
