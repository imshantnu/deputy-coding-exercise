import React from "react";
import EmployeeService from "../services/employees.service";
import TableService from "../services/table.service";
import { withStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  Checkbox,
  TextField,
  TablePagination,
  ListItemText,
  Toolbar,
  FormControl,
  Select,
  InputLabel,
  Input
} from "@material-ui/core";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1em"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit
  },
  pagination: {
    align: "right",
    fontSize: "0.75rem"
  },
  "@media (max-width: 767px)": {
    root: {
      flexDirection: "column",
      alignItems: "flex-start"
    },
    textField: {
      margin: `${theme.spacing.unit} 0`
    },
    formControl: {
      margin: `${theme.spacing.unit} 0`
    }
  }
});

class TableControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableService: TableService
    };

    this.observer = TableService.subscribe(svc =>
      this.setState({ tableService: svc })
    );
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  handleColumnChange = event => {
    TableService.updateColumns(event.target.value);
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
    const { totalRecords, filterList, classes } = this.props;
    const { tableService } = this.state;

    return (
      <Toolbar className={classes.root}>
        <FormControl className={classes.formControl}>
          <TextField
            id="filter"
            label="Filter by name"
            type="search"
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            onChange={filterList}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Columns</InputLabel>
          <Select
            multiple
            value={tableService.selectedColumns}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected =>
              selected.map(s => tableService.columns[s].label).join(", ")
            }
            onChange={this.handleColumnChange}
          >
            {Object.keys(tableService.columns).map((key, i) => (
              <MenuItem key={i} className={classes.menuItem} value={key}>
                <Checkbox
                  checked={tableService.isColumnSelected(key)}
                  disabled={tableService.columns[key].disabled}
                />
                <ListItemText primary={tableService.columns[key].label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
