import { AiOutlineUser, AiOutlineBook } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { MdOutlineComment,  MdSpaceDashboard } from "react-icons/md";


export const dashboardNav = [
  { label: "Dashboard", path: "/dashboard", icon: MdSpaceDashboard  },
  { label: "Blogs", path: "/dashboard/blogs", icon: AiOutlineBook },
  { label: "Users", path: "/dashboard/users", icon: AiOutlineUser },
  { label: "Comments", path: "/dashboard/comments", icon: MdOutlineComment },
  { label: "Feedbacks", path: "/dashboard/feedbacks", icon: VscFeedback },
];
