import clean from '../core/clean';
import runTask from './run-task';

export default async function runCleanCommand(): Promise<void> {
  await runTask(clean, {
    pending: 'Cleaning build directory...',
    success: 'Cleaned build directory!',
    failure: 'Failed to clean build directory.',
  });
}
