export const TEMPLATES_BASE_URL =
  "https://raw.githubusercontent.com/JovianHQ/jobot/main/templates";

export async function getTemplates() {
  console.log("get templates");
  const res = await fetch(
    `${TEMPLATES_BASE_URL}/index.json?t=${new Date().getTime()}`,
    {
      cache: "no-store",
    }
  );
  console.log(res);
  return await res.json();
}

export async function getSystemPrompt(slug) {
  console.log("get system prompt");
  const res = await fetch(
    `${TEMPLATES_BASE_URL}/${slug}/system.md?t=${new Date().getTime()}`,
    {
      cache: "no-store",
    }
  );
  console.log(res);  
  return res.text();
}

export async function getUserPrompt(slug) {
  console.log("get user prompt");  
  const res = await fetch(
    `${TEMPLATES_BASE_URL}/${slug}/user.md?t=${new Date().getTime()}`,
    {
      cache: "no-store",
    }
  );
  console.log(res);
  return res.text();
}

export async function getTemplate(slug) {
  const [templates, systemPrompt, userPrompt] = await Promise.all([
    getTemplates(),
    getSystemPrompt(slug),
    getUserPrompt(slug),
  ]);

  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return null;
  }

  template.systemPrompt = systemPrompt;
  template.userPrompt = userPrompt;

  return template;
}

export async function fetchUserProfile(supabase, user) {
  try {
    console.log("fetchUserProfile");
    console.log("user id");
    console.log(user.id);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    console.log(data);

    if (error) {
      throw error;
    }
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Error while fetch user profile", error);
  }
}
