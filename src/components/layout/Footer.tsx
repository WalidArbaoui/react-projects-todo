import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="flex gap-4 justify-center items-center py-6 px-2">
      <p>All rights reserved &copy; 2025, Walid Arbaoui</p>
      <a
        href="https://github.com/WalidArbaoui/learn-react/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center gap-1 outline outline-gray-200 p-2 rounded hover:text-white hover:fill-white hover:bg-black"
      >
        <Icon icon="ri:github-fill" width="24" height="24" />
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
