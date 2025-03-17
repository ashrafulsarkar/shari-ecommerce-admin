import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Customers,
  Orders,
  Products,
  Reviews,
  Setting,
  Leaf,
  Pages,
} from "@/svg";

const sidebar_menu: Array<ISidebarMenus> = [
  {
    id: 1,
    icon: Dashboard,
    link: "/dashboard",
    title: "Dashboard",
    roles: ["Admin", "Manager"], // Both roles can access
  },
  {
    id: 2,
    icon: Products,
    link: "/products",
    title: "Products",
    roles: ["Admin", "Manager"],
    subMenus: [
      { title: "All Products", link: "/products", roles: ["Admin", "Manager"] },
      { title: "Add Product", link: "/add-product", roles: ["Admin", "Manager"] }, // Only Admin can add products
      { title: "Brands", link: "/brands", roles: ["Admin", "Manager"] },
      { title: "Types", link: "/types", roles: ["Admin", "Manager"] },
      { title: "Categories", link: "/category", roles: ["Admin", "Manager"] },
      { title: "Coupons", link: "/coupon", roles: ["Admin", "Manager"] },
    ],
  },
  {
    id: 3,
    icon: Pages,
    link: "/blogs",
    title: "Blogs",
    roles: ["Admin", "Manager"],
    subMenus: [
      { title: "All Blogs", link: "/blogs", roles: ["Admin", "Manager"] },
      { title: "Add Blog", link: "/add-blog", roles: ["Admin", "Manager"] },
      { title: "Categories", link: "/blog-category", roles: ["Admin", "Manager"] },
    ],
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Orders",
    roles: ["Admin", "Manager"],
  },
  {
    id: 5,
    icon: Reviews,
    link: "/reviews",
    title: "Reviews",
    roles: ["Admin", "Manager"],
  },
  {
    id: 6,
    icon: Customers,
    link: "/customer",
    title: "Customers",
    roles: ["Admin", "Manager"],
    subMenus: [
      { title: "All Customers", link: "/customer/list", roles: ["Admin", "Manager"] },
      { title: "Add Customer", link: "/customer/add", roles: ["Admin", "Manager"] },
    ],
  },
  {
    id: 7,
    icon: Customers,
    link: "/album",
    title: "Albums",
    roles: ["Admin"],
    subMenus: [
      { title: "All Albums", link: "/album/list", roles: ["Admin", "Manager"] },
      { title: "Add Album", link: "/album/add", roles: ["Admin", "Manager"] },
    ],
  },
  {
    id: 8,
    icon: Leaf,
    link: "/reports",
    title: "Reports",
    roles: ["Admin", "Manager"],
  },
  {
    id: 9,
    icon: Setting,
    link: "/settings",
    title: "Settings",
    roles: ["Admin", "Manager"],
    subMenus: [
      { title: "All Settings", link: "/settings", roles: ["Admin", "Manager"] },
      { title: "Nav Menu", link: "/menu", roles: ["Admin", "Manager"] },
      { title: "Our Staff", link: "/our-staff", roles: ["Admin"] },
      { title: "Profile", link: "/profile", roles: ["Admin", "Manager"] }, // Profile accessible to both
    ],
  },
];

export default sidebar_menu;
