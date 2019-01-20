import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Badge } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  margin: {
    margin: theme.spacing.unit
  },
  avatar: {
    margin: 10,
    width: 80,
    height: 80
  },
  muted: {
    fontSize: "0.75em",
    color: "rgba(0, 0, 0, 0.87)"
  },
  badge: {
    background: "#7ce811",
    bottom: theme.spacing.unit * 0.5,
    top: "auto",
    border: "2px solid white",
    right: theme.spacing.unit * 2
  }
});

const EmployeeName = props => {
  const { employee, classes } = props;

  if (employee) {
    return (
      <div className={classes.root}>
        <Badge
          color="secondary"
          invisible={!employee.isActive}
          className={classes.margin}
          classes={{
            badge: classes.badge
          }}
        >
          <Avatar
            alt={`${employee.firstName} ${employee.lastName}`}
            src={employee.avatar}
            className={classes.avatar}
          />
        </Badge>

        <h2 className={classes.margin}>{`${employee.firstName} ${
          employee.lastName
        }`}</h2>

        <em className={classes.muted}>{employee.role}</em>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <FaceIcon className={classes.avatar} />
    </div>
  );
};

export default withStyles(styles)(EmployeeName);
