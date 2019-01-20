import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EmailIcon from "@material-ui/icons/Email";
import CakeIcon from "@material-ui/icons/Cake";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ContactsIcon from "@material-ui/icons/Contacts";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    width: "100%"
  },
  h4: {
    margin: 0
  },
  paper: {
    margin: "16px 0",
    padding: theme.spacing.unit
  },
  muted: {
    fontSize: "0.75em",
    color: "#333333"
  },
  p: {
    margin: theme.spacing.unit,
    display: "flex",
    alignItems: "center",
    fontSize: "0.8em"
  },
  icon: {
    fontSize: "1.25em",
    color: "#333333",
    paddingRight: theme.spacing.unit
  },
  address: {
    alignItems: "center",
    fontSize: "0.8rem"
  }
});

const EmployeePersonalDetails = props => {
  const { employee, classes } = props;
  return (
    <div className={classes.root}>
      <h4 className={classes.h4}>Personal Details</h4>

      <Paper className={classes.paper} elevation={1}>
        <Typography variant="h6" component="h3" className={classes.muted}>
          CONTACT
        </Typography>
        <Typography component="p" className={classes.p}>
          <PhoneIphoneIcon className={classes.icon} /> {employee.phone}
        </Typography>
        <Typography component="p" className={classes.p}>
          <EmailIcon className={classes.icon} /> {employee.email}
        </Typography>
      </Paper>

      <Paper className={classes.paper} elevation={1}>
        <Typography variant="h6" component="h3" className={classes.muted}>
          BASIC INFO
        </Typography>
        <Typography component="p" className={classes.p}>
          <CakeIcon className={classes.icon} />{" "}
          {new Date(employee.birthDate).toDateString()}
        </Typography>
        <Typography component="p" className={classes.p}>
          <WorkOutlineIcon className={classes.icon} />{" "}
          {new Date(employee.createdAt).toDateString()}
        </Typography>
      </Paper>

      <Paper className={classes.paper} elevation={1}>
        <Typography variant="h6" component="h3" className={classes.muted}>
          EMERGENCY CONTACT
        </Typography>
        <Typography component="p" className={classes.p}>
          <ContactsIcon className={classes.icon} /> {employee.contactName}
        </Typography>
        <Typography component="p" className={classes.p}>
          <PhoneIcon className={classes.icon} /> {employee.contactNumber}
        </Typography>
      </Paper>

      <Paper className={classes.paper} elevation={1}>
        <Typography variant="h6" component="h3" className={classes.muted}>
          ADDRESS
        </Typography>
        <Typography component="div" className={classes.p}>
          <LocationOnIcon className={classes.icon} />
          <Typography component="div" className={classes.address}>
            <div>{`${employee.address}, ${employee.city}`}</div>
            <div>{`${employee.state} - ${employee.code}`}</div>
          </Typography>
        </Typography>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(EmployeePersonalDetails);
