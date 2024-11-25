export default function Checkbox({ label, value, setValue }) {
  const handleChange = () => {
    setValue(!value);
  };

  return (
    <div className="grid grid-cols-5 m-4">
      <div className="p-0 col-span-1">
        <input
          id={label}
          type="checkbox"
          checked={value}
          className="checkbox checkbox-xl checkbox-primary"
          onChange={handleChange}
          aria-label={`Toggle ${value ? "on" : "off"} checkbox`}
        />
      </div>
      <div className="pl-2 col-span-4">
        <label className="whitespace-nowrap text-primary-content font-light">
          {label}
        </label>
      </div>
    </div>
  );
}
