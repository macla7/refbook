function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mb-12">
      <ul className="font-sm mt-12 flex justify-center gap-6 text-ourBrown">
        <li>
          <a
            className="flex items-center relative text-ourBrown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full"
            rel="noopener noreferrer"
            target="_blank"
            href="/about_us"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">About Us</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center relative text-ourBrown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full"
            rel="noopener noreferrer"
            target="_blank"
            href="/privacy_policy"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">Privacy Policy</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center relative text-ourBrown after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-ourBrown after:transition-all after:duration-1000 hover:after:w-full"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/macla7/refbook"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">View Github Project</p>
          </a>
        </li>
      </ul>
    </footer>
  );
}
