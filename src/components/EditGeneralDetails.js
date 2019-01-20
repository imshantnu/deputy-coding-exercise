import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Divider } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

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
  button: {
    float: "right",
    position: "absolute",
    right: theme.spacing.unit,
    bottom: theme.spacing.unit
  }
});

const EditGeneralDetails = props => {
  const { employee, saveGeneralDetails, classes } = props;
  return (
    <form className={classes.root} onSubmit={saveGeneralDetails}>
      <Paper className={classes.paper} elevation={1}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          defaultValue={employee ? employee.firstName : undefined}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          defaultValue={employee ? employee.lastName : undefined}
          fullWidth
        />

        <TextField
          id="birthDate"
          label="Birthday"
          type="date"
          defaultValue={
            employee
              ? new Date(employee.birthDate).toISOString().split("T")[0]
              : undefined
          }
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          margin="dense"
          id="phone"
          label="Phone Number"
          type="tel"
          defaultValue={employee ? employee.phone : undefined}
          fullWidth
        />

        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          defaultValue={employee ? employee.email : undefined}
          fullWidth
        />

        <Divider />

        <TextField
          margin="dense"
          id="contactName"
          label="Emergency contact's name"
          type="text"
          defaultValue={employee ? employee.contactName : undefined}
          fullWidth
        />

        <TextField
          margin="dense"
          id="contactNumber"
          label="Emergency contact's number"
          type="tel"
          defaultValue={employee ? employee.contactNumber : undefined}
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

export default withStyles(styles)(EditGeneralDetails);
