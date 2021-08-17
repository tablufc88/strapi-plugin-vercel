/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Initializer = ({ updatePlugin }) => {
  const ref = useRef();
  ref.current = updatePlugin;

  useEffect(() => {
    ref.current("strapi-plugin-vercel", "isReady", true);
  }, []);

  return null;
};

Initializer.propTypes = {
  updatePlugin: PropTypes.func.isRequired,
};

export default Initializer;
