import React from "react";
import { mount } from "enzyme";
import DeleteModal from "../components/DeleteModal";
import sinon from "sinon";

describe("Delete Modal", () => {
  let wrapper;
  let spy;

  beforeEach(() => {
    spy = sinon.spy();
    wrapper = mount(
      <DeleteModal open={true} onClose={spy} deleteEmployee={spy} />
    );
  });

  it("should have a display message to confirm deletion", () => {
    expect(wrapper.find("DialogContentText").text()).toBe(
      "Are you sure you want to delete this employee?"
    );
  });

  it("should have a cancel button", () => {
    const closeButton = wrapper.find("button#closeButton");
    closeButton.simulate("click");

    expect(closeButton.text()).toBe("Cancel");
    expect(spy.calledOnce).toBe(true);
  });

  it("should have a deleteButton button", () => {
    const deleteButton = wrapper.find("button#deleteButton");
    deleteButton.simulate("click");

    expect(deleteButton.text()).toBe("Delete");
    expect(spy.calledOnce).toBe(true);
  });
});
