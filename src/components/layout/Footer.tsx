import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  extraClassName?: string;
};

const Footer = ({ extraClassName = "" }: Props) => {
  return (
    <footer
      className={`flex min-lg:flex-col justify-center max-lg:items-center max-lg:gap-4 max-lg:py-6 max-lg:px-2 ${extraClassName}`}
    >
      <p>
        <span className="min-lg:hidden">All rights reserved</span>&copy; 2025,
        Walid Arbaoui
      </p>
      <a
        href="https://github.com/WalidArbaoui/learn-react/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center gap-1 outline outline-gray-200 p-2 max-lg:rounded hover:text-white hover:fill-white hover:bg-black"
      >
        <Icon icon="ri:github-fill" width="24" height="24" />
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
