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
import {
  DEFAULT_TYPES_OUTPUT,
  getCJSTargetDirectory,
  getESMTargetDirectory,
} from './resolve-entrypoint';
import { removeFile } from './fs-utils';

export default async function clean(moduleEntry: string): Promise<void> {
  const cwd = process.cwd();
  // Remove CJS directory
  await removeFile(
    path.resolve(
      path.join(
        cwd,
        getCJSTargetDirectory(moduleEntry, true),
      ),
    ),
  );
  await removeFile(
    path.resolve(
      path.join(
        cwd,
        getCJSTargetDirectory(moduleEntry, false),
      ),
    ),
  );
  // Remove ESM directory
  await removeFile(
    path.resolve(
      path.join(
        cwd,
        getESMTargetDirectory(moduleEntry, false),
      ),
    ),
  );
  // Remove ESM directory
  await removeFile(
    path.resolve(
      path.join(
        cwd,
        getESMTargetDirectory(moduleEntry, true),
      ),
    ),
  );
  // Remove types
  await removeFile(
    path.resolve(
      path.join(
        cwd,
        DEFAULT_TYPES_OUTPUT,
      ),
    ),
  );
}
