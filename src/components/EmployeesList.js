import React from "react";
import EmployeesService from "../services/employees.service";
import ColumnService from "../services/columns.service";
import TableControls from "./TableControls";
import Employee from "./Employee";
import { withStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  Paper,
  Fab
} from "@material-ui/core";
import EmployeeModal from "./EmployeeModal";
import AddEditEmployee from "./AddEditEmployee";
import FaceIcon from "@material-ui/icons/Face";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  center: {
    textAlign: "center"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  },
  "@media (max-width: 767px)": {
    root: {
      margin: theme.spacing.unit
    }
  }
});

class EmployeesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      order: "asc",
      orderBy: "name",
      ColumnService: ColumnService,
      loading: true,
      employeeModalConfig: {
        open: false
      },
      addEditEmployeeConfig: {
        open: false
      },
      page: 0,
      rowsPerPage: 5
    };

    this.observer = EmployeesService.subscribe(employees => {
      this.setState({ employees: employees, loading: false });
    });

    this.columnsObserver = ColumnService.subscribe(svc => {
      this.setState({ ColumnService: svc });
    });

    EmployeesService.init();
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
    this.columnsObserver.unsubscribe();
  }

  sort = orderBy => () => {
    const order =
      this.state.orderBy === orderBy && this.state.order === "desc"
        ? "asc"
        : "desc";

    this.setState({
      order: order,
      orderBy: orderBy
    });

    EmployeesService.sortList(orderBy, order).then(() => {
      EmployeesService.paginate(this.state.page, this.state.rowsPerPage);
    });
  };

  openEmployeeModal = employee => () => {
    this.setState({
      employeeModalConfig: {
        open: true,
        employee: employee
      }
    });
  };

  closeEmployeeModal = () => {
    this.setState({
      employeeModalConfig: {
        open: false
      }
    });
  };

  openAddEditModal = employee => () => {
    this.setState({
      addEditEmployeeConfig: {
        open: true,
        employee: employee
      }
    });
  };

  closeAddEditModal = () => {
    this.setState({
      addEditEmployeeConfig: {
        open: false
      }
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
    EmployeesService.paginate(newPage, this.state.rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    EmployeesService.paginate(this.state.page, event.target.value);
  };

  render() {
    const { classes } = this.props;
    const {
      loading,
      employees,
      ColumnService,
      orderBy,
      order,
      employeeModalConfig,
      addEditEmployeeConfig
    } = this.state;

    if (!loading) {
      return (
        <Paper className={classes.root}>
          <TableControls
            filterList={EmployeesService.filterList.bind(EmployeesService)}
            totalRecords={EmployeesService.list.length}
            page={this.state.page}
            rowsPerPage={this.state.rowsPerPage}
            handleChangePage={this.handleChangePage.bind(this)}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
          />

          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {ColumnService.selectedColumns.map((column, i) => (
                    <TableCell
                      key={i}
                      sortDirection={orderBy === column ? order : false}
                    >
                      <Tooltip
                        title="Sort"
                        placement="bottom-end"
                        enterDelay={300}
                      >
                        <TableSortLabel
                          active={orderBy === column}
                          direction={order}
                          onClick={this.sort(column)}
                        >
                          {ColumnService.columns[column].label}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  ))}

                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={ColumnService.selectedColumns.length + 1}
                      className={classes.center}
                    >
                      No results found!
                    </TableCell>
                  </TableRow>
                )}

                {employees.map((employee, i) => (
                  <Employee
                    key={i}
                    employee={employee}
                    selectedColumns={ColumnService.selectedColumns}
                    openEmployeeModal={this.openEmployeeModal}
                    openAddEditModal={this.openAddEditModal}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          <EmployeeModal
            open={employeeModalConfig.open}
            employee={employeeModalConfig.employee}
            onClose={this.closeEmployeeModal}
          />

          <AddEditEmployee
            open={addEditEmployeeConfig.open}
            employee={addEditEmployeeConfig.employee}
            onClose={this.closeAddEditModal}
          />

          <Fab
            aria-label="Add New Employee"
            className={classes.fab}
            color="primary"
            onClick={this.openAddEditModal()}
          >
            <FaceIcon />
          </Fab>
        </Paper>
      );
    } else if (loading) {
      return <CircularProgress />;
    }
  }
}
export default withStyles(styles)(EmployeesList);
