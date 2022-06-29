import path from 'path';
import ts from 'typescript';

import readConfigWithCWD from './read-config-with-cwd';
import readPackage from './read-package';
import readValidCompilerOptions from './read-valid-compiler-options';

export type EndCompile = () => void;
export type ReadDiagnostic = (diagnostic: ts.Diagnostic) => void;

export default function watchCompileTypes(
  reportDiagnostic: ReadDiagnostic,
  reportWatchStatus: ReadDiagnostic,
  noEmit?: boolean,
): EndCompile {
  let ready = true;

  let program: ts.WatchOfConfigFile<any>;

  async function setup() {
    const pkg = await readPackage();

    const typesDir = pkg.types;
    if (!typesDir) {
      throw new Error('Missing "types" field from package.json');
    }

    if (!ready) {
      return;
    }

    const options = await readValidCompilerOptions();

    const baseConfig: ts.CompilerOptions = {
      ...options,
      outDir: path.resolve(
        path.join(
          process.cwd(),
          path.dirname(typesDir),
        ),
      ),
      emitDeclarationOnly: !noEmit,
      moduleResolution: 2,
      noEmit,
    };

    // Create a Program with an in-memory emit
    const cwdConfig = await readConfigWithCWD();

    if (!ready) {
      return;
    }

    const host = ts.createWatchCompilerHost(
      cwdConfig.tsconfig,
      baseConfig,
      ts.sys,
      ts.createSemanticDiagnosticsBuilderProgram,
      reportDiagnostic,
      reportWatchStatus,
    );

    // Prepare and emit the d.ts files
    program = ts.createWatchProgram(
      host,
    );
  }

  setup().catch((err) => {
    program.close();
    console.error(err);
    process.exit(1);
  });

  return () => {
    ready = false;
    if (program) {
      program.close();
    }
  };
}
