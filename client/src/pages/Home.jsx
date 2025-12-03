// PUBLIC LANDING PAGE
import GarbageRequestForm from "../components/GarbageRequestForm";
import ReportDumpForm from "../components/ReportDumpForm";

export default function Home() {
  // ...state and useEffects

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Clean Nairobi</h1>

      <GarbageRequestForm />
      <ReportDumpForm />

      {/* Requests and Reports List */}
    </div>
  );
}




