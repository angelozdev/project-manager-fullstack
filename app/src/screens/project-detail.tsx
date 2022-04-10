import { TaskList } from "@features/tasks";
import { View, Text } from "native-base";
import React from "react";

export default function ProjectDetail({ route }: ProjectDetailStackProps) {
  return (
    <View>
      <TaskList projectId={route.params._id} />
    </View>
  );
}
