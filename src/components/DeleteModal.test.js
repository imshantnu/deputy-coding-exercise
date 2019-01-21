import React from "react";
import { mount } from "enzyme";
import DeleteModal from "./DeleteModal";

describe("Delete Modal", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DeleteModal open={true} />);
  });

  it("should have a display message to confirm deletion", () => {
    expect(wrapper.find("DialogContentText").text()).toBe(
      "Are you sure you want to delete this employee?"
    );
  });
});
