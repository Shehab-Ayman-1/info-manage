// Directs
import { Home, Balances } from "@/views";

// Products
import { Shop_Store } from "@/views";

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
            Component: Balances,
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
            Component: Shop_Store,
         },
         {
            name: "عرض بضائع المخزن",
            link: "store",
            icon: "fas fa-store",
            Component: Shop_Store,
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
            icon: "fas fa-shopping-cart",
            Component: Sale,
         },
         {
            name: "كشف مندوب",
            link: "buy",
            icon: "fas fa-shopping-cart",
            Component: Buy,
         },
         {
            link: "transfer",
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
            icon: "fas fa-store-alt",
            Component: Category,
         },
         {
            name: "شركة جديدة",
            link: "company",
            icon: "fas fa-store-alt",
            Component: Company,
         },
         {
            name: "منتج جديد",
            link: "products",
            icon: "fas fa-store-alt",
            Component: Products,
         },
         {
            name: "مندوب جديد",
            link: "supplier",
            icon: "fas fa-user",
            Component: Supplier,
         },
      ],
   },
];
