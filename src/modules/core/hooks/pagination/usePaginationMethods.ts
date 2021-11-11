import { useContext } from "react";
import GraphQLPaginationContext from "./GraphQLPaginationContext";

const usePaginationMethods = () => {
  return useContext(GraphQLPaginationContext);
};

export default usePaginationMethods;
