const whiteList = [
	"http://localhost:5173",
	"http://localhost:8000",
	"https://cars-management-client.vercel.app",
	"https://cars-management-client.netlify.app",
];

export const corsOrigins = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: (origin, callback) => {
		const isAcceptable = whiteList.some((site) => site === origin);
		if (isAcceptable || origin === undefined) callback(null, origin);
		else callback(`${origin}: Not Allowed By CORS`);
	},
};
