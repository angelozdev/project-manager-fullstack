import { Toast } from "native-base";
import { InterfaceToastProps } from "native-base/lib/typescript/components/composites/Toast";

const defaultOptions: InterfaceToastProps = {
  duration: 2000,
  placement: "bottom",
  variant: "solid",
};

export function onError(message: string) {
  Toast.show({
    ...defaultOptions,
    title: message,
    status: "error",
  });
}
