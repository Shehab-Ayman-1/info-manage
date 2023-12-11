// Directs
import { Home, Profile } from "@/views";

// Auths
import { Login, Register } from "@/views/auths";

// Show
import { Show_Shop_Store, ShowInsufficients, ShowLessBuys, ShowClients, ShowBills, ShowDebts } from "@/views/show";

// Creates
import { AddCategory, AddCompany, AddProducts, AddSupplier, AddClient, AddBill, AddDebt } from "@/views/creates";

// Statements
import { BuyStatement, SaleStatement, TransferStatement, WorkersStatement } from "@/views/statements";

// Balances
import { ShowBalances, TodayBuysSales } from "@/views/balances";

// Analysis
import { AnalysisSales, AnalysisWins, AnalysisForMonth, AnalysisForYear } from "@/views/analysis";

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
            Component: Home,
         },
         {
            link: "profile/:companyId/:productId",
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
            Component: Login,
         },
         {
            link: "register",
            role: "admin",
            Component: Register,
         },
      ],
   },

   // Show Products
   {
      title: "العرض",
      path: "show",
      paths: [
         {
            name: "عرض المحل",
            link: "shop",
            icon: "fas fa-store-alt",
            Component: Show_Shop_Store,
         },
         {
            name: "عرض المخزن",
            link: "store",
            icon: "fas fa-warehouse",
            Component: Show_Shop_Store,
         },
         {
            name: "عرض النواقص",
            link: "insufficients",
            icon: "fas fa-magnifying-glass-minus",
            Component: ShowInsufficients,
         },
         {
            name: "عرض الاقل مبيعاً",
            link: "less-buys",
            icon: "fas fa-chart-gantt",
            Component: ShowLessBuys,
         },
         {
            name: "عرض العملاء",
            link: "clients",
            icon: "fas fa-users-viewfinder",
            Component: ShowClients,
         },
         {
            name: "عرض الفواتير",
            link: "bills",
            role: "admin",
            icon: "fas fa-money-bill",
            Component: ShowBills,
         },
         {
            name: "عرض المديونيات",
            link: "debts",
            role: "admin",
            icon: "fas fa-money-bill",
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
            Component: WorkersStatement,
         },
      ],
   },

   // Creates
   {
      title: "انشاء",
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
            Component: AddClient,
         },
         {
            name: "اضافه فاتورة",
            link: "bill",
            role: "admin",
            icon: "fas fa-money-bills",
            Component: AddBill,
         },
         {
            name: "اضافه مديونية",
            link: "debt",
            role: "admin",
            icon: "fas fa-money-bills",
            Component: AddDebt,
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
            name: "مبيعات / مشتريات اليوم",
            link: "today-buys-sales",
            role: "admin",
            icon: "fas fa-hand-holding-usd",
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
            name: "احصائيات المبيعات",
            link: "sales",
            role: "admin",
            icon: "fas fa-chart-column",
            Component: AnalysisSales,
         },
         {
            name: "احصائيات الارباح",
            link: "wins",
            role: "admin",
            icon: "fas fa-chart-line",
            Component: AnalysisWins,
         },
         {
            name: "جرد شهر معين",
            link: "month",
            role: "admin",
            icon: "far fa-calendar-days",
            Component: AnalysisForMonth,
         },
         {
            name: "جرد سنه معينه",
            link: "year",
            role: "admin",
            icon: "far fa-calendar-check",
            Component: AnalysisForYear,
         },
      ],
   },
];
