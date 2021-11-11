import { Maybe, Scalars } from "generated/graphql";
import { ChangeEvent, ReactNode, useCallback, useMemo, useState } from "react";
import GraphQLPaginationContext from "./GraphQLPaginationContext";

type RefetchFunction = (args: {
  [key: string]: any;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
}) => void;

const usePagination = (
  refetch: RefetchFunction,
  startCursor?: string | null | undefined,
  endCursor?: string | null | undefined
) => {
  const [currentPerPage, setCurrentPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const refetchPagination = useCallback(
    (page: number, perPage: number) => {
      const variables: Parameters<RefetchFunction>[0] = {
        first: null,
        last: null,
        before: null,
        after: null,
      };
      if (page === 0) {
        variables.first = perPage;
      } else if (page < currentPage) {
        variables.last = perPage;
        variables.before = startCursor;
      } /* istanbul ignore else */ else if (page > currentPage) {
        variables.first = perPage;
        variables.after = endCursor;
      }

      refetch(variables);
    },
    [currentPage, endCursor, refetch, startCursor]
  );

  const onPageChange = useCallback(
    (_, page: number) => {
      refetchPagination(page, currentPerPage);
      setCurrentPage(page);
    },
    [currentPerPage, refetchPagination]
  );

  const onPerPageChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const perPage = parseInt(event.target.value, 10);
      refetchPagination(0, perPage);
      setCurrentPage(0);
      setCurrentPerPage(perPage);
    },
    [refetchPagination]
  );

  return useMemo(() => {
    const methods = {
      page: currentPage,
      rowsPerPage: currentPerPage,
      onPageChange,
      onRowsPerPageChange: onPerPageChange,
      resetPagination: () => onPageChange(null, 0),
    };

    return {
      ...methods,
      PaginationProvider: ({ children }: { children: ReactNode }) => (
        <GraphQLPaginationContext.Provider value={methods}>
          {children}
        </GraphQLPaginationContext.Provider>
      ),
    };
  }, [currentPage, currentPerPage, onPageChange, onPerPageChange]);
};

export default usePagination;
