import React, { useEffect, useState } from "react";

export const useInfinteScroll = callback => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //binding the isScrolling function to scroll event.
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling)
    },[])

    useEffect(() => {
        if(isLoading) {
            callback();
        }
    },[isLoading])

    const isScrolling = () => {
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }
        setIsLoading(true)
    }

    return [isLoading, setIsLoading];
}