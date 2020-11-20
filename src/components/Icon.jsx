import PropTypes from "prop-types";

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
  }
];

const Icon = ({ children, name, ...props }) => {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeminecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        className={name}
        {...props}
        dangerouslySetInnerHTML={{
          __html: icons.find((icon) => icon.name === name)
            ? icons.find((icon) => icon.name === name).content
            : ""
        }}
      ></svg>
    </>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
