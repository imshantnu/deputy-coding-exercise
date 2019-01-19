import React from "react";
import EmployeeService from "../services/employees.service";
import TableService from "../services/table.service";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  TextField,
  TablePagination
} from "@material-ui/core";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  pagination: {
    align: "right"
  }
});

class TableControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showColumns: null,
      tableService: TableService
    };

    this.observer = TableService.subscribe(svc =>
      this.setState({ tableService: svc })
    );
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  handleColumnsClick = event => {
    this.setState({ showColumns: event.currentTarget });
  };

  handleColumnsClose = () => {
    this.setState({ showColumns: null });
  };

  handleColumnChange = key => () => {
    this.handleColumnsClose();
    TableService.toggleColumnSelection(key);
  };

  handleChangePage = (event, newPage) => {
    TableService.page = newPage;
    EmployeeService.paginate(TableService.page, TableService.rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    TableService.rowsPerPage = event.target.value;
    EmployeeService.paginate(TableService.page, TableService.rowsPerPage);
  };

  render() {
    const { totalRecords, numSelected, filterList, classes } = this.props;
    const { showColumns, tableService } = this.state;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <TextField
          id="filter"
          label="Filter by name"
          type="search"
          className={classes.textField}
          margin="normal"
          onChange={filterList}
        />

        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleColumnsClick}
        >
          Also Show
        </Button>
        <Menu
          anchorEl={showColumns}
          open={Boolean(showColumns)}
          onClose={this.handleClose}
        >
          {Object.keys(tableService.columns).map((key, i) => (
            <MenuItem
              key={i}
              className={classNames(classes.menuItem, {
                [classes.menuItemDisabled]: tableService.columns[key].disabled
              })}
              onClick={this.handleColumnChange(key)}
            >
              <Checkbox
                checked={tableService.isColumnSelected(key)}
                disabled={tableService.columns[key].disabled}
              />
              {tableService.columns[key].label}
            </MenuItem>
          ))}
        </Menu>

        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords}
          rowsPerPage={tableService.rowsPerPage}
          page={tableService.page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage.bind(this)}
          onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
        />
      </Toolbar>
    );
  }
}
export default withStyles(styles)(TableControls);
