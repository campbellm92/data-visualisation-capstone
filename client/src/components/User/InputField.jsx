const InputField = ({ label, type, placeholder, value, onChange, options }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {type === 'select' ? (
        <select className="input input-bordered" value={value} onChange={onChange}>
          <option value="" disabled>{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;