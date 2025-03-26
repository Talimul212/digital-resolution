import { useEffect } from "react";

const UseTitle = (title) => {
  useEffect(() => {
    document.title = `${title}-Tech.com`;
  }, [title]);
};
export default UseTitle;
