import Image from "next/image";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";
import  api  from "@/lib/apiCall";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

const PaymentFee = async () => {
  // Get session
  const session = await getServerSession(authOptions);
  if (!session) return <p>Not authenticated</p>;

  // Fetch appointments
  let appointments = [];
  try {
    const res = await api.get("/patient/all-appointment", {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    });
    appointments = res?.data?.getData || [];
  } catch (err) {
    console.error("Failed to fetch appointments:", err);
    return <p>Error loading appointments</p>;
  }

  // Filter pending
  const filtered = appointments.filter((a) => a.status === "pending");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between h-10 items-center px-2 text-sm text-gray-700">
        <p className="font-semibold">Patient Fee</p>
        <TbArrowsDiagonalMinimize className="text-lg" />
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map((data, index) => {
          const patient = data?.patientId;
          const profile = patient?.profile || "/doc1.png"; // fallback

          return (
            <div
              key={index}
              className="text-sm flex justify-between px-2 items-center border-b py-2"
            >
              <div className="flex h-10 gap-2 items-center">
                {/* Profile Image */}
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden">
                  <Image
                    src={profile}
                    alt={patient?.userId?.name || "Patient"}
                    fill
                    className="object-cover"
                    
                  />
                </div>

                {/* Name & Status */}
                <div className="text-[11px] xl:text-xs">
                  <p className="font-medium tracking-tight">
                    {patient?.userId?.name || "Unknown"}
                  </p>
                  <p className="text-red-400">Dr Fee {data?.status}</p>
                </div>
              </div>

              {/* Action Button */}
              <button className="bg-blue-400 px-2 py-1 text-xs xl:text-sm text-white rounded-md hover:bg-blue-500 transition">
                Request Fee
              </button>
            </div>
          );
        })}
        <p className="text-sm text-black/60 text-center">Total Pendings</p>
        {/* Show message if no pending appointments */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No pending appointments
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentFee;