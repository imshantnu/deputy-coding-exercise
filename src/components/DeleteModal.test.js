import React from "react";
import { shallow } from "enzyme";
import DeleteModal from "./DeleteModal";

test("DeleteModal shows users warning about deletion", () => {
  // Render a checkbox with label in the document
  const component = shallow(
    <DeleteModal open="true" onClose="deleteEmployee" />
  );

  expect(component.text()).toEqual("Off");
});
