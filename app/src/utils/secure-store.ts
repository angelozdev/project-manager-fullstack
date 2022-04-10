import * as SecureStore from "expo-secure-store";
import { SecureStoreItems } from "@consts";

export async function getItem<T = unknown>(key: SecureStoreItems) {
  try {
    const dataFromSS = await SecureStore.getItemAsync(key);
    if (!dataFromSS) return null;
    const parsedData: T = JSON.parse(dataFromSS);
    return parsedData;
  } catch (error) {
    console.error("[GET_ITEM]:", error);
    return null;
  }
}

function parseValue(value: any): string {
  const valueByType: Record<string, (value: any) => string> = {
    boolean: (value: boolean) => JSON.stringify(value),
    number: (value: number) => value.toString(),
    object: (value: Object) => JSON.stringify(value),
    string: (value: string) => value,
  };

  return valueByType?.[typeof value]?.(value) || "";
}

export async function setItem(
  key: SecureStoreItems,
  value: any
): Promise<boolean> {
  try {
    const parsedValue = parseValue(value);
    await SecureStore.setItemAsync(key, parsedValue);
    return true;
  } catch (error) {
    console.error("[GET_ITEM]:", error);
    return false;
  }
}

export async function deleteItem(key: SecureStoreItems): Promise<boolean> {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    console.error("[GET_ITEM]:", error);
    return false;
  }
}
