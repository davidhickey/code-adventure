import { useEffect } from "react";

const useDisableBodyScroll = (disableBodyScroll:boolean) => {
  useEffect(() => {
    if (disableBodyScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [disableBodyScroll]);
};

export default useDisableBodyScroll;