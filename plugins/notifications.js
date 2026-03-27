export const NotificationPlugin = async ({ $ }) => {
  const notify = async (title, message) => {
    await $`terminal-notifier -message ${message} -title ${title}`;
  };
  return {
    event: async ({ event }) => {
      if (event.type === "session.idle")
        await notify("OpenCode ✅", "Tarefa concluída!");
      if (event.type === "session.wait")
        await notify("OpenCode 💬", "Preciso da sua atenção");
      if (event.type === "permission.asked")
        await notify("OpenCode ⚠️", "Permissão necessária");
      if (event.type === "session.error" || event.type === "tool.execute.error")
        await notify("OpenCode ❌", "Ops! Algo deu errado");
    },
  };
};
