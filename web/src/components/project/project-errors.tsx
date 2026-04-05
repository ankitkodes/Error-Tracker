"use client"
import { StatusStyle } from "@/lib/projectstyles";
import { UseErrorId } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Errorlog {
  error: string;
  occurrence: number;
  id: number;
  message: string;
  projectId: string;
  errorType: string;
  status: string;
}
interface projectErrorProps {
  data: Errorlog[]
}
export default function ErrorTable({ data }: projectErrorProps) {

  const setErrorDrawer = UseErrorId((state) => state.setErrorDrawer);
  const setErrorId = UseErrorId((state) => state.setErrorId);
  const setProjectId = UseErrorId((state) => state.setProjectId);

  if (!data) {
    return <p>loading...</p>
  }

  return (
    <>
      <div className="border border-black/[0.08] dark:border-white/[0.08] rounded-md bg-white dark:bg-[#18171D]">
        <table className="border-collapse border-b-2 w-full text-left mt-2">
          <tbody>
            <tr className=" text-sm font-semibold text-muted-foreground">
              <td className="border-b-2 py-3 px-4">Error Message</td>
              <td className="border-b-2 py-3 px-4">ErrorType</td>
              <td className="border-b-2 py-3 px-4">Occurrences</td>
              <td className="border-b-2 py-3 px-4">Last Seen</td>
              <td className="border-b-2 py-3 px-4">Statue</td>
            </tr>

            {data.map((items: Errorlog) => (
              <>
                <tr className="text-sm">
                  <td className="border-b-2  py-3 px-4">
                    {" "}
                    <button
                      onClick={() => {
                        setErrorId(items.id);
                        setProjectId(items.projectId)
                        setErrorDrawer(true);
                      }}
                      className="cursor-pointer"
                    >
                      {items.message}{" "}
                    </button>
                  </td>

                  <td className="border-b-2 py-3 px-4">
                    {items.errorType}
                  </td>
                  <td className="border-b-2 py-3 px-4">
                    {" "}
                    {items.occurrence}{" "}
                  </td>
                  <td className="border-b-2 py-3 px-4">12 minutes ago </td>
                  <td className="border-b-2 py-3 px-4">
                    <button
                      className={cn(
                        "rounded-lg px-2 py-1 text-xs font-medium text-center cursor-pointer",
                        StatusStyle[items.status],
                      )}
                    >
                      {items.status}
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}