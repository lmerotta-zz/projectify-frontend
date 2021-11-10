import { act, renderHook } from "@testing-library/react-hooks";
import usePagination from "./usePagination";

describe("usePagination hook", () => {
  const p = [
    {
      description: "navigates to page 0",
      initialValues: [null, null],
      method: "onRowsPerPageChange",
      args: [{ target: { value: "20" } }],
      expected: { first: 20, last: null, before: null, after: null },
    },
    {
      description: "resets pagination",
      initialValues: [null, null],
      method: "resetPagination",
      args: [],
      expected: { first: 10, last: null, before: null, after: null },
    },
    {
      description: "navigate to page 1",
      initialValues: ["startCursor", "endCursor"],
      method: "onPageChange",
      args: [undefined, 1],
      expected: { first: 10, last: null, before: null, after: "endCursor" },
    },
    {
      description: "navigate to previous page",
      initialValues: ["startCursor", "endCursor"],
      method: "onPageChange",
      args: [undefined, -1],
      expected: { first: null, last: 10, before: "startCursor", after: null },
    },
  ];

  let refetch: jest.Mock;

  beforeEach(() => {
    refetch = jest.fn();
  });

  it.each(
    p.map((x) =>
      Object.assign(x, {
        toString: function () {
          return `Calls ${x.method} to ${x.description}`;
        },
      })
    )
  )("%s", ({ initialValues, method, args, expected }) => {
    const { result } = renderHook(() =>
      usePagination(refetch, ...initialValues)
    );

    act(() => {
      // @ts-ignore
      result.current[method](...args);
    });

    expect(refetch).toHaveBeenCalledWith(expected);
  });
});
