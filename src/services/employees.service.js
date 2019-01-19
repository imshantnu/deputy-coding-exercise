import { Subject } from "rxjs";
import Employee from "../model/employee";

class EmployeesService extends Subject {
  constructor() {
    super();

    this.promise = null;
    this.list = [];
  }

  init() {
    if (!this.promise) {
      this.promise = this.getList();
    }

    return this.promise;
  }

  async getList() {
    // using a mock API to return a bunch of users
    const response = await fetch(
      "https://5c4002352928860014e06f43.mockapi.io/api/employee"
    );

    this.handleResponse(response);
  }

  async add(employee) {}

  async handleResponse(response) {
    let data;
    try {
      data = await response.json();
      if (data.error) {
        throw data.error;
      }
    } catch (error) {
      throw error || "An unknown error has occurred";
    }
    this.list = data.map(object => new Employee(object));
    // sort the list and paginate
    this.sortList().then(() => this.paginate());
  }

  async filterList(event) {
    const keyword = event.target ? event.target.value : event;
    if (!keyword.length) {
      this.next(this.list);
    }
    const filteredList = this.list.filter(
      employee =>
        employee.firstName.toLowerCase().includes(keyword) ||
        employee.lastName.toLowerCase().includes(keyword)
    );
    await this.next(filteredList);
  }

  async paginate(page = 0, rows = 5) {
    // ideally result set should be paginated from API using range headers
    const start = page * rows;
    const end = start + rows;
    const paginatedList = this.list.slice(start, end);
    await this.next(paginatedList);
  }

  async sortList(orderBy = "name", order = "asc") {
    // in an ideal world we would have sorting implemented at an API level
    await this.list.sort(this.compare(orderBy, order));
  }

  compare(property, order) {
    let sortOrder = 1;
    if (order === "desc") {
      sortOrder = -1;
    }
    if (property === "name") property = "firstName";
    return (a, b) => {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
}

const singleton = new EmployeesService();
export default singleton;
