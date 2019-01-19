import React from "react";
import EmployeesService from "../services/employees.service";
import TableService from "../services/table.service";
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
  Paper
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class EmployeesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      order: "asc",
      orderBy: "name",
      TableService: TableService,
      loading: true
    };

    this.observer = EmployeesService.subscribe(employees => {
      this.setState({ employees: employees, loading: false });
    });

    this.tableSubscriber = TableService.subscribe(svc => {
      this.setState({ TableService: svc });
    });

    EmployeesService.init();
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
    this.tableSubscriber.unsubscribe();
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
      EmployeesService.paginate();
      TableService.resetPagination();
    });
  };

  render() {
    const { classes } = this.props;
    const { loading, employees, TableService, orderBy, order } = this.state;
    if (!loading && employees.length) {
      return (
        <Paper className={classes.root}>
          <TableControls
            filterList={EmployeesService.filterList.bind(EmployeesService)}
            totalRecords={EmployeesService.list.length}
          />

          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {TableService.selectedColumns.map((column, i) => (
                  <TableCell
                    key={i}
                    sortDirection={orderBy === column.key ? order : false}
                  >
                    <Tooltip
                      title="Sort"
                      placement="bottom-end"
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === column.key}
                        direction={order}
                        onClick={this.sort(column.key)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                ))}

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.map((employee, i) => (
                <Employee
                  key={i}
                  employee={employee}
                  selectedColumns={TableService.selectedColumns}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    } else if (loading) {
      return <CircularProgress />;
    }
  }
}
export default withStyles(styles)(EmployeesList);
