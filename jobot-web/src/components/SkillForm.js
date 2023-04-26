// import { useState } from "react";
// import SkillInput from "./SkillInput";
// import { makeDisplayName } from "@/utils";
// import { useUser } from "@supabase/auth-helpers-react";
// import Link from "next/link";

export function fillTemplate(string, data = {}) {
  return Object.entries(data).reduce((res, [key, value]) => {
    // lookbehind expression, only replaces if mustache was not preceded by a backslash
    const mainRe = new RegExp(`(?<!\\\\){{\\s*${key}\\s*}}`, "g");
    // this regex is actually (?<!\\){{\s*<key>\s*}} but because of escaping it looks like that...
    const escapeRe = new RegExp(`\\\\({{\\s*${key}\\s*}})`, "g");
    // the second regex now handles the cases that were skipped in the first case.
    return res.replace(mainRe, value.toString()).replace(escapeRe, "$1");
  }, string);
}

const SkillForm = ({ skill, sendMessages }) => {
  console.log("SkillForm");
  console.log("skill");
  console.log(skill);
  console.log("sendMessages");
  console.log(sendMessages);

  // const user = useUser();
  // const [inputData, setInputData] = useState({});

  const inputs = skill.inputs || [];
  console.log("inputs");
  console.log(inputs);
  // function startConversation() {
  //   const filledMessages = [
  //     { role: "system", content: fillTemplate(skill.system_prompt, inputData) },
  //     { role: "user", content: fillTemplate(skill.user_prompt, inputData) },
  //   ];

  //   sendMessages(filledMessages);
  // }

  if (!skill) {
    return <div>Not Found</div>;
  }

  return (
    <div>asdfafadf</div>
  );
};

export default SkillForm;
