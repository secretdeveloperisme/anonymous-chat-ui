import {
    offset,
    safePolygon,
    useFloating,
    useHover,
    useClick,
    useDismiss,
    useInteractions,
} from "@floating-ui/react";
import { useCallback, useState } from "react";

export type FloatingTrigger = "hover" | "click" | "right-click" | "double-click";

interface FloatingComponentProps {
    anchorElement: React.ReactNode;
    children: React.ReactNode;
    trigger?: FloatingTrigger;
    wrapperClassName?: string;
    dropdownClassName?: string;
    placement?: "bottom-end" | "top-end" | "bottom-start" | "top-start";
}

export function FloatingComponent({
    anchorElement,
    children,
    trigger = "hover",
    wrapperClassName,
    dropdownClassName,
    placement,
}: FloatingComponentProps) {

    const [isOpen, setIsOpen] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: placement || "bottom-end",
        middleware: [offset({ mainAxis: 10 })],
    });

    const hover = useHover(context, {
        enabled: trigger === "hover",
        delay: 100,
        restMs: 150,
        handleClose: safePolygon(),
    });

    const click = useClick(context, {
        enabled: trigger === "click",
    });

    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        click,
        dismiss,
    ]);

    const handleRightClick = useCallback((e: React.MouseEvent) => {
        if (trigger !== "right-click") return;
        e.preventDefault();
        setIsOpen((prev) => !prev);
    }, [trigger]);

    const handleDoubleClick = useCallback(() => {
        if (trigger !== "double-click") return;
        setIsOpen((prev) => !prev);
    }, [trigger]);

    return (
        <div className={wrapperClassName}>
            <div
                ref={refs.setReference}
                onContextMenu={handleRightClick}
                onDoubleClick={handleDoubleClick}
                {...getReferenceProps()}
            >
                {anchorElement}
            </div>
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className={dropdownClassName}
                    onClick={() => setIsOpen(false)}
                    {...getFloatingProps()}
                >
                    {children}
                </div>
            )}
        </div>
    );
}