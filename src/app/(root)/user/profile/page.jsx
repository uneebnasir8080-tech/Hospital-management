


import { getServerSession } from "next-auth";
import { api } from "@/lib/apiCall";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import ClientProfile from "@/components/CilentProfile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.token || !session?.id) {
    return <div>Unauthorized</div>;
  }

  let resData = null;

  try {
    const res = await api.get(
      `/user`,
      {
        params:{
          userId:session?.id
        },
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    // const data = await res.json();
    resData = res.data.data || null;
  } catch (error) {
    console.error("Profile Fetch Error:", error);
  }

  return <ClientProfile resData={resData} />;
}