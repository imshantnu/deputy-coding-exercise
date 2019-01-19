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
  }
});

const Employee = props => {
  const { employee, selectedColumns, classes } = props;
  const name = `${employee.firstName} ${employee.lastName}`;
  return (
    <TableRow key={employee.id}>
      {selectedColumns.map((column, i) => {
        switch (column.key) {
          case "name":
            return (
              <TableCell key={i} component="th" scope="row">
                <div className={classes.user}>
                  <Avatar
                    alt={name}
                    src={employee.avatar}
                    className={classes.avatar}
                  />
                  <div className={classes.name}>
                    <Link href="#" className={classes.link}>
                      {name}
                    </Link>
                    <em>{employee.role}</em>
                  </div>
                </div>
              </TableCell>
            );

          case "isActive":
            return (
              <TableCell key={i} component="th" scope="row">
                {employee[column.key] ? "Active" : "Inactive"}
              </TableCell>
            );

          default:
            return (
              <TableCell key={i} component="th" scope="row">
                {employee[column.key]}
              </TableCell>
            );
        }
      })}
      <TableCell align="right">
        <EmployeeActions />
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(Employee);
