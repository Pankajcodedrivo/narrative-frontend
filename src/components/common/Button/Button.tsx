"use client";

import React from "react";
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";
import "./Button.css";

export interface ButtonProps extends MuiButtonProps {
    label?: string;
}

const Button: React.FC<ButtonProps> = ({ children, label, className = "", ...props }) => {
    return (
        <MuiButton className={`custom-btn ${className}`} {...props}>
            {label || children}
        </MuiButton>
    );
};

export default Button;
