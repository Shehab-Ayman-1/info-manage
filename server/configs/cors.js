const origin = "https://info-manage-client";
const whiteList = ["http://localhost:5173", `${origin}.vercel.app`, `${origin}.netlify.app`];

export const corsOrigins = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: (origin, callback) => {
		const isAcceptable = whiteList.some((site) => site === origin);
		if (isAcceptable || origin === undefined) callback(null, origin);
		else callback(`${origin}: Not Allowed By CORS`, origin);
	},
};
