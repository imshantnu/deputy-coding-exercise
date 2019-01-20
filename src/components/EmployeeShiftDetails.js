import React from "react";
import EmployeesService from "../services/employees.service";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import EmployeeName from "./EmployeeName";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit,
    width: "auto"
  },
  shiftControl: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing.unit,
    width: "100%"
  },
  button: {
    margin: theme.spacing.unit * 0.5
  }
});

const EmployeeShiftDetails = props => {
  const { employee, classes } = props;
  const toggleBreak = () => {
    employee.toggleBreak().then(() => {
      EmployeesService.update("update");
    });
  };

  const toggleShift = () => {
    employee.toggleShift().then(() => {
      EmployeesService.update("update");
    });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.grid}
    >
      <EmployeeName employee={employee} />

      <div className={classes.shiftControl}>
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={toggleShift}
        >
          {employee.isActive ? "End Shift" : "Start Shift"}
        </Button>
        {employee.isActive && (
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={toggleBreak}
          >
            {employee.onBreak ? "End Break" : "Start Break"}
          </Button>
        )}
      </div>
    </Grid>
  );
};

export default withStyles(styles)(EmployeeShiftDetails);
