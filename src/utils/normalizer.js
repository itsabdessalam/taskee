const formatChecklist = checklist => {
  if (!checklist || !checklist.tasks) {
    return {};
  }
  const tasks = [...checklist.tasks].map(task => ({
    ...task,
    title: task.title || "Untitled"
  }));
  checklist.tasks = tasks;

  return checklist;
};

const normalize = (entry, fields) => {
  switch (entry) {
    case "note":
      return {
        checklist: formatChecklist(fields.checklist),
        deadline: fields.deadline,
        template: fields.template,
        text: fields.text,
        title: fields.title,
        user: fields.user,
        _id: fields._id
      };
    default:
      return {};
  }
};

export default normalize;
