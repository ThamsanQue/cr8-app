import { Button } from "@/components/ui/button";
import { Inbox } from "lucide-react";
import { AssetBox } from "./Asset-box";
import { useState } from "react";

interface Asset {
  id: string;
  type: "image" | "setting";
  thumbnail: string;
  name?: string;
}

interface ControlButtonProps {
  onClick: () => void;
  onClose: () => void;
  isActive?: boolean;
  className?: string;
  disabled?: boolean;
  assets?: Asset[];
  onRemoveAsset?: (id: string) => void;
  onAddAsset?: () => void;
}

export function DesignTray({
  onClick,
  onClose,
  isActive = false,
  disabled = false,
  assets = [],
  onRemoveAsset,
}: ControlButtonProps) {
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="default"
        className={`text-white ${isActive && "bg-white/10"} hover:bg-white/10 relative`}
        title="Design Tray"
        onClick={onClick}
        disabled={disabled}
      >
        {assets.length > 0 && (
          <span className="absolute top-2 right-2 inline-flex  items-center justify-center h-2 w-2 text-xs font-semibold text-white bg-[#FFD100] rounded-full translate-x-2 -translate-y-2" />
        )}
        <Inbox className="h-5 w-5" />
        <span className="">Design Tray</span>
      </Button>

      <div className="absolute bottom-full left-0 mb-24">
        <AssetBox
          isOpen={isActive}
          assets={assets}
          onRemoveAsset={onRemoveAsset}
          hoveredAsset={hoveredAsset}
          onHoverAsset={setHoveredAsset}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
