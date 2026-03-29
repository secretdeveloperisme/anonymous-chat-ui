import { offset, safePolygon, useFloating, useHover, useInteractions } from "@floating-ui/react";
import { useState } from "react";

export function FloatingComponent({ anchorElement, children, wrapperClassName, dropdownClassName, placement }: { anchorElement: React.ReactNode, children: React.ReactNode, wrapperClassName?: string, dropdownClassName?: string, placement?: "bottom-end" | "top-end" | "bottom-start" | "top-start" }) {
    const [isHovered, setIsHovered] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
        open: isHovered,
        onOpenChange: setIsHovered,
        placement: placement || "bottom-end",
        middleware: [offset({ mainAxis: 10 })],
    });

    const hover = useHover(context, {
        enabled: true,
        delay: 100,
        restMs: 150,
        handleClose: safePolygon(),
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
    ]);
    return (
        <div className={wrapperClassName}>
            <div ref={refs.setReference} {...getReferenceProps()}>
                {anchorElement}
            </div>
            {isHovered && (
                <div ref={refs.setFloating} style={floatingStyles} className={dropdownClassName} {...getFloatingProps()}>
                    {children}
                </div>
            )}
        </div>

    );
}