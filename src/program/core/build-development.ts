/**
 * @license
 * MIT License
 *
 * Copyright (c) 2021 Lyon Software Technologies, Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import path from 'path';
import { build, BuildResult } from 'esbuild';
import { DEVELOPMENT_ENV } from './read-env-defs';
import readConfig from './read-config';
import readConfigWithCWD from './read-config-with-cwd';
import readExternals from './read-externals';
import { DEFAULT_CJS_DEVELOPMENT_ENTRY, getCJSTargetDirectory } from './build-cjs';

export default async function buildDevelopment(): Promise<BuildResult> {
  const config = readConfig();
  const configCWD = readConfigWithCWD();
  const externals = readExternals();
  // get outfile
  const outfile = path.resolve(path.join(
    process.cwd(),
    getCJSTargetDirectory(),
    DEFAULT_CJS_DEVELOPMENT_ENTRY,
  ));
  // run esbuild
  return build({
    entryPoints: [
      configCWD.srcFile,
    ],
    outfile,
    bundle: true,
    minify: false,
    platform: 'node',
    sourcemap: true,
    define: {
      ...await DEVELOPMENT_ENV,
      'process.env.NODE_ENV': '"development"',
    },
    external: externals,
    target: config.target,
    tsconfig: configCWD.tsconfig,
    jsxFactory: config.jsxFactory,
    jsxFragment: config.jsxFragment,
    logLevel: 'silent',
    banner: {
      js: '"use strict";'
    },
    charset: 'utf8',
    plugins: config.plugins,
  });
}
