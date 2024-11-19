export function ButtonSmall({ children, onClick }) {
  return (
    <button
      className="btn btn-sm btn-primary text-primary-content"
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

export function ButtonOutline({ children }) {
  return (
    <button className="btn btn-sm btn-outline btn-primary text-primary-content">
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
  disabled
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
