import type { ReactNode } from "react";
import "./SubtleAuthBackground.css";

interface SubtleAuthBackgroundProps {
    className?: string;
    children: ReactNode;
}

export default function SubtleAuthBackground({ className, children }: SubtleAuthBackgroundProps) {
    return <main className={`subtle-auth-bg${className ? ` ${className}` : ""}`}>{children}</main>;
}