import { useEffect, useState } from "react";
import {
  Content as DropdownMenuContent,
  DropdownMenuItem,
  Portal as DropdownMenuPortal,
  Root as DropdownMenuRoot,
  Trigger as DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { DropdownSettingsOption } from "./types";
import { Translations } from "@/lib/types";
import { cn } from "@/utils/cn";

const allLanguageOptions: DropdownSettingsOption[] = [
  { icon: <span>english flag</span>, label: "English", value: "en" },
  { icon: <span>polish flag</span>, label: "Polski", value: "pl" },
];

interface LanguageSettingsDropdownProps {
  locale: string;
  isMobile?: boolean;
  translations?: Translations;
}

const LanguageSettingsDropdown = ({
  locale,
  isMobile,
  translations,
}: LanguageSettingsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const noLocalePathname =
    translations?.find((translation) => translation.language == locale)?.slug
      ?.current ?? pathname.slice(0, 1);

  const isActive = (option: DropdownSettingsOption) => locale === option.value;

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  return (
    <DropdownMenuRoot open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button aria-label={"Language settings"}>{locale}</button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className={cn(
            "z-50 w-[228px] rounded-2xl bg-white p-2 shadow-md shadow-black/20",
            "data-[side=top]:animate-slide-down-and-fade",
            "data-[side=right]:animate-slide-left-and-fade",
            "data-[side=bottom]:animate-slide-up-and-fade",
            "data-[side=left]:animate-slide-right-and-fade",
          )}
          sideOffset={10}
          align={"center"}
        >
          <div className="flex flex-col">
            {allLanguageOptions.map((option) => {
              return (
                <DropdownMenuItem key={option.value} asChild>
                  <Link
                    href={noLocalePathname}
                    locale={option.value}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-sm font-light text-base-black-80 hover:bg-secondary-blue-background"
                  >
                    <div className="flex items-center gap-3">
                      {option.icon} {option.label}
                    </div>
                    {isActive(option) && <span>active!</span>}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default LanguageSettingsDropdown;
