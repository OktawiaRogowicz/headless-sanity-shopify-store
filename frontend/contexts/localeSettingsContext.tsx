"use client";

import { PropsWithChildren, useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";

interface LocaleSettingsContextProps {
  currentCurrency: string;
  handleCurrencyChange: (value: string) => void;
}

export const LocaleSettingsContext = createContext<LocaleSettingsContextProps>({
  currentCurrency: "EUR",
  handleCurrencyChange: (value: string) => {},
});

type LocaleSettingsProviderProps = PropsWithChildren;

export const LocaleSettingsContextProvider = ({
  children,
}: LocaleSettingsProviderProps) => {
  const [currentCurrency, setCurrentCurrency] = useState<string>("EUR");
  const pathname = usePathname();
  const router = useRouter();

  const handleCurrencyChange = (value: string) => {
    setCurrentCurrency(value);
    document.cookie = `currency=${value}; path=/; max-age=31536000`;
    localStorage.setItem("currency", value);
  };

  useEffect(() => {
    const getRedirectedPathname = (locale: Locale) => {
      if (!pathname) return "/";
      const segments = pathname.split("/");
      segments[1] = locale;
      return segments.join("/");
    };

    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", routing.defaultLocale);
      router.push(getRedirectedPathname(routing.defaultLocale));
    }
  }, [pathname, router]);

  return (
    <LocaleSettingsContext.Provider
      value={{
        currentCurrency,
        handleCurrencyChange,
      }}
    >
      {children}
    </LocaleSettingsContext.Provider>
  );
};

export const useLocaleSettingsContext = () => {
  return useContext(LocaleSettingsContext);
};
