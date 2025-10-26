import { ReactNode } from "react";

const DropdownSettingsItem = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return <div className="mb-2">{children}</div>;
};

export default DropdownSettingsItem;
