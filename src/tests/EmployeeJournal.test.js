import React from "react";
import { mount, shallow } from "enzyme";
import EmployeeJournal from "../components/EmployeeJournal";
import sinon from "sinon";
import { Typography, Fab, TextField } from "@material-ui/core";

describe("Employee Journal Component", () => {
  let employeeMock;

  beforeEach(() => {
    employeeMock = {
      id: 1,
      journals: [],
      updateJournal: () => {}
    };
  });

  it("should show `No Journal entries available` if journal is empty", () => {
    const wrapper = mount(<EmployeeJournal employee={employeeMock} />);
    expect(wrapper.find(Typography).text()).toBe(
      "No Journal entries available yet!"
    );
  });

  it("should show all existing entries in journal", () => {
    employeeMock.journals.push(
      {
        entry: "a test entry",
        date: new Date("1900-12-12").toDateString()
      },
      {
        entry: "another test entry",
        date: new Date("2000-12-12").toDateString()
      }
    );
    const wrapper = mount(<EmployeeJournal employee={employeeMock} />);
    expect(
      wrapper
        .find("p")
        .at(0)
        .text()
    ).toBe("Wed Dec 12 1900");
    expect(
      wrapper
        .find("em")
        .at(0)
        .text()
    ).toBe("a test entry");
    expect(
      wrapper
        .find("p")
        .at(1)
        .text()
    ).toBe("Tue Dec 12 2000");
    expect(
      wrapper
        .find("em")
        .at(1)
        .text()
    ).toBe("another test entry");
  });
});
