import axios from "axios";

export const SERVER_RESTART = async () => {
	try {
		setInterval(async () => await axios.get("https://info-manage-client.vercel.app"), 1000 * 30);
	} catch (error) {}
};
