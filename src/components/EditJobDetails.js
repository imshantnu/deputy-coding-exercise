import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
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
  button: {
    float: "right",
    position: "absolute",
    right: theme.spacing.unit,
    bottom: theme.spacing.unit
  }
});

const EditJobDetails = props => {
  const { employee, saveJobDetails, classes } = props;
  return (
    <form className={classes.root} onSubmit={saveJobDetails}>
      <Paper className={classes.paper} elevation={1}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="role"
          label="Job Title"
          type="text"
          defaultValue={employee ? employee.role : undefined}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="location"
          label="Located at"
          type="text"
          defaultValue={employee ? employee.location : undefined}
          fullWidth
        />

        <TextField
          margin="dense"
          id="payRate"
          label="Pay rate"
          type="number"
          defaultValue={employee ? employee.payRate : undefined}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Next
          <SendIcon />
        </Button>
      </Paper>
    </form>
  );
};

export default withStyles(styles)(EditJobDetails);
