import { spawn } from "bun";
import os from "node:os";

const CPUS = os.availableParallelism();

for (let i = 0; i < CPUS; i++) {
  spawn({
    cmd: ["bun", "run", "src/Server.ts"],
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit"
  });
}