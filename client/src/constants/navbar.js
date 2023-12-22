import { Outlet } from "react";

// Directs
import { Home, Profile } from "@/views";

// Auths
import { Login, Register } from "@/views/auths";

// Show
import { Show_Shop_Store, ShowClients } from "@/views/show";
import { ShowLockerProcesses, ShowBills, ShowDebts } from "@/views/show";

// Creates
import { AddCategory, AddCompany, AddProducts, AddSupplier, AddClient } from "@/views/creates";

// Statements
import { BuyStatement, SaleStatement, TransferStatement, WorkersStatement } from "@/views/statements";

// Balances
import { ShowBalances, AddToLocker, TodayBuysSales } from "@/views/balances";

// Analysis
import { AnalysisProductMovement, AnalysisForMonth, AnalysisForYear } from "@/views/analysis";
import { AnalysisSales, AnalysisWins, AnalysisInsufficients, AnalysisLessBuys } from "@/views/analysis";

// Bills
import { ShowBill, UpdateBill } from "@/views/bills";

/* Guide:
   - If [title] Is Defined      -> Create In Navbar Tabs
   - If [paths.name] Is Defined -> Create In Navbar Tab Menu
   - If [role] Is Defined       -> Just Allow Admin Users
*/

export const links = [
   // Public Not In Navbar
   {
      path: "",
      paths: [
         {
            link: "",
            role: "user",
            Component: Home,
         },
         {
            link: "profile/:companyId/:productId",
            role: "user",
            Component: Profile,
         },
      ],
   },

   // Auths Not In Navbar
   {
      path: "auths",
      paths: [
         {
            link: "login",
            role: "user",
            Component: Login,
         },
         {
            link: "register",
            role: "admin",
            Component: Register,
         },
      ],
   },

   // Bills Not In Navbar
   {
      path: "bills",
      paths: [
         {
            link: "update-bill/:billId",
            role: "admin",
            // disabled: true,
            Component: UpdateBill,
         },
         {
            link: "update-bill/:debtId",
            role: "admin",
            // disabled: true,
            Component: UpdateBill,
         },
         {
            link: "show-bill/:id",
            role: "admin",
            // disabled: true,
            Component: ShowBill,
         },
      ],
   },

   // Show
   {
      title: "العرض",
      path: "show",
      paths: [
         {
            name: "عرض المحل",
            link: "shop",
            role: "user",
            icon: "fas fa-store-alt",
            Component: Show_Shop_Store,
         },
         {
            name: "عرض المخزن",
            link: "store",
            role: "user",
            icon: "fas fa-warehouse",
            Component: Show_Shop_Store,
         },
         {
            name: "عرض معاملات الخزنة",
            link: "locker-processes",
            role: "admin",
            icon: "fas fa-door-closed",
            // disabled: true,
            Component: ShowLockerProcesses,
         },
         {
            name: "عرض العملاء والمندوبين",
            link: "clients",
            role: "admin",
            icon: "fas fa-users-viewfinder",
            // disabled: true,
            Component: ShowClients,
         },
         {
            name: "عرض الفواتير",
            link: "bills",
            role: "admin",
            icon: "fas fa-money-bill-wave",
            // disabled: true,
            Component: ShowBills,
         },
         {
            name: "عرض المديونيات",
            link: "debts",
            role: "admin",
            icon: "fas fa-money-bill-wave",
            // disabled: true,
            Component: ShowDebts,
         },
      ],
   },

   // Statements
   {
      title: "الكشوفات",
      path: "statements",
      paths: [
         {
            name: "كشف حساب",
            link: "sale",
            role: "admin",
            icon: "fas fa-money-bill-wave",
            Component: SaleStatement,
         },
         {
            name: "كشف مندوب",
            link: "buy",
            role: "admin",
            icon: "fas fa-money-bill-trend-up",
            Component: BuyStatement,
         },
         {
            name: "كشف تحويل",
            link: "transfer",
            role: "admin",
            icon: "fas fa-money-bill-transfer",
            Component: TransferStatement,
         },
         {
            name: "كشف العمال",
            link: "workers",
            role: "admin",
            icon: "fas fa-users",
            disabled: true,
            Component: WorkersStatement,
         },
      ],
   },

   // Creates
   {
      title: "جديد",
      path: "creates",
      paths: [
         {
            name: "اضافه قسم",
            link: "category",
            role: "admin",
            icon: "fas fa-sitemap",
            Component: AddCategory,
         },
         {
            name: "اضافه شركة",
            link: "company",
            role: "admin",
            icon: "fas fa-building-columns",
            Component: AddCompany,
         },
         {
            name: "اضافه منتج",
            link: "products",
            role: "admin",
            icon: "fas fa-bicycle",
            Component: AddProducts,
         },
         {
            name: "اضافه مندوب",
            link: "supplier",
            role: "admin",
            icon: "fas fa-user-tie",
            Component: AddSupplier,
         },
         {
            name: "اضافة عميل",
            link: "client",
            role: "admin",
            icon: "fas fa-user-tie",
            // disabled: true,
            Component: AddClient,
         },
      ],
   },

   // Balances
   {
      title: "الماليات",
      path: "balances",
      paths: [
         {
            name: "الارصدة",
            link: "",
            role: "admin",
            icon: "fas fa-scale-unbalanced",
            Component: ShowBalances,
         },
         {
            name: "الخزنة",
            link: "add-to-locker",
            role: "admin",
            icon: "fas fa-door-closed",
            Component: AddToLocker,
         },
         {
            name: "مبيعات / مشتريات اليوم",
            link: "today-buys-sales",
            role: "admin",
            icon: "fas fa-hand-holding-usd",
            // disabled: true,
            Component: TodayBuysSales,
         },
      ],
   },

   // Analysis
   {
      title: "الاحصائيات",
      path: "analysis",
      paths: [
         {
            name: "بيان حركة بيع المنتج",
            link: "movement",
            role: "admin",
            icon: "fas fa-chart-column",
            // disabled: true,
            Component: AnalysisProductMovement,
         },
         {
            name: "احصائيات المبيعات",
            link: "sales",
            role: "admin",
            icon: "fas fa-chart-column",
            // disabled: true,
            Component: AnalysisSales,
         },
         {
            name: "احصائيات الارباح",
            link: "wins",
            role: "admin",
            icon: "fas fa-chart-line",
            // disabled: true,
            Component: AnalysisWins,
         },
         {
            name: "حصر نواقص المحل / المخزن",
            link: "insufficients",
            role: "admin",
            icon: "fas fa-magnifying-glass-minus",
            // disabled: true,
            Component: AnalysisInsufficients,
         },
         {
            name: "المنتجات الاقل مبيعاً",
            link: "less-buys",
            role: "admin",
            icon: "fas fa-chart-gantt",
            // disabled: true,
            Component: AnalysisLessBuys,
         },
         {
            name: "المنتجات الاكثر مبيعاً (في الشهر)",
            link: "month",
            role: "admin",
            icon: "far fa-calendar-days",
            // disabled: true,
            Component: AnalysisForMonth,
         },
         {
            name: "المنتجات الاكثر مبيعاً (في السنه)",
            link: "year",
            role: "admin",
            icon: "far fa-calendar-check",
            // disabled: true,
            Component: AnalysisForYear,
         },
      ],
   },
];

// Check If The User Role Is Allowed
export const dynamicRoute = (path) => {
   const routes = ["/profile", "/bills/update-bill", "/bills/show-bill"];
   const word = routes.find((word) => path.startsWith(word));
   return word || path;
};

export const getPathsOf = (role) => {
   const allowed = links.map(({ path, paths }) => ({ path, paths: paths.filter((item) => item.role === role) }));
   return allowed.reduce((prev, cur) => {
      const paths = cur.paths.map((path) => `${cur.path ? `/${cur.path}` : ""}/${dynamicRoute(path.link)}`);
      return prev.concat(paths);
   }, []);
};
