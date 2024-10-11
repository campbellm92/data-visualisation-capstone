export function ButtonSmall({ children }) {
  return (
    <button className="btn btn-sm btn-primary text-primary-content">
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

export function ButtonMediumWide({ children }) {
  return (
    <button className="btn btn-md btn-primary btn-wide">{children}</button>
  );
}
