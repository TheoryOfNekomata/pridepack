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
import { Box, Text, TextProps } from 'ink';
import React from 'react';
import ts from 'typescript';

interface DiagnosticDisplay {
  symbol: string;
  color: TextProps['color'];
}

interface DiagnosticDisplayOptions {
  [key: string]: DiagnosticDisplay;
}

export const DIAGNOSTIC_DISPLAYS: DiagnosticDisplayOptions = {
  [ts.DiagnosticCategory.Error]: {
    symbol: '✖',
    color: 'red',
  },
  [ts.DiagnosticCategory.Message]: {
    symbol: '✔',
    color: 'green',
  },
  [ts.DiagnosticCategory.Suggestion]: {
    symbol: 'ℹ',
    color: 'cyan',
  },
  [ts.DiagnosticCategory.Warning]: {
    symbol: '⚠',
    color: 'yellow',
  },
};

export interface DiagnosticMessageProps {
  category: ts.DiagnosticCategory;
  message: string;
}

export default function DiagnosticMessage(
  { category, message }: DiagnosticMessageProps,
): JSX.Element {
  return (
    <Box>
      <Text color={DIAGNOSTIC_DISPLAYS[category].color}>
        {DIAGNOSTIC_DISPLAYS[category].symbol}
      </Text>
      <Text>
        {` ${message}`}
      </Text>
    </Box>
  );
}
