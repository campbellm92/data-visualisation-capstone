export function ButtonSmall({ children, onClick }) {
  return (
    <button
      className="btn btn-sm btn-primary text-secondary-content"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ButtonMedium({ children }) {
  return (
    <button className="btn btn-md btn-primary text-primary-content">
      {children}
    </button>
  );
}

export function ButtonOutline({ children, onClick, id, disabled, className }) {
  return (
    <button
      className={`btn btn-sm btn-outline border-primary text-primary-content hover:text-secondary-content hover:bg-primary ${className}`}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function ButtonSmallWide({ children }) {
  return (
    <button className="btn btn-sm btn-primary btn-wide">{children}</button>
  );
}

export function ButtonMediumWide({ children, onClick }) {
  return (
    <button
      className="btn btn-md btn-primary btn-wide text-primary-content"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ButtonMediumFullWide({
  children,
  onClick,
  id,
  textColor = "text-primary-content",
  disabled,
}) {
  return (
    <button
      id={id}
      className={`btn btn-md btn-primary btn-wide w-full ${textColor}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function ButtonOutlineFullWide({ children, onClick, id }) {
  return (
    <button
      id={id}
      className="btn btn-md btn-outline btn-wide w-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ButtonOpenAIAnalysisModal({ onClick }) {
  return (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 text-primary-content hover:text-primary cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
        />
      </svg>
    </button>
  );
}

export function CloseButton({ onClick }) {
  return (
    <button className="" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-primary-content"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
