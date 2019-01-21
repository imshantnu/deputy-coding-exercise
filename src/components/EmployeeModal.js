import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  withMobileDialog,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import PeopleIcon from "@material-ui/icons/People";
import EmployeeShiftDetails from "./EmployeeShiftDetails";
import EmployeePersonalDetails from "./EmployeePersonalDetails";
import EmployeeJournal from "./EmployeeJournal";
import CloseIcon from "@material-ui/icons/Close";

const drawerWidth = 200;
const styles = theme => ({
  dialog: {
    maxWidth: 800,
    width: 800,
    minHeight: 600,
    padding: 0,
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  main: {
    flexGrow: 1
  },
  paperAnchorLeft: {
    position: "absolute",
    top: 0,
    bottom: 0
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  item: {
    paddingLeft: 0
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit * 0.5,
    top: theme.spacing.unit * 0.5,
    color: theme.palette.grey[500]
  },
  "@media (max-width: 767px)": {
    dialog: {
      maxWidth: "100%",
      width: "100%",
      maxHeight: "100%",
      padding: 0,
      margin: 0,
      height: "100%"
    }
  }
});

class EmployeeModal extends React.Component {
  state = {
    page: "personal"
  };

  changePage(page) {
    this.setState({ page: page });
  }

  render() {
    const { open, onClose, classes, employee } = this.props;
    const { page } = this.state;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        className={classes.root}
        maxWidth={false}
      >
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className={classes.dialog}>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              }),
              paperAnchorLeft: classes.paperAnchorLeft
            }}
            open={open}
          >
            {employee && <EmployeeShiftDetails employee={employee} />}
            <Divider />
            <List>
              <ListItem
                button
                key="personal"
                selected={page === "personal"}
                onClick={event => this.changePage("personal")}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.item}
                  primary="Personal Details"
                />
              </ListItem>
              <ListItem
                button
                key="journal"
                selected={page === "journal"}
                onClick={event => this.changePage("journal")}
              >
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText className={classes.item} primary="Journal" />
              </ListItem>
            </List>
          </Drawer>
          {employee && page === "personal" && (
            <EmployeePersonalDetails
              employee={employee}
              className={classes.main}
            />
          )}
          {employee && page === "journal" && (
            <EmployeeJournal employee={employee} className={classes.main} />
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(EmployeeModal));
