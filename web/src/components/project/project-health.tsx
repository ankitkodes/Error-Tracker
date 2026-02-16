export default function ProjectHealth() {
  return (
    <>
      <div className="my-4">
        <div className="font-semibold mb-2">Project Health</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-2 rounded-md p-2">
            <div>Total Error (24h)</div>
            <div className="flex justify-between">
              <div className="font-semibold text-lg">2,847</div>
              <div> +12%</div>
            </div>
          </div>
          <div className="border-2 rounded-md p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            deleniti reprehenderit aspernatur unde repudiandae provident quod
            voluptatum dolore.
          </div>
          <div className="border-2 rounded-md p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            deleniti reprehenderit aspernatur unde repudiandae provident quod
            voluptatum dolore.
          </div>
          <div className="border-2 rounded-md p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            deleniti reprehenderit aspernatur unde repudiandae provident quod
            voluptatum dolore.
          </div>
        </div>
      </div>
    </>
  );
}
