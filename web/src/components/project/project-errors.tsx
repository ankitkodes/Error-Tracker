"use client"
import { StatusStyle } from "@/lib/projectstyles";
import { UseErrorId } from "@/lib/store";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/utils/timeAgo";

interface Errorlog {
  error: string;
  occurrence: number;
  id: number;
  message: string;
  projectId: string;
  errorType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
      <div className="bg-white dark:bg-[#18171D] border border-black/[0.08] dark:border-white/[0.08] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-gray-50/50 dark:bg-white/[0.02] border-b border-black/[0.08] dark:border-white/[0.08]">
              <tr>
                <th className="px-6 py-4 font-medium">Error Message</th>
                <th className="px-6 py-4 font-medium">ErrorType</th>
                <th className="px-6 py-4 font-medium">Occurrences</th>
                <th className="px-6 py-4 font-medium">Last Seen</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
              {data.map((items: Errorlog) => (
                <tr key={items.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setErrorId(items.id);
                        setProjectId(items.projectId);
                        setErrorDrawer(true);
                      }}
                      className="cursor-pointer font-medium text-foreground text-left max-w-xs truncate block"
                    >
                      {items.message}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {items.errorType}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {items.occurrence}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {timeAgo(items.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium text-center cursor-pointer border",
                        StatusStyle[items.status],
                      )}
                    >
                      {items.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}