import Navbar from "@/components/Navbar";
import SlugInput from "@/components/inputs/SlugInput";
import TextArea from "@/components/inputs/TextArea";
import TextInput from "@/components/inputs/TextInput";
import { fetchUserProfile } from "@/network";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

async function updateUserProfile(supabase, profileData) {
  try {
    const { error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", profileData.id);

    if (error) {
      throw error;
    }

    toast.success("Profile updated!");
    return true;
  } catch (e) {
    toast.error("Failed to update profile");
    console.error("Failed to update profile", e);
  }
}

export default function AccountPage() {
  // const router = useRouter();
  // const user = useUser();
  // const supabase = useSupabaseClient();
  // const [profileData, setProfileData] = useState({});

  // console.log("Account page user");
  // console.log(user);

  // useEffect(() => {
  //   fetchUserProfile(supabase, user).then((data) => setProfileData(data));
  // }, [supabase, user, setProfileData, router]);

  // const makeOnChange = (field) => (e) =>
  //   setProfileData({ ...profileData, [field]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();

    updateUserProfile(supabase, profileData);
  }

// console.log("profile Data");
//  console.log(profileData);
  // if (!profileData) {
  //   return null;
  // }

  return (
    <>
      <Head>
        <title>Manage Account - Jobot</title>
      </Head>
      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="px-2 flex-1 overflow-y-auto">
          <div className="mx-auto my-4 w-full max-w-4xl">
            <h1 className="text-center mx-auto text-4xl font-medium">
              Manage Account
            </h1>
            <form>
              <p>Hello Hi</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
