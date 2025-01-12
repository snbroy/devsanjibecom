import React, {useEffect, useState} from "react";


const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width <= 869);
}

export const serverUrl = process.env.REACT_APP_BASE_URL;
export default useCheckMobileScreen