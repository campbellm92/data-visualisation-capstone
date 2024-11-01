

export default function Checkbox({ label, value, setValue }) {

    const handleChange = () => {
        setValue(!value);
    };

    return (
        <div className="grid grid-cols-5 mt-1 ml-4">
            <div className="p-0 col-span-1">
                <input id={label} type="checkbox" checked={value} className="checkbox checkbox-xl" onChange={handleChange} />
            </div>
            <div className="p-0 col-span-4">
                <label className="whitespace-nowrap text-primary-content">{label}</label>
            </div>
        </div>
    )
}