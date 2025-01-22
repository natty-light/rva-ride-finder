import { FC, ReactNode } from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right',
  children: ReactNode;
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose, position = "left", children }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 h-full bg-white shadow-lg z-50 transition-transform transform ${position === "left"
          ? `-translate-x-full ${isOpen ? "translate-x-0" : ""} left-0`
          : `-translate-x-full ${isOpen ? "translate-x-0" : ""} right-0`
          }`}
        style={{ width: "300px" }}
      >
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Drawer;