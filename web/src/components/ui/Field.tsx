interface fieldDescription {
  description: string;
}

interface fieldtitle {
  title: string;
}

export function Fieldtitle({ title }: fieldtitle) {
  return (
    <>
      <p className="text-2xl font-semibold leading-none">{title}</p>
    </>
  );
}
export function FieldDescription({ description }: fieldDescription) {
  return (
    <>
      <p className="text-muted-foreground text-sm font-normal leading-normal">
        {description}{" "}
      </p>
    </>
  );
}

module.exports = { Fieldtitle, FieldDescription };
