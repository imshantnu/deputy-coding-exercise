import React from "react";
import EmployeesService from "../services/employees.service";
import DeleteModal from "./DeleteModal";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,

    "&:last-child": {
      marginRight: 0
    }
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
});

class EmployeeActions extends React.Component {
  state = {
    anchorElement: null,
    openDelete: false
  };

  handleOpenActionsClick = event => {
    this.setState({ anchorElement: event.currentTarget });
  };

  handleActionsClose = () => {
    this.setState({ anchorElement: null });
  };

  confirmDelete = id => {
    this.setState({ openDelete: true });
  };

  deleteEmployee = () => {
    const { employee } = this.props;
    const employeeIndex = EmployeesService.list.indexOf(employee);
    employee.delete().then(() => {
      this.setState({ openDelete: false });
      EmployeesService.update("delete", employeeIndex);
    });
  };

  closeDeleteModal = () => {
    this.setState({ openDelete: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorElement, openDelete } = this.state;

    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button}>
          View
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleOpenActionsClick}
        >
          Actions
        </Button>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={this.handleActionsClose}
        >
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Edit"
            />
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={this.confirmDelete}>
            <ListItemIcon className={classes.icon}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Delete"
            />
          </MenuItem>
        </Menu>

        <DeleteModal
          open={openDelete}
          onClose={this.closeDeleteModal}
          deleteEmployee={this.deleteEmployee.bind(this)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeActions);
