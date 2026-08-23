import "./Skeleton.css";

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    style?: React.CSSProperties;
}

export default function Skeleton({
    width,
    height,
    borderRadius,
    className = "",
    style,
}: SkeletonProps) {
    const customStyle: React.CSSProperties = {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
        ...style,
    };

    return <div className={`skeleton-loader ${className}`} style={customStyle} />;
}
