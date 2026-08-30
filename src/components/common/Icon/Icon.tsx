import "./Icon.css";

import menuDark from "../../../assets/icons/Dark/Menu.svg";
import menuLight from "../../../assets/icons/Light/Menu.svg";

import logoutDark from "../../../assets/icons/Dark/logout.svg";
import logoutLight from "../../../assets/icons/Light/logout.svg";

import calendarDark from "../../../assets/icons/Dark/Calendar.svg";
import calendarLight from "../../../assets/icons/Light/Calendar.svg";

import postDark from "../../../assets/icons/Dark/Post.svg";
import postLight from "../../../assets/icons/Light/Post.svg";

import chatDark from "../../../assets/icons/Dark/Chat.svg";
import chatLight from "../../../assets/icons/Light/Chat.svg";

import editDark from "../../../assets/icons/Dark/Edit.svg";
import editLight from "../../../assets/icons/Light/Edit.svg";

import heartDark from "../../../assets/icons/Dark/Heart.svg";
import heartLight from "../../../assets/icons/Light/Heart.svg";

import homeDark from "../../../assets/icons/Dark/Home.svg";
import homeLight from "../../../assets/icons/Light/Home.svg";

import imageDark from "../../../assets/icons/Dark/Image.svg";
import imageLight from "../../../assets/icons/Light/Image.svg";

import lightDark from "../../../assets/icons/Dark/Light.svg";
import lightLight from "../../../assets/icons/Light/Light.svg";

import linkDark from "../../../assets/icons/Dark/Link.svg";
import linkLight from "../../../assets/icons/Light/Link.svg";

import locationDark from "../../../assets/icons/Dark/Location.svg";
import locationLight from "../../../assets/icons/Light/Location.svg";

import moonDark from "../../../assets/icons/Dark/Moon.svg";
import moonLight from "../../../assets/icons/Light/Moon.svg";

import notifDark from "../../../assets/icons/Dark/notif.svg";
import notifLight from "../../../assets/icons/Light/notif.svg";

import personDark from "../../../assets/icons/Dark/Person.svg";
import personLight from "../../../assets/icons/Light/Person.svg";

import sendDark from "../../../assets/icons/Dark/Send.svg";
import sendLight from "../../../assets/icons/Light/Send.svg";

import tashDark from "../../../assets/icons/Dark/Tash.svg";
import tashLight from "../../../assets/icons/Light/Tash.svg";

import heartFillDark from "../../../assets/icons/Dark/heart-fill.svg";
import heartFillLight from "../../../assets/icons/Light/heart-fill.svg";

import replyDark from "../../../assets/icons/Dark/arrow-Reply.svg";
import replyLight from "../../../assets/icons/Light/arrow-Reply.svg";

import cameraDark from "../../../assets/icons/Dark/camera.svg";
import cameraLight from "../../../assets/icons/Light/camera.svg";

import closeDark from "../../../assets/icons/Dark/Close.svg";
import closeLight from "../../../assets/icons/Light/Close.svg";

import searchDark from "../../../assets/icons/Dark/search.svg";
import searchLight from "../../../assets/icons/Light/search.svg";

import chatFillDark from "../../../assets/icons/Dark/fill-chat.svg";
import chatFillLight from "../../../assets/icons/Light/fill-chat.svg";

import editComment from "../../../assets/icons/Dark/edit-2.svg";

const icons = {
  Chat: {
    dark: chatDark,
    light: chatLight,
  },

  Edit: {
    dark: editDark,
    light: editLight,
  },

  EditComment: {
    dark: editComment,
    light: editComment,
  },

  Search: {
    dark: searchDark,
    light: searchLight,
  },
  Reply: {
    dark: replyDark,
    light: replyLight,
  },
  ChatFill: {
    dark: chatFillDark,
    light: chatFillLight,
  },

  Close: {
    dark: closeDark,
    light: closeLight,
  },

  Camera: {
    dark: cameraDark,
    light: cameraLight,
  },

  Heart: { dark: heartDark, light: heartLight },
  HeartFill: { dark: heartFillDark, light: heartFillLight },

  Home: {
    dark: homeDark,
    light: homeLight,
  },

  Image: {
    dark: imageDark,
    light: imageLight,
  },

  Light: {
    dark: lightDark,
    light: lightLight,
  },

  Link: {
    dark: linkDark,
    light: linkLight,
  },

  Location: {
    dark: locationDark,
    light: locationLight,
  },

  Moon: {
    dark: moonDark,
    light: moonLight,
  },

  notif: {
    dark: notifDark,
    light: notifLight,
  },

  Person: {
    dark: personDark,
    light: personLight,
  },

  Send: {
    dark: sendDark,
    light: sendLight,
  },

  Tash: {
    dark: tashDark,
    light: tashLight,
  },

  Menu: {
    dark: menuDark,
    light: menuLight,
  },

  Logout: {
    dark: logoutDark,
    light: logoutLight,
  },

  Calendar: {
    dark: calendarDark,
    light: calendarLight,
  },

  Post: {
    dark: postDark,
    light: postLight,
  },
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  alt?: string;
  reverseTheme?: boolean;
}

const Icon = ({
  name,
  size = 24,
  className = "",
  alt = "",
  reverseTheme = false,
}: IconProps) => {
  const icon = icons[name];

  return (
    <span
      className={`icon ${className} ${
        reverseTheme ? "icon--reverse-theme" : ""
      }`}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden={alt ? undefined : true}
    >
      <img className="icon__dark" src={icon.dark} alt={alt} />

      <img className="icon__light" src={icon.light} alt={alt} />
    </span>
  );
};

export default Icon;
