import { useEffect, type FC, type ReactNode } from "react";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  children: ReactNode;
};

const Drawer: FC<DrawerProps> = ({ isOpen, onClose, position = "left", children }) => {
  const translateClass =
    position === "left"
      ? ` ${isOpen ? "translate-x-0" : "-translate-x-full"}`
      : ` ${isOpen ? "translate-x-0" : "translate-x-full"}`;

  useEffect(() => console.log(translateClass), [translateClass]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose} // Close the drawer when the overlay is clicked
        />
      )}
      {/* Drawer */}
      <div
        className={`fixed top-0 h-full bg-white shadow-lg z-50 transition-transform transform ${translateClass} ${position === "left" ? "left-0" : "right-0"
          }`}
        style={{ width: "300px" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-1 bg-transparent hover:bg-gray-100 rounded-full"
          onClick={onClose}
          aria-label="Close Drawer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Drawer Content */}
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Drawer;