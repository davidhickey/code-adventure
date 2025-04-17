"use client";

import { useContext, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import ThemeContext from "@/store";

const navigation = [
  { name: "Nasa Images", href: "/space-gallery", underConstruction: false },
  { name: "Lyrics Game", href: "/lyrics-game", underConstruction: false },
  { name: "Art Gallery", href: "/art-gallery", underConstruction: true },
];
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkTheme, toggleThemeHandler } = useContext(ThemeContext);

  const toggleTheme = () => {
    toggleThemeHandler();
  };

  return (
    <header className="relative inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src={isDarkTheme ? "/DH-gray.png" : "/DH-green.png"}
              className="h-4 sm:h-6 w-auto"
              width={32}
              height={32}
              unoptimized={true}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-lPrimaryGreen dark:text-dPrimaryGray"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              <Link
                href={item.href}
                className="relative text-sm/6 font-semibold text-lPrimaryGreen dark:text-dPrimaryGray hover:text-lSecDarkGreen dark:hover:text-dSecMaize"
              >
                {item.name}
              </Link>
              {item.underConstruction && (
                <span className="absolute bottom-[-.5rem] left-0 text-[10px] text-red-500 w-[110px]">
                  Under Construction
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={toggleTheme}
            className="text-lPrimaryGreen dark:text-dPrimaryGray"
          >
            {isDarkTheme ? (
              <SunIcon className="size-8 dark:hover:text-dSecMaize dark:hover:fill-dSecMaize" />
            ) : (
              <MoonIcon className="size-8 hover:fill-lPrimaryGreen text-lPrimaryGreen" />
            )}
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-lSecCream dark:bg-dSecDarkBlue px-6 py-6 sm:max-w-sm ring-1 ring-opacity-40 ring-lPrimaryGreen dark:ring-dPrimaryGray">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5">
              <Image
                alt=""
                src={isDarkTheme ? "/DH-gray.png" : "/DH-green.png"}
                className="h-4 sm:h-6 w-auto"
                width={32}
                height={32}
                unoptimized={true}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="size-6 text-lPrimaryGreen dark:text-dPrimaryGray"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-lPrimaryGreen dark:divide-dPrimaryGray">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <div key={item.name} className="relative">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-lPrimaryGreen dark:text-dPrimaryGray hover:text-lSecBurntOrange dark:hover:text-dSecMaize"
                    >
                      {item.name}
                    </Link>
                    {item.underConstruction && (
                      <span className="absolute bottom-[0] left-0 text-[10px] text-red-500 w-[110px]">
                        Under Construction
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6">
                <button
                  onClick={toggleTheme}
                  className="text-lPrimaryGreen dark:text-dPrimaryGray"
                >
                  {isDarkTheme ? (
                    <SunIcon className="size-8 dark:hover:text-dSecMaize dark:hover:fill-dSecMaize" />
                  ) : (
                    <MoonIcon className="size-8 hover:fill-lPrimaryGreen text-lPrimaryGreen" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
