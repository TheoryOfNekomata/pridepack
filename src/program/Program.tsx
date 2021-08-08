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
import { render } from 'ink';
import React from 'react';
import Build from './Build';
import Check from './Check';
import Clean from './Clean';
import CreatePackage from './Init/CreatePackage';
import InitPackage from './Init/InitPackage';
import Lint, { LintProps } from './Lint';
import Test from './Test';
import Watch from './Watch';

export type ProgramCommand =
  | 'build'
  | 'create'
  | 'init'
  | 'test'
  | 'watch'
  | 'clean'
  | 'check'
  | 'lint'

export interface ProgramProps extends LintProps {
  command: ProgramCommand;
  template?: string;
  packageName?: string;
}

function Program(
  {
    command,
    template,
    packageName,
    files,
    fix,
    cache,
  }: ProgramProps,
) {
  if (command === 'create' && packageName) {
    return (
      <CreatePackage
        template={template ?? 'basic'}
        packageName={packageName}
      />
    );
  }
  if (command === 'init') {
    return (
      <InitPackage
        template={template ?? 'basic'}
      />
    );
  }
  if (command === 'clean') {
    return <Clean />;
  }
  if (command === 'check') {
    return <Check />;
  }
  if (command === 'build') {
    return <Build />;
  }
  if (command === 'watch') {
    return <Watch />;
  }
  if (command === 'test') {
    return <Test />;
  }
  if (command === 'lint') {
    return <Lint files={files} fix={fix} cache={cache} />;
  }

  return <></>;
}

export default function renderProgram(props: ProgramProps): void {
  render((
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Program {...props} />
  ), {
    patchConsole: true,
  });
}
