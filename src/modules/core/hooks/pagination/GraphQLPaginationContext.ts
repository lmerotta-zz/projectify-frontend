import { TablePaginationProps } from "@mui/material";
import { createContext } from "react";

type GraphQLPaginationContextProps = {
  page: number;
  rowsPerPage: number;
  onPageChange: TablePaginationProps["onPageChange"];
  onRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"];
  resetPagination: () => void;
};

const GraphQLPaginationContext = createContext<GraphQLPaginationContextProps>(
  {} as GraphQLPaginationContextProps
);

export default GraphQLPaginationContext;
