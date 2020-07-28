import PropTypes from "prop-types";
import * as React from "react";

export const Container = ({ children, isFinished, animationDuration }) => (
    <div
        style={{
            opacity: isFinished ? 0 : 1,
            pointerEvents: "none",
            transition: `opacity ${animationDuration}ms linear`,
        }}
    >
        {children}
    </div>
);

Container.propTypes = {
    animationDuration: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    isFinished: PropTypes.bool.isRequired,
};
