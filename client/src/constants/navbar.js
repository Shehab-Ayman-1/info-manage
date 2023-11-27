// Products
import { Shop, Store } from "@/views";

// Statements
import { Buy, Sale } from "@/views";

// Creates
import { Category, Company, Products } from "@/views";

export const links = [
   {
      title: "المنتجات",
      path: "products",
      paths: [
         {
            name: "عرض بضائع المحل",
            link: "shop",
            icon: "fas fa-store",
            Component: Shop,
         },
         {
            name: "عرض بضائع المخزن",
            link: "store",
            icon: "fas fa-store",
            Component: Store,
         },
      ],
   },
   {
      title: "الكشوفات",
      path: "statements",
      paths: [
         {
            name: "كشف حساب شراء",
            link: "buy",
            icon: "fas fa-shopping-cart",
            Component: Buy,
         },
         {
            name: "كشف حساب بيع",
            link: "sale",
            icon: "fas fa-shopping-cart",
            Component: Sale,
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
      ],
   },
];
