import { Subject } from "rxjs";

class TableService extends Subject {
  constructor() {
    super();

    //  object to list all the possible columns; ideally it should be an API endpoint that will return possible columns
    this.columns = {
      name: {
        key: "name",
        disabled: true,
        label: "Name & Access"
      },
      location: {
        key: "location",
        disabled: false,
        label: "Main Location"
      },
      isActive: {
        key: "isActive",
        disabled: false,
        label: "Status"
      },
      email: {
        key: "email",
        disabled: false,
        label: "Email Address"
      },
      phone: {
        key: "phone",
        disabled: false,
        label: "Mobile"
      },
      timeSheetCode: {
        key: "timeSheetCode",
        disabled: false,
        label: "Time Sheet Export Code"
      },
      leaves: {
        key: "leaves",
        disabled: false,
        label: "Leaves Balance"
      }
    };

    // create an iterable array of all the selected columns
    this.selectedColumns = ["name", "email"];

    // pagination settings
    this.page = 0;
    this.rowsPerPage = 5;
  }

  isColumnSelected(key) {
    return this.selectedColumns.some(column => column === key);
  }

  updateColumns(columns) {
    this.selectedColumns = columns;
    this.next(this);
  }

  resetPagination() {
    // pagination settings
    this.page = 0;
    this.rowsPerPage = 5;
    this.next(this);
  }
}
const singleton = new TableService();
export default singleton;
