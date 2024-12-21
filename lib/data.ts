import { AiOutlineUser, AiOutlineBook } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { MdOutlineComment,  MdSpaceDashboard } from "react-icons/md";
import { FaHome, FaInfoCircle, FaBlog, FaEnvelope } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";

export const navigationLinks = [
  {
    name: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    name: "About",
    href: "/about",
    icon: FaInfoCircle,
  },
  {
    name: "Blogs",
    href: "/blogs",
    icon: FaBlog,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: FaEnvelope,
  },
  {
    name: "Login",
    href: "/login",
    icon: LuLogIn,
  },
];



export const dashboardNav = [
  { label: "Dashboard", path: "/dashboard", icon: MdSpaceDashboard  },
  { label: "Blogs", path: "/dashboard/blogs", icon: AiOutlineBook },
  { label: "Users", path: "/dashboard/users", icon: AiOutlineUser },
  { label: "Comments", path: "/dashboard/comments", icon: MdOutlineComment },
  { label: "Feedbacks", path: "/dashboard/feedbacks", icon: VscFeedback },
];
