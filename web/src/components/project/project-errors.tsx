import { SeverityStyle, StatusStyle } from "@/lib/projectstyles";
import { useProjectError } from "@/lib/services/projects/projects.query";
import { UseErrorId } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

interface Errorlog{
  error: string;
  occurrence: number;
  id: number;
  message: string;
  projectId: string;
  severity: string;
  status: string;
}

export default function ProjectError(){ 
  const params = useParams();
  const projectid = params.ProjectDetails as string;

      const setErrorDrawer = UseErrorId((state) => state.setErrorDrawer);
      const setErrorId = UseErrorId((state) => state.setErrorId);

      const {data , isLoading , isError} = useProjectError(projectid);

       console.log("this is error of projects ", data);

      if(isLoading){
        return <p>loading.... project errors</p>
      }
      if(isError){
        return <p>unable to load project error</p>
      }

    return(
        <>
        <div className="border-2 rounded-md p-2">
          <div className="font-semibold">Error in this Project</div>
          <table className="border-collapse border-b-2 w-full text-left mt-2">
            <tbody>
              <tr className=" text-sm font-semibold text-muted-foreground">
                <td className="border-b-2 py-3 px-4">Error Message</td>
                <td className="border-b-2 py-3 px-4">Severity</td>
                <td className="border-b-2 py-3 px-4">Occurrences</td>
                <td className="border-b-2 py-3 px-4">Last Seen</td>
                <td className="border-b-2 py-3 px-4">Statue</td>
              </tr>

              {data.errors.map((items: Errorlog) => (
                <>
                  <tr className="text-sm">
                    <td className="border-b-2  py-3 px-4">
                      {" "}
                      <button
                        onClick={() => {
                          setErrorId(items.id);
                          setErrorDrawer(true);
                        }}
                        className="cursor-pointer"
                      >
                        {items.message}{" "}
                      </button>
                    </td>

                    <td className="border-b-2 py-3 px-4">
                      <button
                        className={cn(
                          "rounded-lg px-2 py-1 text-xs font-medium text-center",
                          SeverityStyle[items.severity],
                        )}
                      >
                        {items.severity}
                      </button>
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