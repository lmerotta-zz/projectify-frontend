import { BoundCanProps as CaslCanProps, Can as CaslCan } from "@casl/react";
import { usePermissions } from "hooks";
import { ReactNode } from "react";
import { AppAbilityType } from "types";

type CanProps = CaslCanProps<AppAbilityType> & {
  children: ReactNode | ((isAllowed: boolean) => ReactNode);
};

const Can = (props: CanProps) => {
  const ability = usePermissions();

  return <CaslCan ability={ability} {...props} />;
};

export default Can;
