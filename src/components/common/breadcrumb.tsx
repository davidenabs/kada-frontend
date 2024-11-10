import React, { Fragment } from "react";
import { cn } from "rizzui";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <Fragment key={index}>
            <li key={index}>
              {item.link ? (
                <span>
                  <a
                    href={item.link}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    {item.label}
                  </a>
                </span>
              ) : (
                <span
                  className={cn(
                    "text-sm font-medium text-gray-500",
                    index === items.length - 1
                      ? "text-[#00A551]"
                      : "text-gray-500"
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>

            {index < items.length - 1 && (
              <li>
                <span>/</span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
