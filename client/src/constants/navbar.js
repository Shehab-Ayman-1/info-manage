// Products, Statements
import { Shop_Store, Buy_Sale } from "@/views";

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
            Component: Buy_Sale,
         },
         {
            name: "كشف مندوب",
            link: "buy",
            icon: "fas fa-shopping-cart",
            Component: Buy_Sale,
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
