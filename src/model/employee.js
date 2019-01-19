class Employee {
  constructor(object) {
    Object.assign(this, object);
  }

  async delete() {
    return fetch(
      `https://5c4002352928860014e06f43.mockapi.io/api/employee/${this.id}`,
      {
        method: "DELETE"
      }
    );
  }
}
export default Employee;
