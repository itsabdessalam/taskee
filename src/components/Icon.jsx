import PropTypes from "prop-types";
import classNames from "classnames";

const icons = [
  {
    name: "search",
    content: `<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>`
  },
  {
    name: "home",
    content: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>`
  },
  {
    name: "heart",
    content: `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>`
  },
  {
    name: "user",
    content: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>`
  },
  {
    name: "play",
    content: `<path width="100%" height="100%" fill="currentColor" stroke-width="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z">`
  },
  {
    name: "pause",
    content: `<rect x="6" y="4" width="4" height="16" stroke-width="1" fill="currentColor"></rect><rect x="14" y="4" width="4" height="16" stroke-width="1" fill="currentColor"></rect>`
  },
  {
    name: "calendar",
    content: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>`
  },
  {
    name: "notes",
    content: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>`
  },
  {
    name: "settings",
    content: `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`
  },
  {
    name: "plus",
    content: `<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>`
  },
  {
    name: "chevron-right",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>`
  },
  {
    name: "clock",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>`
  },
  {
    name: "project",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>`
  },
  {
    name: "blank",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`
  },
  {
    name: "checklist",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>`
  },
  {
    name: "trash",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>`
  },
  {
    name: "alert",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>`
  },
  {
    name: "plus",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>`
  },
  {
    name: "dots",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>`
  },
  {
    name: "expand",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>`
  },
  {
    name: "close",
    content: `<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>`,
    viewBox: "0 0 20 20",
    stroke: "none",
    fill: "currentColor"
  },
  {
    name: "flag-fr",
    content: `<defs> <circle id="path-1" cx="30" cy="30" r="30"></circle></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="fr"> <mask id="mask-2" fill="white"> <use xlink:href="#path-1"></use> </mask> <use id="Oval" fill="#F5F5F5" xlink:href="#path-1"></use> <g id="Flag_of_France" mask="url(#mask-2)"> <g transform="translate(-5.000000, -3.000000)" id="Rectangle"> <rect fill="#ED2939" x="0" y="0" width="70" height="66"></rect> <rect fill="#FFFFFF" x="0" y="0" width="46" height="66"></rect> <rect fill="#002395" x="0" y="0" width="24" height="66"></rect> </g> </g> </g></g>`,
    viewBox: "0 0 60 60",
    stroke: "none"
  },
  {
    name: "flag-en",
    content: `<path d="m47.971 6.609c-4.625-2.916-10.1-4.609-15.971-4.609v4.61h15.971z" fill="#ed4c5c"/><path d="m32 11.219h21.625c-1.688-1.755-3.584-3.305-5.654-4.61h-15.971z" fill="#fff"/><path d="m32 15.829h25.262c-1.061-1.655-2.279-3.198-3.637-4.61h-21.625z" fill="#ed4c5c"/><path d="m32 20.439h27.688c-.674-1.614-1.49-3.153-2.426-4.61h-25.26v4.61" fill="#fff"/><path d="m32 25.05h29.18c-.377-1.588-.875-3.13-1.494-4.61h-27.688v4.61" fill="#ed4c5c"/><path d="m32 29.659h29.9c-.121-1.574-.363-3.113-.719-4.61h-29.18v4.61" fill="#fff"/><path d="m61.9 29.659h-29.9v2.341h-30c0 .764.037 1.519.094 2.27h59.813c.054-.751.093-1.506.093-2.27 0-.789-.041-1.568-.1-2.341" fill="#ed4c5c"/><path d="m2.801 38.879h58.4c.352-1.496.59-3.037.709-4.609h-59.812c.117 1.572.355 3.113.707 4.609" fill="#fff"/><path d="m4.283 43.488h55.43c.613-1.48 1.107-3.02 1.48-4.609h-58.4c.373 1.588.867 3.129 1.482 4.609" fill="#ed4c5c"/><path d="m6.691 48.1h50.617c.928-1.457 1.738-2.996 2.408-4.609h-55.43c.67 1.613 1.479 3.152 2.408 4.609" fill="#fff"/><path d="m10.305 52.709h43.39c1.35-1.414 2.561-2.957 3.615-4.611h-50.618c1.055 1.654 2.266 3.197 3.614 4.611" fill="#ed4c5c"/><path d="m15.916 57.32h32.17c2.053-1.309 3.936-2.857 5.609-4.609h-43.39c1.674 1.752 3.556 3.301 5.611 4.609" fill="#fff"/><path d="m32 62c5.92 0 11.434-1.723 16.084-4.682h-32.168c4.648 2.959 10.164 4.682 16.084 4.682z" fill="#ed4c5c"/><path d="m16.03 6.609c-2.068 1.305-3.967 2.854-5.654 4.61-1.355 1.412-2.574 2.955-3.637 4.61-.934 1.457-1.75 2.996-2.426 4.61-.617 1.479-1.115 3.02-1.492 4.61-.355 1.497-.598 3.036-.719 4.61-.06.773-.099 1.552-.099 2.341h30v-2.341-4.61-4.61-4.61-4.61-4.61-4.609c-5.873 0-11.346 1.693-15.973 4.609" fill="#428bc1"/><g fill="#fff"><path d="m25 3 .473 1.481h1.527l-1.236.98.476 1.515-1.24-.9-1.236.924.476-1.542-1.24-.977h1.527z"/><path d="m29 9 .473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.977h1.527z"/><path d="m21 9 .473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m25 15 .473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.977h1.527z"/><path d="m17 15 .473 1.481h1.527l-1.236.98.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m9 15 .473 1.481h1.527l-1.236.98.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m29 21 .473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.977h1.527z"/><path d="m21 21 .473 1.481h1.527l-1.236.98.476 1.515-1.24-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m13 21 .473 1.481h1.527l-1.236.98.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.977h1.527z"/><path d="m25 27 .473 1.482h1.527l-1.236.979.476 1.515-1.24-.896-1.236.92.476-1.542-1.24-.976h1.527z"/><path d="m17 27 .473 1.482h1.527l-1.236.979.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.976h1.527z"/><path d="m9 27 .473 1.482h1.527l-1.236.979.472 1.515-1.236-.896-1.236.92.472-1.542-1.236-.976h1.527z"/><path d="m11.764 13 1.236-.924 1.236.899-.473-1.514 1.237-.98h-1.527l-.473-1.481-.473 1.482h-1.422c-.016.016-.031.03-.047.046l1.178.931z"/><path d="m3.764 25 1.236-.924 1.236.899-.473-1.514 1.237-.98h-1.527l-.473-1.481-.473 1.482h-.976c-.039.115-.08.228-.117.343l.803.633z"/></g>`,
    viewBox: "0 0 60 60",
    stroke: "none"
  },
  {
    name: "logout",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>`
  },
  {
    name: "arrow-left",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>`
  },
  {
    name: "check",
    content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`
  }
];

const Icon = ({ children, className, name, ...props }) => {
  const icon = icons.find(icon => icon.name === name);
  const content = icon ? icon.content : "";
  const viewBox = icon.viewBox ? icon.viewBox : "0 0 24 24";
  const stroke =
    icon.stroke === "none"
      ? {}
      : {
          stroke: "currentColor",
          strokeWidth: "2",
          strokeminecap: "round",
          strokeLinejoin: "round"
        };
  const fill = icon.fill ? icon.fill : "none";
  const cssClasses = classNames(className, name);

  return (
    <>
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={cssClasses}
        fill={fill}
        {...stroke}
        {...props}
        dangerouslySetInnerHTML={{
          __html: content
        }}
      ></svg>
    </>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
