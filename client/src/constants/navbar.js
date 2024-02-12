import i18next from "./i18next";

// Directs
import { Home, Profile } from "@/views";

// Auths
import { Login, Register } from "@/views/auths";

// Show
import { ShowClients, ShowBalances, ShowStore, ShowShop } from "@/views/show";
import { ShowLockerProcesses, ShowBills, ShowDebts } from "@/views/show";

// Creates
import { AddCategory, AddCompany, AddProducts, AddSupplier, AddClient } from "@/views/creates";

// Statements
import { BuyStatement, SaleStatement, TransferStatement, AddToLocker, WorkersStatement } from "@/views/statements";

// Analysis
import { AnalysisProductMovement, AnalysisForMonth, AnalysisForYear, TodayBuysSales } from "@/views/analysis";
import { AnalysisSales, AnalysisWins, AnalysisInsufficients, AnalysisLessBuys } from "@/views/analysis";

// Bills
import { ShowBill, UpdateBill } from "@/views/bills";

/* Guide:
   - If [title] Is Defined      -> Create In Navbar Tabs
   - If [paths.name] Is Defined -> Create In Navbar Tab Menu
   - If [role] Is Defined       -> Just Allow Admin Users
*/

i18next.changeLanguage(localStorage.getItem("language"));
const text = i18next.t;

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
      title: text("show-title"),
      path: "show",
      paths: [
         {
            name: text("show-shop"),
            link: "shop",
            role: "user",
            icon: "fas fa-store-alt",
            Component: ShowShop,
         },
         {
            name: text("show-store"),
            link: "store",
            role: "user",
            icon: "fas fa-warehouse",
            Component: ShowStore,
         },
         {
            name: text("show-transections"),
            link: "transections",
            role: "admin",
            icon: "fas fa-door-closed",
            // disabled: true,
            Component: ShowLockerProcesses,
         },
         {
            name: text("client-suppliers"),
            link: "clients",
            role: "admin",
            icon: "fas fa-users-viewfinder",
            // disabled: true,
            Component: ShowClients,
         },
         {
            name: text("show-balances"),
            link: "balances",
            role: "admin",
            icon: "fas fa-scale-unbalanced",
            // disabled: true,
            Component: ShowBalances,
         },
         {
            name: text("show-bills"),
            link: "bills",
            role: "admin",
            icon: "fas fa-money-bill-wave",
            // disabled: true,
            Component: ShowBills,
         },
         {
            name: text("show-debts"),
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
      title: text("statements-title"),
      path: "statements",
      paths: [
         {
            name: text("bill-statement"),
            link: "sale",
            role: "admin",
            icon: "fas fa-money-bill-wave",
            Component: SaleStatement,
         },
         {
            name: text("supplier-statement"),
            link: "buy",
            role: "admin",
            icon: "fas fa-money-bill-trend-up",
            Component: BuyStatement,
         },
         {
            name: text("transfer-statement"),
            link: "transfer",
            role: "admin",
            icon: "fas fa-money-bill-transfer",
            Component: TransferStatement,
         },
         {
            name: text("locker-transactions"),
            link: "add-to-locker",
            role: "admin",
            icon: "fas fa-door-closed",
            Component: AddToLocker,
         },
         {
            name: text("workers-statement"),
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
      title: text("new-title"),
      path: "creates",
      paths: [
         {
            name: text("add-category"),
            link: "category",
            role: "admin",
            icon: "fas fa-sitemap",
            Component: AddCategory,
         },
         {
            name: text("add-company"),
            link: "company",
            role: "admin",
            icon: "fas fa-building-columns",
            Component: AddCompany,
         },
         {
            name: text("add-product"),
            link: "products",
            role: "admin",
            icon: "fas fa-bicycle",
            Component: AddProducts,
         },
         {
            name: text("add-supplier"),
            link: "supplier",
            role: "admin",
            icon: "fas fa-user-tie",
            Component: AddSupplier,
         },
         {
            name: text("add-client"),
            link: "client",
            role: "admin",
            icon: "fas fa-user-tie",
            // disabled: true,
            Component: AddClient,
         },
      ],
   },

   // Analysis
   {
      title: text("analysis-title"),
      path: "analysis",
      paths: [
         {
            name: text("totay-reset"),
            link: "today-buys-sales",
            role: "admin",
            icon: "fas fa-hand-holding-usd",
            // disabled: true,
            Component: TodayBuysSales,
         },
         {
            name: text("product-movement"),
            link: "movement",
            role: "admin",
            icon: "fas fa-chart-column",
            // disabled: true,
            Component: AnalysisProductMovement,
         },
         {
            name: text("analysis-sales"),
            link: "sales",
            role: "admin",
            icon: "fas fa-chart-column",
            // disabled: true,
            Component: AnalysisSales,
         },
         {
            name: text("analysis-profits"),
            link: "wins",
            role: "admin",
            icon: "fas fa-chart-line",
            // disabled: true,
            Component: AnalysisWins,
         },
         {
            name: text("analysis-insufficients"),
            link: "insufficients",
            role: "admin",
            icon: "fas fa-magnifying-glass-minus",
            // disabled: true,
            Component: AnalysisInsufficients,
         },
         {
            name: text("analysis-less-sales"),
            link: "less-sales",
            role: "admin",
            icon: "fas fa-chart-gantt",
            // disabled: true,
            Component: AnalysisLessBuys,
         },
         {
            name: text("analysis-best-sales-month"),
            link: "month",
            role: "admin",
            icon: "far fa-calendar-days",
            // disabled: true,
            Component: AnalysisForMonth,
         },
         {
            name: text("analysis-best-sales-year"),
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
