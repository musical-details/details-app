import React, { FunctionComponent } from "react";
import "./gradient-header.scss";

type GradientHeaderProps = {
  icon: string;
  text: string;
};

const GradientHeader: FunctionComponent<GradientHeaderProps> = ({
  text
}: GradientHeaderProps) => {
  return (
    <div className="gradient-header">
      <div>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default GradientHeader;
