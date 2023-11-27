import { useEffect, useState } from "react";
import { routes } from "@/constants";
import axios from "axios";

let router;
if (import.meta.env.MODE === "productions") router = axios.create(routes.locale);
else router = axios.create(routes.remote);

export const useAxios = (method, url, body, options) => {
	const [data, setData] = useState();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [status, setStatus] = useState(0);

	const fetcher = async (method, url, body, options) => {
		if (!method || url === "/") return;

		try {
			if (method === "get") {
				const response = await router.get(url, options);
				setData(() => response?.data);
				setStatus(() => response?.status);
				return { data: response?.data, loading: false, error: false, status: response.status, isSubmitted: true };
			} else {
				const response = await router[method](url, body, options);
				setData(() => response?.data);
				setStatus(() => response?.status);
				return { data: response?.data, loading: false, error: false, status: response.status, isSubmitted: true };
			}
		} catch (error) {
			const err = error?.response?.data?.error || error?.message || "Network Error";
			console.log(error);
			setError(() => err);
			setStatus(error?.status);
			return { data: null, loading: false, error: err, isSubmitted: true, status: error?.status };
		} finally {
			setLoading(false);
			setIsSubmitted(true);
		}
	};

	useEffect(() => {
		fetcher(method, url, body, options);
	}, [method, url, body, options]);

	const refetch = async (method, url, body, options) => await fetcher(method, url, body, options);

	return { data, loading, error, isSubmitted, status, refetch };
};
