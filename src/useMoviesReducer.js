import { useEffect, useReducer } from "react";

const initialState = {
  movies: [],
  isLoading: false,
  error: "",
};
export function useMovies(query) {
  const [{ movies, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function reducer(state, action) {
    switch (action.type) {
      case "beginFetch":
        return { ...state, isLoading: true, error: "" };
      case "dataReceived":
        return { ...state, isLoading: false, movies: action.payload };
      case "fetchError":
        return { ...state, isLoading: false, error: action.payload };
      case "dismissQuery":
        return { ...state, isLoading: false, error: "", movies: [] };
      default:
        throw new Error("Unknown Action");
    }
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const KEY = "6de3e530";
      async function fetchMovies() {
        try {
          dispatch({ type: "beginFetch" });

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          dispatch({ type: "dataReceived", payload: data.Search });
        } catch (err) {
          if (err.name !== "AbortError") {
            dispatch({ type: "fetchError", payload: err.message });
          }
        }
      }

      if (query.length < 3) {
        dispatch({ type: "dismissQuery" });
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
