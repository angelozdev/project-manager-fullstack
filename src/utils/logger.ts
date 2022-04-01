import colors from "colors";

type Backgrounds =
  | "bgRed"
  | "bgGreen"
  | "bgYellow"
  | "bgBlue"
  | "bgMagenta"
  | "bgCyan"
  | "bgWhite";

type TColors =
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"
  | "black";

export class Logger {
  static log = console.log;
  static #print(
    module: string,
    bg: Backgrounds = "bgBlue",
    color: TColors = "blue",
    messages: string[]
  ) {
    const message = [`[${module}]:`, ...messages].join(" ");
    this.log(colors[bg][color](message));
  }

  static success(module: string, ...messages: string[]) {
    this.#print(module, "bgGreen", "black", messages);
  }

  static error(module: string, ...messages: string[]) {
    this.#print(module, "bgRed", "black", messages);
  }

  static info(module: string, ...messages: string[]) {
    this.#print(module, "bgBlue", "black", messages);
  }

  static warn(module: string, ...messages: string[]) {
    this.#print(module, "bgYellow", "black", messages);
  }
}
