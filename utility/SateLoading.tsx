import React, { useEffect, useState } from "react";
interface Rprops{
    states:any
}
const useIsReady:React.FC<Rprops> = (states) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 3000);
  },[states]);

  return isReady;
};

export default useIsReady;