import React from "react";
import ColumnService from "../services/columns.service";
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
      ColumnService: ColumnService,
      page: 0,
      rowsPerPage: 5
    };

    this.observer = ColumnService.subscribe(svc =>
      this.setState({ ColumnService: svc })
    );
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  handleColumnChange = event => {
    ColumnService.updateColumns(event.target.value);
  };

  render() {
    const {
      totalRecords,
      filterList,
      classes,
      page,
      rowsPerPage,
      handleChangePage,
      handleChangeRowsPerPage
    } = this.props;

    const { ColumnService } = this.state;

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
            value={ColumnService.selectedColumns}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected =>
              selected.map(s => ColumnService.columns[s].label).join(", ")
            }
            onChange={this.handleColumnChange}
          >
            {Object.keys(ColumnService.columns).map((key, i) => (
              <MenuItem key={i} className={classes.menuItem} value={key}>
                <Checkbox
                  checked={ColumnService.isColumnSelected(key)}
                  disabled={ColumnService.columns[key].disabled}
                />
                <ListItemText primary={ColumnService.columns[key].label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Toolbar>
    );
  }
}
export default withStyles(styles)(TableControls);
