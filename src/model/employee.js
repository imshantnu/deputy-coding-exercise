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

  async update(data) {
    return fetch(
      `https://5c4002352928860014e06f43.mockapi.io/api/employee/${this.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
  }

  async edit(data) {
    return this.update(data).then(() => {
      Object.assign(this, data);
    });
  }

  async updateJournal(data) {
    this.journals.push(data);
    return this.update({
      journals: this.journals
    });
  }

  async toggleBreak() {
    this.onBreak = !this.onBreak;
    return this.update({
      onBreak: this.onBreak
    });
  }

  async toggleShift() {
    this.isActive = !this.isActive;
    return this.update({
      isActive: this.isActive
    });
  }
}
export default Employee;
