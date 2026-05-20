import { clear } from "console";
import { useState, useEffect } from "react";

function useThrottle(value, limit) {
    const [throttledValue, setThrottledValue ] =useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setThrottledValue(value); }
        , limit);

        return () => clearTimeout(handler); }, [value, limit]);

        return throttledValue;
        
}