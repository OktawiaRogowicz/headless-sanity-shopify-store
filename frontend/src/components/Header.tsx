"use client";

import { useLocaleSettingsContext } from "@/contexts/localeSettingsContext";
import { Locale } from "@/i18n/routing";
import LanguageSettingsDropdown from "@/components/dropdowns/LanguageSettingsDropdown";
import CurrencySettingsDropdown from "@/components/dropdowns/CurrencySettingsDropdown";
import { useIsMobile } from "@/src/hooks/isMobile";
import { Translations } from "@/lib/types";

type HeaderProps = {
  header: any;
  locale: Locale;
  translations?: Translations;
};

export default function Header({ header, locale, translations }: HeaderProps) {
  const { currentCurrency, handleCurrencyChange } = useLocaleSettingsContext();
  const isMobile = useIsMobile();

  return (
    <header className="fixed w-full flex items-center justify-center z-50 bg-white/50 backdrop-blur-sm">
      <div className="w-full grid grid-cols-3 items-center justify-between py-6 container mx-auto">
        {/*<div className="flex align-start bg-red-300 col-start-1">todo: menu</div>*/}
        {/*<div className="flex justify-center bg-red-400 col-start-2">todo: logo</div>*/}
        <div className="flex justify-end gap-4  col-start-3">
          <LanguageSettingsDropdown
            locale={locale}
            isMobile={isMobile}
            translations={translations}
          />
          <CurrencySettingsDropdown
            currentCurrency={currentCurrency}
            handleCurrencyChange={handleCurrencyChange}
            isMobile={isMobile}
          />
        </div>
      </div>
    </header>
  );
}
