import React, { useEffect, useState } from "react";

type Props = {};

const DarkModeToggle = (props: Props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = (): void => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
  }, [isDarkMode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <>
      <label className="flex gap-2 cursor-pointer select-none items-center">
        Dark
        <div className="relative">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
            className="sr-only"
          />
          <div className="block h-6 w-10 rounded-full bg-[#E5E7EB] dark:bg-gray-400"></div>
          <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition dark:bg-gray-600 dark:right-1 dark:left-auto"></div>
        </div>
      </label>
    </>
  );
};

export default DarkModeToggle;
