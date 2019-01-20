import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import EmployeeActions from "./EmployeeActions";

const styles = theme => ({
  user: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    margin: 10
  },
  name: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing.unit
  },
  link: {
    fontSize: "1.2em",
    lineHeight: "1.4em"
  },
  row: {
    whiteSpace: "nowrap"
  }
});

const Employee = props => {
  const {
    employee,
    selectedColumns,
    classes,
    openEmployeeModal,
    openAddEditModal
  } = props;
  const name = `${employee.firstName} ${employee.lastName}`;
  return (
    <TableRow key={employee.id} className={classes.row}>
      {selectedColumns.map((column, i) => {
        switch (column) {
          case "name":
            return (
              <TableCell key={i} component="td" scope="row">
                <div className={classes.user}>
                  <Avatar
                    alt={name}
                    src={employee.avatar}
                    className={classes.avatar}
                  />
                  <div className={classes.name}>
                    <Link
                      href="#"
                      onClick={openEmployeeModal(employee)}
                      className={classes.link}
                    >
                      {name}
                    </Link>
                    <em>{employee.role}</em>
                  </div>
                </div>
              </TableCell>
            );

          case "isActive":
            return (
              <TableCell key={i} component="td" scope="row">
                {employee[column] ? "On-Shift" : ""}
              </TableCell>
            );

          default:
            return (
              <TableCell key={i} component="td" scope="row">
                {employee[column]}
              </TableCell>
            );
        }
      })}
      <TableCell align="right">
        <EmployeeActions
          employee={employee}
          openEmployeeModal={openEmployeeModal}
          openAddEditModal={openAddEditModal}
        />
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(Employee);
