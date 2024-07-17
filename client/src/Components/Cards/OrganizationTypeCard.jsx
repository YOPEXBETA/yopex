import Card from "./index";
import React from "react";

function OrganizationTypeCard(props) {
  const { variant, extra, children, ...rest } = props;
  return (
    <Card extra={`p-4 ${extra}`}>
      <div {...rest}>{children}</div>
    </Card>
  );
}

export default OrganizationTypeCard;
