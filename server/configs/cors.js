const localHosts = ["http://localhost:5000", "http://localhost:5173", "http://localhost:5174"];
const vercel = [];
const netlify = ["https://cars-management-client.netlify.app"];

const whiteList = [...localHosts, ...vercel, ...netlify];

export const corsOrigins = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: (origin, callback) => {
		// origin = undefined -> For localhost
		const isAcceptable = whiteList.some((site) => site === origin);
		if (isAcceptable || origin === undefined) callback(null, origin);
		else callback(`${origin}: Not Allowed By CORS`);
	},
};
