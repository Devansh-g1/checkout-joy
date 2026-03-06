import { ReactNode } from "react";

const StickyBottomBar = ({ children }: { children: ReactNode }) => (
  <div className="sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t py-4 px-4 -mx-4 mt-8 flex gap-3 items-center z-10">
    {children}
  </div>
);

export default StickyBottomBar;
