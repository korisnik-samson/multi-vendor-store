import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLElement | null> | RefObject<HTMLDivElement>) => {
    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 };

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240;

        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // check if dropdown would go off the right edge of the viewport
        if (left + dropdownWidth > window.innerWidth) {
            left = rect.right + window.scrollX - dropdownWidth;

            // if still off-screen, aligh to the right edge of the view port
            if (left < 0) left = window.innerWidth - dropdownWidth - 16
        }

        // ensuer the dropdown doesn't go off the edge
        if (left < 0) left = 16;

        return { top, left };
    };

    return { getDropdownPosition };
}