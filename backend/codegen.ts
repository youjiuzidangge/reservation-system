
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/**/*.graphql", // 指向所有 .graphql 文件
  generates: {
    "src/graphql/types/models/user.ts": {
      schema: "src/graphql/schemas/user.graphql",
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"]
    },
    "src/graphql/types/models/reservation.ts": {
      schema: "src/graphql/reservation.graphql",
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"]
    },
    "src/graphql/types/models/auth.ts": {
      schema: "src/graphql/auth.graphql",
      plugins: ["typescript", "typescript-resolvers"]
    },
    "src/graphql/types/query.ts": {
      schema: "src/graphql/query.graphql",
      plugins: ["typescript", "typescript-resolvers"]
    },
    "src/graphql/types/mutation.ts": {
      schema: "src/graphql/mutation.graphql",
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;