// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from "../../../components/Label";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = name => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon("ic_blog"),
  cart: getIcon("ic_cart"),
  chat: getIcon("ic_chat"),
  mail: getIcon("ic_mail"),
  user: getIcon("ic_user"),
  kanban: getIcon("ic_kanban"),
  banking: getIcon("ic_banking"),
  calendar: getIcon("ic_calendar"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
  booking: getIcon("ic_booking")
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      { title: "Home", path: "/", icon: ICONS.dashboard },
      { title: "Ask Question", path: "/ask-question", icon: ICONS.ecommerce },
      { title: "Questions", path: "/questions", icon: ICONS.analytics },
      { title: "Profile", path: "/myprofile", icon: ICONS.banking },
      { title: "Categories", path: "/category", icon: ICONS.booking }
    ]
  }

  // MANAGEMENT
  // ----------------------------------------------------------------------
];

export default navConfig;
