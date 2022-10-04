import { useEffect, useRef } from "react";

export const useClickCloseElement = (callback, outside) => {
    const domNode = useRef();
    useEffect(() => {
        let handler; 
        if(outside) {
            handler = (event) => {
                if(domNode.current === event.target) callback();
            }
        }
        else {
            handler = (event) => {
                if(!(domNode.current.contains(event.target))) callback();
            };
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    });
    return domNode;
}