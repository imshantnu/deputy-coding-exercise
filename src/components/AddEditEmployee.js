import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PeopleIcon from "@material-ui/icons/People";
import CloseIcon from "@material-ui/icons/Close";
import EmployeeName from "./EmployeeName";
import EditGeneralDetails from "./EditGeneralDetails";
import EditJobDetails from "./EditJobDetails";
import EditAddress from "./EditAddress";
import EmployeesService from "../services/employees.service";

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
    flexGrow: 1,
    marginTop: theme.spacing.unit * 4
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
      minHeight: "100%",
      padding: 0
    }
  }
});

class AddEditEmployee extends React.Component {
  state = {
    step: "general",
    payload: {}
  };

  saveGeneralDetails(event) {
    event.preventDefault();
    // construct the payload to save at later stage;
    const payload = {
      ...this.state.payload,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      birthDate: event.target.birthDate.value,
      phone: event.target.phone.value,
      contactNumber: event.target.contactNumber.value,
      contactName: event.target.contactName.value
    };
    this.setState({
      payload: payload,
      step: "jobInfo"
    });
  }

  saveJobDetails(event) {
    event.preventDefault();
    const payload = {
      ...this.state.payload,
      role: event.target.role.value,
      payRate: event.target.payRate.value,
      location: event.target.location.value
    };
    this.setState({
      payload: payload,
      step: "address"
    });
  }

  saveAddressDetails(event) {
    event.preventDefault();
    const close = this.props.onClose;
    let promise;
    const payload = {
      ...this.state.payload,
      address: event.target.address.value,
      city: event.target.city.value,
      code: event.target.code.value,
      state: event.target.state.value,
      country: event.target.country.value
    };

    if (this.props.employee) {
      promise = this.props.employee.edit(payload);
    } else {
      promise = EmployeesService.add(payload);
    }

    promise
      .then(() => EmployeesService.update())
      .then(() => {
        this.setState({
          step: "general",
          payload: {}
        });
        close();
      });
  }

  render() {
    const { open, onClose, classes, employee } = this.props;
    const { step } = this.state;

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
            <EmployeeName employee={employee} />

            <Divider />

            <List>
              <ListItem button key="general" selected={step === "general"}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText className={classes.item} primary="General" />
              </ListItem>

              <ListItem button key="jobInfo" selected={step === "jobInfo"}>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText className={classes.item} primary="Job Title" />
              </ListItem>

              <ListItem button key="address" selected={step === "address"}>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText className={classes.item} primary="Address" />
              </ListItem>
            </List>
          </Drawer>
          {step === "general" && (
            <EditGeneralDetails
              employee={employee}
              saveGeneralDetails={this.saveGeneralDetails.bind(this)}
              className={classes.main}
            />
          )}

          {step === "jobInfo" && (
            <EditJobDetails
              employee={employee}
              saveJobDetails={this.saveJobDetails.bind(this)}
              className={classes.main}
            />
          )}

          {step === "address" && (
            <EditAddress
              employee={employee}
              saveAddressDetails={this.saveAddressDetails.bind(this)}
              className={classes.main}
            />
          )}
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddEditEmployee);
