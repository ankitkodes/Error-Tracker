import ApexAreaChart from "@/components/Analytics/ApexAreaChart";
import ApexPieChart from "@/components/Analytics/ApexPieChart";
import ProjectHealth from "@/components/project/project-health";

// import SignupForm from "@/components/SignupForm";
export default function page() {
  return (
    <>
      <div className="">
        <div className="flex relative">
          <div className="inline-block">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Monitor errors and track system health
            </p>
          </div>
          <div className=" absolute right-2 flex gap-2">
            <button className="text-sm text-white bg-black  border px-2 py-1 rounded-md cursor-pointer  flex items-center gap-1">
              Last 7 days
            </button>
            <button className="text-sm text-white bg-black  border px-4 py-2 rounded-md cursor-pointer  flex items-center gap-1">
              Last 30 days
            </button>
          </div>
        </div>
        <ProjectHealth />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="border">
            <ApexAreaChart />
          </div>
          <div className="border flex justify-center">
            <ApexPieChart />{" "}
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          natus, architecto accusamus blanditiis fugiat mollitia cumque
          necessitatibus voluptatibus ipsam dignissimos iste a sunt possimus
          tempore facere expedita consequuntur. Sequi deleniti voluptate,
          quaerat aspernatur praesentium, optio aliquam accusamus perferendis
          provident error unde deserunt? Quisquam, autem corrupti!
        </div>
      </div>
    </>
  );
}
