import './Icon.css';

import chatDark from '../../../assets/icons/Dark/Chat.svg';
import chatLight from '../../../assets/icons/Light/Chat.svg';

import editDark from '../../../assets/icons/Dark/Edit.svg';
import editLight from '../../../assets/icons/Light/Edit.svg';

import heartDark from '../../../assets/icons/Dark/Heart.svg';
import heartLight from '../../../assets/icons/Light/Heart.svg';

import homeDark from '../../../assets/icons/Dark/Home.svg';
import homeLight from '../../../assets/icons/Light/Home.svg';

import imageDark from '../../../assets/icons/Dark/Image.svg';
import imageLight from '../../../assets/icons/Light/Image.svg';

import lightDark from '../../../assets/icons/Dark/Light.svg';
import lightLight from '../../../assets/icons/Light/Light.svg';

import linkDark from '../../../assets/icons/Dark/Link.svg';
import linkLight from '../../../assets/icons/Light/Link.svg';

import locationDark from '../../../assets/icons/Dark/Location.svg';
import locationLight from '../../../assets/icons/Light/Location.svg';

import moonDark from '../../../assets/icons/Dark/Moon.svg';
import moonLight from '../../../assets/icons/Light/Moon.svg';

import notifDark from '../../../assets/icons/Dark/notif.svg';
import notifLight from '../../../assets/icons/Light/notif.svg';

import personDark from '../../../assets/icons/Dark/Person.svg';
import personLight from '../../../assets/icons/Light/Person.svg';

import sendDark from '../../../assets/icons/Dark/Send.svg';
import sendLight from '../../../assets/icons/Light/Send.svg';

import tashDark from '../../../assets/icons/Dark/Tash.svg';
import tashLight from '../../../assets/icons/Light/Tash.svg';

const icons = {
  Chat: {
    dark: chatDark,
    light: chatLight,
  },

  Edit: {
    dark: editDark,
    light: editLight,
  },

  Heart: {
    dark: heartDark,
    light: heartLight,
  },

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
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  alt?: string;
}

const Icon = ({
  name,
  size = 24,
  className = '',
  alt = '',
}: IconProps) => {
  const icon = icons[name];

  return (
    <span
      className={`icon ${className}`}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden={alt ? undefined : true}
    >
      <img
        className="icon__dark"
        src={icon.dark}
        alt={alt}
      />

      <img
        className="icon__light"
        src={icon.light}
        alt={alt}
      />
    </span>
  );
};

export default Icon;