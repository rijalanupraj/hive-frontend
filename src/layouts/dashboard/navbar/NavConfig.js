// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from "../../../components/Label";
import SvgIconStyle from "../../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = name => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  home:getIcon("ic_home"),
  feed:getIcon("ic_feed"),
  askquestion:getIcon("ic_question"),
  post:getIcon("ic_post"),
  profile: getIcon("ic_profile"),
  category:getIcon("ic_category"),
  chat:getIcon("ic_chat"),

};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      { title: "Home", path: "/", icon: ICONS.home },
      { title: "Feed", path: "/feed", icon: ICONS.feed },
      { title: "Ask Question", path: "/ask-question", icon: ICONS.askquestion },
      { title: "Questions", path: "/questions", icon: ICONS.post },
      { title: "Profile", path: "/myprofile", icon: ICONS.profile },
      { title: "Categories", path: "/category", icon: ICONS.category },
      // { title: "Chat", path: "/chat", icon: ICONS.chat },
    ]
  }

  // MANAGEMENT
  // ----------------------------------------------------------------------
];

export default navConfig;
