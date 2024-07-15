import useSWR from "swr";
import { fetcher } from "../../utils/api";

function useQuery(url) {
  let { data, error } = useSWR(url, fetcher);
console.log('useQuery error', error)
  return {
    data,
    isLoading: !error && data === undefined,
    isError: error,
  };
}

export default useQuery;
