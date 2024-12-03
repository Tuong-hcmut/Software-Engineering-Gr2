import { useContext } from "react";
import { SpecificationsContext } from "../context/SpecificationsContext";

const useSpecs = () => {
    const context = useContext(SpecificationsContext);
    if (!context) {
      throw new Error('useSpecs must be used within an SpecificationsProvider');
    }
    return context;
  };

export default useSpecs;