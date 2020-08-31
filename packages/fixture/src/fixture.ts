import { BettererRuns, BettererRunNames, BettererSummary } from '@betterer/betterer';
import { warnΔ } from '@betterer/logger';
import { promises as fs } from 'graceful-fs';
import * as path from 'path';

import { createFixtureFS } from './fs';
import { createFixtureLogs } from './logging';
import { Fixture, FixtureFileSystemFiles, FixtureFactory } from './types';

export async function createFixtureDirectoryΔ(fixturesPath: string): Promise<FixtureFactory> {
  try {
    await fs.mkdir(fixturesPath);
  } catch {
    // Move on...
  }

  return async function createFixtureΔ(fixtureName: string, files: FixtureFileSystemFiles): Promise<Fixture> {
    try {
      const fixtureNames = await fs.readdir(fixturesPath);
      if (fixtureNames.includes(fixtureName)) {
        warnΔ(`There is already a fixture in use called "${fixtureName}"`);
      }
    } catch {
      // Move on...
    }

    const fixturePath = path.resolve(fixturesPath, fixtureName);
    const fixtureFS = await createFixtureFS(fixturePath, files);
    const fixtureLogs = createFixtureLogs();

    // Wait long enough that the watch mode debounce doesn't get in the way:
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    return {
      ...fixtureFS,
      logs: fixtureLogs,
      runNames,
      waitForRun(watcher): Promise<BettererSummary> {
        return new Promise((resolve) => watcher.onRun(resolve));
      }
    };
  };
}

export function runNames(runs: BettererRuns): BettererRunNames {
  return runs.map((run) => run.name);
}