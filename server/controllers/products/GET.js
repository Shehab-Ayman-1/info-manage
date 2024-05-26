import { Products, Bills } from "../../models/index.js";

const LIMIT = 10;

// Pages
export const GET_PROFILE = async (req, res) => {
   try {
      const { companyId, productId } = req.params;

      const company = await Products.findOne({ _id: companyId, products: { $elemMatch: { _id: productId } } });
      if (!company) return res.status(400).json({ error: "حدث خطأ ، لم يتم العثور علي الشركة" });

      const product = company.products.find((product) => String(product._id) === productId);
      if (!product) return res.status(400).json({ error: "حدث خطأ ، لم يتم العثور علي المنتج" });

      const shopCount = product.count.shop;
      const storeCount = product.count.store;

      const { count, ...docs } = product._doc;
      res.status(200).json({ img: company.img, count: { shop: shopCount, store: storeCount }, ...docs });
   } catch (error) {
      res.status(404).json(`GET_PROFILE: ${error.message}`);
   }
};

export const GET_TABLES_LIST = async (req, res) => {
   try {
      const { category, price, count, activePage } = req.query;

      let Count = count === "shop" ? "$products.count.shop" : count === "store" ? "$products.count.store" : "";
      let Price = price === "buy" ? "$products.price.buy" : price === "sale" ? "$products.price.sale" : "";

      // If category = '' then match all the products, else match the category name
      const list = await Products.aggregate([
         {
            $match: {
               category: category === "" ? { $exists: true } : category,
               company: { $exists: true },
               "products.name": { $exists: true },
            },
         },
         {
            $unwind: { path: "$products", preserveNullAndEmptyArrays: true },
         },
         {
            $sort: { company: 1, "products.name": 1 },
         },
         {
            $skip: (+activePage ?? 0) * LIMIT,
         },
         {
            $limit: LIMIT,
         },
         {
            $group: {
               _id: { company: "$company", name: "$products.name" },
               count: { $first: Count },
               price: { $first: Price },
               min: { $first: "$products.minmax.min" },
               max: { $first: "$products.minmax.max" },
            },
         },
         {
            $project: {
               _id: 0,
               company: "$_id.company",
               name: "$_id.name",
               count: 1,
               min: 1,
               max: 1,
               price: 1,
               total: { $sum: { $multiply: ["$price", "$count"] } },
            },
         },
         {
            $group: {
               _id: "$company",
               products: {
                  $push: {
                     name: "$name",
                     price: "$price",
                     count: "$count",
                     total: "$total",
                     min: "$min",
                     max: "$max",
                  },
               },
            },
         },
         {
            $project: {
               _id: 0,
               company: "$_id",
               products: 1,
            },
         },
      ]);

      const total = await Products.find().findTotalPrices(price, count);
      const pagination = await Products.find().findPagination();

      res.status(200).json({ data: list, total, pagination: Math.ceil(pagination / LIMIT) });
   } catch (error) {
      res.status(404).json(`GET_TABLES_LISTS: ${error.message}`);
   }
};

// Selectboxes
export const GET_SEARCH_LIST = async (req, res) => {
   try {
      const list = await Products.aggregate([
         {
            $unwind: {
               path: "$products", // Deconstruct products array
               preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
            },
         },
         {
            $match: {
               category: { $exists: true },
               company: { $exists: true },
               "products.name": { $exists: true },
            },
         },
         {
            $group: {
               _id: { companyId: "$_id", productId: "$products._id" },
               name: {
                  $addToSet: "$products.name",
               },
               company: {
                  $addToSet: "$company",
               },
               barcode: {
                  $addToSet: "$products.barcode",
               },
            },
         },
         {
            $project: {
               _id: 0,
               companyId: "$_id.companyId",
               productId: "$_id.productId",
               name: { $arrayElemAt: ["$name", 0] },
               company: { $arrayElemAt: ["$company", 0] },
               barcode: { $arrayElemAt: ["$barcode", 0] },
            },
         },
         {
            $sort: {
               name: 1,
            },
         },
      ]);
      res.status(200).json(list);
   } catch (error) {
      res.status(404).json(`GET_SEARCH_LIST: ${error.message}`);
   }
};

export const GET_PRODUCTS_LIST = async (req, res) => {
   const isEmpty = req.query.isEmpty === "true";

   try {
      let lists = await Products.aggregate([
         {
            $unwind: {
               path: "$products", // Deconstruct products array
               preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
            },
         },
         {
            $match: isEmpty
               ? {}
               : {
                    category: { $exists: true },
                    company: { $exists: true },
                    "products.name": { $exists: true },
                 },
         },
         {
            $group: {
               _id: {
                  category: "$category",
                  company: "$company",
               },
               companies: {
                  $push: {
                     company: "$company",
                     products: {
                        name: "$products.name",
                        salePrice: "$products.price.sale",
                        buyPrice: "$products.price.buy",
                     },
                  },
               },
            },
         },
         {
            $group: {
               _id: "$_id.category",
               companies: {
                  $push: {
                     company: "$_id.company",
                     products: "$companies.products",
                  },
               },
            },
         },
         {
            $project: {
               _id: 0,
               category: "$_id",
               companies: 1,
            },
         },
         {
            $sort: {
               category: 1,
               "companies.company": 1,
               "companies.products.name": 1,
            },
         },
      ]);

      res.status(200).json(lists);
   } catch (error) {
      res.status(404).json(`GET_LISTS: ${error.message}`);
   }
};

export const GET_SUPPLIERS_LIST = async (req, res) => {
   try {
      const lists = await Products.aggregate([
         {
            $unwind: {
               path: "$products", // Deconstruct products array
               preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
            },
         },
         {
            $unwind: {
               path: "$products.suppliers", // Deconstruct products array
               preserveNullAndEmptyArrays: true, // Output document even if array is null or empty
            },
         },
         {
            $group: {
               _id: "$products.suppliers",
               products: {
                  $push: {
                     name: "$products.name",
                     buyPrice: "$products.price.buy",
                  },
               },
            },
         },
         {
            $project: {
               _id: 0,
               supplier: "$_id",
               products: 1,
            },
         },
         {
            $sort: {
               supplier: 1,
               "products.name": 1,
            },
         },
      ]);
      res.status(200).json(lists);
   } catch (error) {
      res.status(404).json(`GET_SUPPLIERS_LISTS: ${error.message}`);
   }
};

// Analysis
export const GET_NEEDED_PRODUCTS = async (req, res) => {
   try {
      const { supplier, store } = req.query;
      const placeCount = store === "true" ? "$products.count.store" : "$products.count.shop";

      const list = await Products.aggregate([
         {
            $unwind: "$products",
         },
         {
            $match: { "products.suppliers": supplier },
         },
         {
            $project: {
               _id: 0,
               name: "$products.name",
               price: "$products.price.buy",
               count: {
                  $cond: [
                     { $lt: [placeCount, "$products.minmax.max"] },
                     {
                        current: placeCount,
                        needed: { $subtract: ["$products.minmax.max", placeCount] },
                     },
                     null,
                  ],
               },
            },
         },
         {
            $match: {
               count: { $ne: null },
            },
         },
      ]);

      res.status(200).json(list);
   } catch (error) {
      res.status(404).json(`GET_NEEDED_PRODUCTS: ${error.message}`);
   }
};

export const GET_LEAST_SALES = async (req, res) => {
   try {
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth());

      const list = await Products.aggregate([
         {
            $unwind: "$products",
         },
         {
            $match: { "products.count.updatedAt": { $lte: thisMonth } },
         },
         {
            $project: {
               _id: 0,
               name: "$products.name",
               date: "$products.count.updatedAt",
            },
         },
      ]);
      res.status(200).json(list);
   } catch (error) {
      res.status(404).json(`GET_LEAST_SALES: ${error.message}`);
   }
};

export const GET_PRODUCTS_BY_DATE = async (req, res) => {
   try {
      const { date, calender } = req.query;
      const now = new Date(date);

      let startDate;
      let endDate;
      if (calender === "year") {
         startDate = new Date(`${now.getFullYear()}-01-01`);
         endDate = new Date(`${now.getFullYear() + 1}-01-01`);
      } else {
         startDate = new Date(now.getFullYear(), now.getMonth());
         endDate = new Date(now.getFullYear(), now.getMonth() + 1);
      }

      const list = await Bills.aggregate([
         {
            $unwind: "$products",
         },
         {
            $match: { type: "bill", date: { $gt: startDate, $lt: endDate } },
         },
         {
            $group: {
               _id: "$products.name",
               name: { $first: "$products.name" },
               salesCount: { $sum: "$products.count" },
            },
         },
         {
            $project: {
               _id: 0,
               name: "$_id",
               salesCount: 1,
            },
         },
         {
            $sort: {
               salesCount: -1,
            },
         },
      ]);

      res.status(200).json(list);
   } catch (error) {
      res.status(404).json(`GET_PRODUCTS_BY_DATE: ${error.message}`);
   }
};
