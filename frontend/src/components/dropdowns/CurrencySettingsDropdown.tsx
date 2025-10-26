import { useEffect, useState } from "react";
import {
  Content as DropdownMenuContent,
  DropdownMenuItem,
  Portal as DropdownMenuPortal,
  Root as DropdownMenuRoot,
  Trigger as DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import DropdownSettingsItem from "./DropdownSettingsItem";
import { DropdownSettingsOption } from "@/components/dropdowns/types";
import { cn } from "@/utils/cn";

const allCurrencyOptions = [
  { icon: <span>USD</span>, label: "Dollar", value: "USD" },
  { icon: <span>EUR</span>, label: "Euro", value: "EUR" },
  { icon: <span>GBP</span>, label: "Pound ", value: "GBP" },
];

interface CurrencySettingsDropdownProps {
  currentCurrency: string;
  handleCurrencyChange: (value: string) => void;
  isMobile?: boolean;
}

const CurrencySettingsDropdown = ({
  currentCurrency,
  handleCurrencyChange,
  isMobile,
}: CurrencySettingsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  const isActive = (option: DropdownSettingsOption) =>
    currentCurrency === option.value;

  return (
    <DropdownMenuRoot open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button aria-label={"Currency settings"}>{currentCurrency}</button>
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
            {allCurrencyOptions.map((option) => {
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleCurrencyChange(option.value)}
                  className="flex w-full items-center justify-between rounded-lg p-2 text-sm font-light text-base-black-80 hover:bg-secondary-blue-background"
                >
                  <div className="flex items-center gap-3">
                    {option.icon} {option.label}
                  </div>
                  {isActive(option) && <span>active!</span>}
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default CurrencySettingsDropdown;
