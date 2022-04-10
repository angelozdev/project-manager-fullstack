import React from "react";
import { View, FlatList, Text } from "native-base";
import useGetTasksByProjectId from "./use-get-tasks-by-project-id";
import CreateTaskForm from "./create-task-form";
import TaskItem from "./task-item";
import useUpdateTask from "./use-update-task";

interface Props {
  projectId: string;
}

const withProjectId = (projectId: string) => {
  return <CreateTaskForm projectId={projectId} />;
};

export default function TaskList({ projectId }: Props) {
  const { data } = useGetTasksByProjectId(projectId);
  const [updateTask, { reset }] = useUpdateTask();

  const handleUpdateTask = React.useCallback(
    (id: string, updatedTask: UpdateTaskVars["updatedTask"]) => () => {
      updateTask({
        variables: { taskId: id, updatedTask },
        optimisticResponse: () => {
          const prevTask = data?.getTasksByProjectId.find((t) => t._id === id);
          if (!prevTask) throw new Error("This should be impossible");
          return {
            updateTask: {
              ...prevTask,
              completed: !prevTask?.completed,
            },
          };
        },
      });
      reset();
    },
    [updateTask, reset, data]
  );

  return (
    <View>
      <FlatList
        ListHeaderComponent={withProjectId(projectId)}
        data={data?.getTasksByProjectId}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const { _id, name, completed, createdAt, updatedAt } = item;
          return (
            <TaskItem
              onCompleted={handleUpdateTask(_id, { completed: !completed })}
              createdAt={createdAt}
              updatedAt={updatedAt}
              name={name}
              completed={completed}
            />
          );
        }}
      />
    </View>
  );
}
