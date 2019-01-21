import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

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

const EditAddress = props => {
  const { employee, saveAddressDetails, classes } = props;
  return (
    <form className={classes.root} onSubmit={saveAddressDetails}>
      <Paper className={classes.paper} elevation={1}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="address"
          label="Street Address"
          type="text"
          defaultValue={employee ? employee.address : undefined}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="city"
          label="City"
          type="text"
          defaultValue={employee ? employee.city : undefined}
          fullWidth
        />

        <TextField
          margin="dense"
          id="state"
          label="State"
          type="text"
          defaultValue={employee ? employee.state : undefined}
          fullWidth
        />

        <TextField
          margin="dense"
          id="code"
          label="Zip code"
          type="text"
          defaultValue={employee ? employee.code : undefined}
          fullWidth
        />

        <TextField
          margin="dense"
          id="country"
          label="Country"
          type="text"
          defaultValue={employee ? employee.country : undefined}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
          <SaveIcon />
        </Button>
      </Paper>
    </form>
  );
};

export default withStyles(styles)(EditAddress);
