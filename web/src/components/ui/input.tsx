interface InputField {
  label?: string;
  id: string;
  type: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  //  onChange:void()
}

export default function Input({
  label,
  id,
  type,
  className,
  placeholder,
  required,
  ...rest
}: InputField) {
  return (
    <>
      <div className="py-2">
        <div className="font-medium mb-1">
          {label}: <span className="text-red-600">{required && "*"}</span>
        </div>
        <input
          id={id}
          type={type}
          className={`border-2 focus:outline-zinc-700 rounded-md px-2 py-1 ${className}`}
          placeholder={placeholder}
          {...rest}
          required={required}
        />
      </div>
    </>
  );
}
