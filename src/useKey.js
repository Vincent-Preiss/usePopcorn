import { useEffect } from "react";

export function useKey(key, callback) {
  useEffect(
    function () {
      function cb(e) {
        if (e.code === key) {
          callback();
        }
      }

      document.addEventListener("keydown", cb);

      return function () {
        document.removeEventListener("keydown", cb);
      };
    },
    [callback, key]
  );
  return {};
}
