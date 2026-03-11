import { getServerSession } from "next-auth";
import { api } from "@/lib/apiCall";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import Image from "next/image";
import {
  User,
  Mail,
  Calendar,
  Award,
  Briefcase,
  Phone,
  ArrowRight,
} from "lucide-react";
import { calculateAge } from "@/lib/utils";
import EditProfileButton from "@/components/EditProfileButton";

export default async function SettingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.token || !session?.id) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-600 font-medium">Unauthorized Access</p>
          <p className="text-sm text-red-400 mt-1">
            Please log in to view settings.
          </p>
        </div>
      </div>
    );
  }

  let resData = null;
  try {
    const res = await api.get(`/user`, {
      params: { userId: session?.id },
      headers: { Authorization: `Bearer ${session?.token}` },
    });
    resData = res.data.data || null;
  } catch (error) {
    console.error("Profile Fetch Error:", error);
  }

  if (!resData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 italic">Failed to load profile data.</p>
      </div>
    );
  }
  const profileImage = resData?.doctor?.profile?.trim() || "/doc1.png";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Profile Card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-400 to-indigo-600 p-8 md:p-12 shadow-2xl shadow-blue-200/50 mb-8">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        <EditProfileButton resData={resData} className="cursor-pointer" />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
            <Image
              src={profileImage}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight capitalize">
              {resData?.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/10">
                {resData?.doctor?.specialization || "Professional"}
              </span>
              <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-900/20 backdrop-blur-md rounded-full text-blue-50 text-sm font-medium border border-white/5">
                <Phone size={14} />
                {resData?.phone || "Private Contact"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <User size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-gray-400 group-hover:text-blue-500 transition-colors"
                />
                <span className="text-gray-500 font-medium">Email Address</span>
              </div>
              <span className="text-gray-800 font-semibold">
                {resData?.email}
              </span>
            </div>

            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Calendar
                  size={18}
                  className="text-gray-400 group-hover:text-blue-500 transition-colors"
                />
                <span className="text-gray-500 font-medium">Member Since</span>
              </div>
              <span className="text-gray-800 font-semibold">
                {resData?.createdAt
                  ? new Date(resData.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
              <Award size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Professional Profile
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Briefcase
                  size={18}
                  className="text-gray-400 group-hover:text-indigo-500 transition-colors"
                />
                <span className="text-gray-500 font-medium">Experience</span>
              </div>
              <span className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-lg">
                {resData?.doctor?.experience || "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <User
                  size={18}
                  className="text-gray-400 group-hover:text-indigo-500 transition-colors"
                />
                <span className="text-gray-500 font-medium">Age / Gender</span>
              </div>
              <span className="text-gray-800 font-semibold capitalize">
                {calculateAge(resData?.doctor?.age)} Y •{" "}
                {resData?.doctor?.gender || "Not Set"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Briefcase className="text-gray-400" size={20} />
          </div>
          <div>
            <p className="text-gray-800 font-bold">Specialization</p>
            <p className="text-sm text-gray-500">
              Your primary field of expertise
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-blue-600 font-bold">
          {resData?.doctor?.specialization || "Not Set"}
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  );
}
