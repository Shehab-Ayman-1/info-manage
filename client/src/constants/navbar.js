// Directs
import { Home, Balances, Profile, Login, Register } from "@/views";

// Products
import { ShowProducts } from "@/views";

// Statements
import { Buy, Sale, Transfer } from "@/views";

// Creates
import { Category, Company, Products, Supplier } from "@/views";

export const links = [
   {
      path: "",
      paths: [
         {
            link: "",
            Component: Home,
         },
         {
            link: "balances",
            role: "admin",
            Component: Balances,
         },
         {
            link: "profile/:companyId/:productId",
            Component: Profile,
         },
      ],
   },
   {
      path: "auths",
      paths: [
         {
            link: "login",
            Component: Login,
         },
         {
            link: "register",
            role: "admin",
            Component: Register,
         },
      ],
   },
   {
      title: "المنتجات",
      path: "products",
      paths: [
         {
            name: "عرض بضائع المحل",
            link: "shop",
            icon: "fas fa-store",
            Component: ShowProducts,
         },
         {
            name: "عرض بضائع المخزن",
            link: "store",
            icon: "fas fa-store",
            Component: ShowProducts,
         },
      ],
   },
   {
      title: "الكشوفات",
      path: "statements",
      paths: [
         {
            name: "كشف حساب",
            link: "sale",
            role: "admin",
            icon: "fas fa-shopping-cart",
            Component: Sale,
         },
         {
            name: "كشف مندوب",
            link: "buy",
            role: "admin",
            icon: "fas fa-shopping-cart",
            Component: Buy,
         },
         {
            link: "transfer",
            role: "admin",
            Component: Transfer,
         },
      ],
   },
   {
      title: "انشاء",
      path: "creates",
      paths: [
         {
            name: "قسم جديد",
            link: "category",
            role: "admin",
            icon: "fas fa-store-alt",
            Component: Category,
         },
         {
            name: "شركة جديدة",
            link: "company",
            role: "admin",
            icon: "fas fa-store-alt",
            Component: Company,
         },
         {
            name: "منتج جديد",
            link: "products",
            role: "admin",
            icon: "fas fa-store-alt",
            Component: Products,
         },
         {
            name: "مندوب جديد",
            link: "supplier",
            role: "admin",
            icon: "fas fa-user-plus",
            Component: Supplier,
         },
      ],
   },
];
