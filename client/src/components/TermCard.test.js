import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import TermCard from "./TermCard";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should render term card", () => {
    act(() => {
        render(<TermCard term={{term: 'Term', description: 'desc', date: 0}}/>, container);
    });
    expect(container.textContent).toContain("TermОпределение: Desc.Дата создания");
});