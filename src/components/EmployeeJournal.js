import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, TextField, Fab } from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import SaveIcon from "@material-ui/icons/Save";
import EmployeesService from "../services/employees.service";

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
  journal: {
    overflow: "auto",
    maxHeight: 400
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
  fab: {
    float: "right"
  }
});
class EmployeeJournal extends React.Component {
  state = {
    saveDisabled: true,
    newJournalEntry: ""
  };

  validateForm(event) {
    if (event.target.value.length) {
      this.setState({
        saveDisabled: false,
        newJournalEntry: event.target.value
      });
    } else {
      this.setState({
        saveDisabled: true,
        newJournalEntry: ""
      });
    }
  }

  saveEntry() {
    const data = {
      entry: this.state.newJournalEntry,
      date: new Date().toISOString()
    };
    this.props.employee.updateJournal(data).then(() => {
      this.setState({
        saveDisabled: true,
        newJournalEntry: ""
      });
      EmployeesService.update();
    });
  }

  render() {
    const { employee, classes } = this.props;
    return (
      <div className={classes.root}>
        <h4 className={classes.h4}>Journal</h4>

        {employee.journals.length === 0 && (
          <Paper className={classes.paper} elevation={1}>
            <Typography component="p" className={classes.p}>
              <BookIcon className={classes.icon} /> No Journal entries available
              yet!
            </Typography>
          </Paper>
        )}

        {employee.journals.length > 0 && (
          <div className={classes.journal}>
            {employee.journals.map((journal, i) => (
              <Paper key={i} className={classes.paper} elevation={1}>
                <Typography component="p" className={classes.p}>
                  <BookIcon className={classes.icon} />{" "}
                  {new Date(journal.date).toDateString()}
                </Typography>
                <Typography component="em" className={classes.p}>
                  {journal.entry}
                </Typography>
              </Paper>
            ))}
          </div>
        )}

        <TextField
          id="journal-entry"
          label="Write a journal entry"
          fullWidth
          margin="normal"
          variant="filled"
          multiline={true}
          rows="2"
          rowsMax="4"
          required={true}
          value={this.state.newJournalEntry}
          inputProps={{
            required: true,
            maxLength: 255
          }}
          InputLabelProps={{
            shrink: true
          }}
          onChange={this.validateForm.bind(this)}
        />
        <Fab
          disabled={this.state.saveDisabled}
          aria-label="Save"
          className={classes.fab}
          onClick={this.saveEntry.bind(this)}
        >
          <SaveIcon />
        </Fab>
      </div>
    );
  }
}
export default withStyles(styles)(EmployeeJournal);
