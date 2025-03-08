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
  },
  {
    id: 2,
    icon: Products,
    link: "/products",
    title: "Products",
    subMenus: [
      { title: "All Products", link: "/products" },
      { title: "Add Product", link: "/add-product" },
      { title: "Brands", link: "/brands" },
      { title: "Types", link: "/types" },
      { title: "Categories", link: "/category" },
      { title: "Coupons", link: "/coupon" },
    ],
  },
  {
    id: 3,
    icon: Pages,
    link: "/blogs",
    title: "Blogs",
    subMenus: [
      { title: "All Blogs", link: "/blogs" },
      { title: "Add Blog", link: "/add-blog" },
      { title: "Categories", link: "/blog-category" },
    ],
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Orders",
  },
  {
    id: 5,
    icon: Reviews,
    link: "/reviews",
    title: "Reviews",
  },
  {
    id: 6,
    icon: Customers,
    link: "/customer",
    title: "Customers",
    subMenus: [
      { title: "All customer", link: "/customer/list" },
      { title: "Add Customer", link: "/customer/add" },
    ],
  },
  {
    id: 7,
    icon: Customers,
    link: "/album",
    title: "Albums",
    subMenus: [
      { title: "All album", link: "/album/list" },
      { title: "Add album", link: "/album/add" },
    ],
  },
  {
    id: 8,
    icon: Leaf,
    link: "/reports",
    title: "Reports",
  },
  {
    id: 9,
    icon: Setting,
    link: "/settings",
    title: "Settings",
    subMenus: [
      { title: "All Settings", link: "/settings" },
      { title: "Nav Menu", link: "/menu" },
      { title: "Our Staff", link: "/our-staff" },
      { title: "Profile", link: "/profile" },
    ],
  },
];

export default sidebar_menu;
