import { Bills } from "../../models/index.js";

export const GET_BILLS = async (req, res) => {
	try {
		const { type } = req.query;
		const bills = await Bills.find({ type }).select(["_id", "client", "products", "pay"]);
		const clients = bills.map(({ _id, client, pay, products }) => {
			const billCost = products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
			return {
				_id,
				client,
				billCost,
				pay,
			};
		});

		res.status(200).json(clients);
	} catch (error) {
		res.status(404).json(`GET_BILLS: ${error.message}`);
	}
};

export const GET_CLIENTS_NAMES = async (req, res) => {
	try {
		const clients = await Bills.find().distinct("client");

		res.status(200).json(clients);
	} catch (error) {
		res.status(404).json(`GET_CLIENTS: ${error.message}`);
	}
};

export const GET_CLIENTS_LIST = async (req, res) => {
	try {
		const list = await Bills.aggregate([
			{
				$unwind: "$products",
			},
			{
				$group: {
					_id: "$client",
					billsCount: {
						$count: {},
					},
					neededCost: {
						$push: {
							$sum: {
								$multiply: ["$products.count", "$products.price"],
							},
						},
					},
					type: {
						$addToSet: "$type",
					},
					phone: {
						$addToSet: "$phone",
					},
					address: {
						$addToSet: "$address",
					},
					discount: {
						$push: {
							$sum: "$pay.discount",
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					client: "$_id",
					billsCount: 1,
					neededCost: { $sum: "$neededCost" },
					discount: { $arrayElemAt: ["$discount", 0] },
					address: { $arrayElemAt: ["$address", 0] },
					phone: { $arrayElemAt: ["$phone", 0] },
					type: { $arrayElemAt: ["$type", 0] },
				},
			},
		]);
		res.status(200).json(list);
	} catch (error) {
		res.status(404).json(`GET_CLIENTS_LIST: ${error.message}`);
	}
};
/* 
[
  {
    "billsCount": 6,
    "neededCost": [
      15000,
      1700,
      8000,
      12000,
		15000,
      8400
    ],
    "client": "الحاج رجب",
    "discount": 2000
  },
  {
    "billsCount": 6,
    "neededCost": [
      24000,
      5000,
      20000
    ],
    "client": "ميدو موبيل",
    "discount": 0
  }
]
*/
