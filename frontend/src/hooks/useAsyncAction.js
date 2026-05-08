import { useCallback, useState } from "react";

export const useAsyncAction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(async (action, { onError } = {}) => {
    setLoading(true);
    setError("");

    try {
      return await action();
    } catch (err) {
      const message =
        typeof onError === "function"
          ? onError(err)
          : err?.message || "Something went wrong.";
      setError(message);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, setError, run };
};
