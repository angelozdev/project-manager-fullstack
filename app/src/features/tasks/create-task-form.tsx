import React from "react";
import { FormControl, Input, Button, VStack } from "native-base";
import useCreateTask from "./use-create-task";

interface Props {
  projectId: string;
}

export default function CreateTaskForm({ projectId }: Props) {
  const [taskName, setTaskName] = React.useState("");
  const [createTask, { loading, reset }] = useCreateTask({
    project: projectId,
    name: taskName,
    completed: false,
  });

  const canCreateTask = taskName.length > 0;

  const handleCreateTask = () => {
    createTask();
    reset();
    setTaskName("");
  };

  return (
    <VStack space={4} p={4} bg="white" mb={2}>
      <FormControl>
        <Input
          isDisabled={loading}
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Ej. estudiar sobre React Context"
          variant="underlined"
        />
      </FormControl>
      <Button
        onPress={handleCreateTask}
        isDisabled={!canCreateTask || loading}
        colorScheme="blue"
        rounded="full"
      >
        Crear tarea
      </Button>
    </VStack>
  );
}
