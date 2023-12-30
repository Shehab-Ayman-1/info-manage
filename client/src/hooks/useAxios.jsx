import { useEffect, useRef, useState } from "react";
import { routes } from "@/constants/routes";
import axios from "axios";

let router;
if (import.meta.env.MODE === "production") router = axios.create(routes.remote);
else router = axios.create(routes.locale);

export const useAxios = (method, url, body, options) => {
   const [data, setData] = useState();
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [status, setStatus] = useState(0);
   const abortController = useRef(null);

   const fetcher = async (method, url, body, options) => {
      if (!method || url === "/") return;

      abortController.current?.abort();
      abortController.current = new AbortController();

      setLoading(true);
      setIsSubmitted(false);
      setError("");

      try {
         let response;

         if (method === "get")
            response = await router.get(url, { signal: abortController.current?.signal, ...options });
         else
            response = await router[method](url, body, {
               AbortSignal: abortController.current?.signal,
               ...options,
            });

         setData(() => response?.data);
         setStatus(() => response?.status);
         setLoading(() => false);
         setIsSubmitted(() => true);

         return { data: response.data, loading: false, error: false, status: response.status, isSubmitted: true };
      } catch (error) {
         if (error.name === "CanceledError")
            return { data: null, loading: false, error: "", isSubmitted: true, status: 200 };

         const err = error?.response?.data?.error || error?.message || "Network Error";

         setError(() => err);
         setStatus(error?.status);
         setLoading(() => false);
         setIsSubmitted(() => true);

         console.log(error);
         return { data: null, loading: false, error: err, isSubmitted: true, status: error?.status };
      }
   };

   useEffect(() => {
      fetcher(method, url, body, options);
   }, [method, url, body, options]);

   const refetch = async (method, url, body, options) => await fetcher(method, url, body, options);
   return { data, loading, error, isSubmitted, status, refetch, setData };
};
