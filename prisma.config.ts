import { defineConfig } from "@prisma/config";

export default defineConfig({
  // @ts-ignore - Prisma v6 config typing mismatch for 'skills'
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
