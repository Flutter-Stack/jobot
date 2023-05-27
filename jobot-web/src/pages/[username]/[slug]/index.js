import Head from "next/head";
import Navbar from "@/components/Navbar";
import useOpenAIMessages from "@/utils/openai";
import MessageHistory from "@/components/MessageHistory";
import MessageInput from "@/components/MessageInput";
import SkillForm from "@/components/SkillForm";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Layout from "@/components/Layout";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function SkillPage({ skill }) {
  const { history, sending, sendMessages } = useOpenAIMessages();
  console.log("history");
  console.log(history);

  console.log("sending");
  console.log(sending);

  console.log("sendMessages");
  console.log(sendMessages);

  const supabase = useSupabaseClient();
  const user = useUser();
  console.log("user");
  console.log(user);
  const router = useRouter();
  console.log("router");
  console.log(router);  

  console.log("skill");
  console.log(skill);  

  if (!skill) {
    return null;
  }

  async function handleSend(newMessages) {
    console.log("newMessages");
    console.log(newMessages);
    const finalHistory = await sendMessages(newMessages);
    console.log("final history");
    console.log(finalHistory);
    if (!finalHistory) {
      return false;
    }

    const { data: conversationData, error: conversationError } = await supabase
      .from("conversations")
      .insert({
        user_id: user.id,
        title: finalHistory
          .filter((m) => m.role !== "system")[0]
          .content.slice(0, 40),
      })
      .select()
      .single();
      console.log("conversation data");
      console.log(conversationData);
      console.log("conversationError");
      console.log(conversationError);      
    if (conversationError) {
      toast.error(
        "Failed to create conversation. " + conversationError.message
      );
      console.error("Failed to create conversation", conversationError);
      return false;
    }

    // add conversation id into all messages
    const unsavedMessages = finalHistory.map((message) => ({
      ...message,
      conversation_id: conversationData.id,
    }));

    console.log("unsavedMessages");
    console.log(unsavedMessages);      

    // insert messages using supabase
    const { error: messagesError } = await supabase
      .from("messages")
      .insert(unsavedMessages);

      console.log("messagesError");
      console.log(messagesError);      
  
    if (messagesError) {
      toast.error("Failed to save messages. " + messagesError.message);
      console.error("Failed to save messages", messagesError);
      return false;
    }

    router.push(`/conversations/${conversationData.id}`);
  }

  return (
    <>
      <Head>
        <title>{`${skill.title} - Jobot`}</title>
        <meta name="description" content={skill.description} />
        <link rel="icon" href="/jobot_icon.png" type="image/png" />
        <meta property="og:image" content="/jobot_meta.png" />
      </Head>
      <Layout>
        <Navbar />

        {history.length === 1 && (
          <SkillForm skill={skill} sendMessages={handleSend} />
        )}

        {history.length > 1 && (
          <>
            <MessageHistory history={history} />
            <MessageInput sending={sending} sendMessages={handleSend} />
          </>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const supabase = createServerSupabaseClient(context);
  const slug = context.params.slug;
  const username = context.params.username;
  console.log("slug");
  console.log(slug);
  const { data: skills, error } = await supabase
    .from("skills")
    .select("*,profiles(username, first_name, last_name)")
    .eq("slug", slug)
    .eq("profiles.username", username)
    .limit(1);
    console.log("skills");
    console.log(skills);
    console.log("error");
    console.log(error);    
  if (error || !skills || skills.length === 0) {
    console.error("Failed to fetch skill for slug: " + slug, error);
    return {
      notFound: true,
    };
  }

  return {
    props: { skill: skills[0] },
  };
}