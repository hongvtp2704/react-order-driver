import { FC, ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router";
import { useDropzone } from "react-dropzone";
import { size } from "lodash";
import { useSelector } from "react-redux";

import { useTranslations } from "hooks";
import Drawer from "./Drawer";
import { useGetDriverById } from "api/auth";
import { useUploadAvatarDriver } from "api/auth/hook";

import { BasicModal, SvgButton, Button } from "components";
import { GarbageIcon } from "components/Icon";

import styles from "./styles";
import {
  ImgWrap,
  GarbageCanWrap,
  StyledImg,
  ContentUpload,
  TextUpload,
} from "components/Modal/styles";
import { authSelector } from "store/slices/auth/authSlice";

type Props = {
  children: ReactNode;
};

const HomeTemplate: FC<Props> = ({ children }: Props) => {
  const driverId = sessionStorage.getItem("driver_id") as string;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalUpload, setModalUpload] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState({});

  const classes = styles();
  const navigate = useNavigate();
  const { i18n } = useTranslations();
  const { data: driverInfo, avatar } = useSelector(authSelector);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { runRequest: fetchDriverDetail } = useGetDriverById({ driverId });

  const { runRequest: uploadAvatar, isLoading: uploadAvatarLoading } =
    useUploadAvatarDriver({
      successCallback: () => {
        setFileUrl("");
        setFile({});
        setModalUpload(false);
        fetchDriverDetail();
      },
      failureCallback: () => {
        setFileUrl("");
        setFile({});
        setModalUpload(false);
      },
    });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any): void => {
      setFile(acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteImg = () => {
    setFileUrl("");
    setFile({});
  };

  const handleUpLoadImg = () => {
    if (size(file) && driverId) {
      uploadAvatar(file as File, driverId);
    }
  };

  const renderContentUpLoad = (
    <>
      {fileUrl.length > 0 ? (
        <ImgWrap>
          <SvgButton handleClick={deleteImg}>
            <GarbageCanWrap>
              <GarbageIcon />
            </GarbageCanWrap>
          </SvgButton>
          <StyledImg src={fileUrl} />
        </ImgWrap>
      ) : (
        <ContentUpload {...getRootProps()}>
          <UploadFileIcon fontSize="large" />
          <br />
          <TextUpload>Upload Avatar</TextUpload>
          <input type="file" accept="image/*" {...getInputProps()} />
        </ContentUpload>
      )}
      <Button
        title="Upload"
        fullWidth
        onClick={handleUpLoadImg}
        isLoading={uploadAvatarLoading}
      />
    </>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              onClick={() => {
                navigate("/");
              }}
            >
              DRIVER
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <Avatar alt={"Logo"} src={avatar?.data || ""} />
              </IconButton>
              {/* Popover */}
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List>
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/profile");
                      handleClose();
                    }}
                  >
                    <ListItemText primary={i18n.t("header.profile")} />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/change-password");
                      handleClose();
                    }}
                  >
                    <ListItemText primary={i18n.t("header.change_password")} />
                  </ListItem>

                  <ListItem
                    button
                    onClick={() => {
                      setModalUpload(true);
                      handleClose();
                    }}
                  >
                    <ListItemText primary={i18n.t("header.upload_avatar")} />
                  </ListItem>
                </List>
              </Popover>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onClick={() => setOpenDrawer(false)}
      />
      <div className={classes.wrapper}>{children}</div>
      <BasicModal
        title="Upload/update Avatar"
        isOpen={modalUpload}
        handleClose={() => setModalUpload(false)}
        modalContent={renderContentUpLoad}
      />
    </>
  );
};

export default HomeTemplate;
