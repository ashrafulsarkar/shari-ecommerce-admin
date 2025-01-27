import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Categories,
  Coupons,
  Customers,
  Orders,
  Products,
  Profile,
  Reviews,
  Setting,
  Leaf,
  StuffUser,
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
      { title: "Add Product", link: "/add-product" }
    ],
  },
  {
    id: 3,
    icon: Categories,
    link: "/category",
    title: "Category",
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Orders",
  },
  {
    id: 5,
    icon: Leaf,
    link: "/brands",
    title: "Brand",
  },
  {
    id: 6,
    icon: Reviews,
    link: "/reviews",
    title: "Reviews",
  },
  {
    id: 7,
    icon: Coupons,
    link: "/coupon",
    title: "Coupons",
  },
  {
    id: 8,
    icon: Customers,
    link: "/customers",
    title: "Customers",
  },
  {
    id: 9,
    icon: Profile,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 10,
    icon: Setting,
    link: "#",
    title: "Online store",
  },
  {
    id: 11,
    icon: StuffUser,
    link: "/our-staff",
    title: "Our Staff",
  },
];

export default sidebar_menu;
