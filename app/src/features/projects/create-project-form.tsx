import React from "react";
import { Button, FormControl, Input, VStack } from "native-base";

// hooks
import useCreateProject from "./use-create-project";

export default function CreateProjectForm() {
  const [projectName, setProjectName] = React.useState("");
  const [createProject, { loading, reset }] = useCreateProject(projectName);
  const canCreateProject = projectName.length > 0;

  const handleCreateProject = () => {
    createProject();
    reset();
    setProjectName("");
  };

  return (
    <VStack space={4} mb={2} p={4} bg="white">
      <FormControl>
        <Input
          isDisabled={loading}
          onChangeText={setProjectName}
          value={projectName}
          variant="underlined"
          placeholder="Ej. curso sobre React Native"
          _focus={{ borderBottomColor: "blue.400" }}
        />
      </FormControl>
      <Button
        onPress={handleCreateProject}
        isDisabled={!canCreateProject || loading}
        colorScheme="blue"
        rounded="full"
      >
        Agregar nuevo proyecto
      </Button>
    </VStack>
  );
}
