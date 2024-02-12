import { useEffect, useState } from "react";
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

   const fetcher = async (method, url, body, options) => {
      if (!method || url === "/") return;
      let response;
      let audio;

      setLoading(true);
      setIsSubmitted(false);
      setError("");

      try {
         audio = document.querySelector(".audio-alert-success");
         response = method === "get" ? await router.get(url, options) : await router[method](url, body, options);

         setData(response?.data);
         setStatus(response?.status);

         return { data: response.data, loading: false, error: false, status: response.status, isSubmitted: true };
      } catch (error) {
         audio = document.querySelector(".audio-alert-fail");
         const err = error?.response?.data?.error || error?.message || "Connection Failed With The Server";

         setError(err);
         setStatus(error?.status);

         console.log(error);
         return { data: null, loading: false, error: err, isSubmitted: true, status: error?.status };
      } finally {
         setLoading(false);
         setIsSubmitted(true);

         method !== "get" && audio.play();
      }
   };

   useEffect(() => {
      fetcher(method, url, body, options);
   }, [method, url, body, options]);

   const refetch = async (method, url, body, options) => await fetcher(method, url, body, options);
   return { data, loading, error, isSubmitted, status, refetch, setData };
};
