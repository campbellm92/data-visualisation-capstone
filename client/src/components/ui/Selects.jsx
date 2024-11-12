export function SelectWithBorder({ children }) {
  return (
    <select className="select select-bordered w-full max-w-xs bg-base-300">
      {children}
    </select>
  );
}

export function SelectWithBorderSmall({ children }) {
  return (
    <select className="select select-bordered select-sm w-fit max-w-xs bg-base-300">
      {children}
    </select>
  );
}
