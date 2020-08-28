import { BettererFilePaths } from '../watcher';
import { BettererConfig } from '../config';
import { BettererDiff, BettererResult } from '../results';
import { BettererTest } from '../test';

export type BettererRuns = ReadonlyArray<BettererRun>;
export type BettererRunNames = Array<string>;

export type BettererContext = {
  readonly config: BettererConfig;
};

export type BettererRun = {
  readonly diff: BettererDiff;
  readonly expected: BettererResult;
  readonly files: BettererFilePaths;
  readonly name: string;
  readonly result: BettererResult;
  readonly test: BettererTest;
  readonly timestamp: number;

  readonly isBetter: boolean;
  readonly isComplete: boolean;
  readonly isExpired: boolean;
  readonly isFailed: boolean;
  readonly isNew: boolean;
  readonly isSame: boolean;
  readonly isSkipped: boolean;
  readonly isUpdated: boolean;
  readonly isWorse: boolean;
};

export type BettererSummary = {
  readonly runs: BettererRuns;
  readonly obsolete: BettererRunNames;
  readonly result: string;
  readonly expected: string | null;
  readonly hasDiff: boolean;

  readonly better: BettererRuns;
  readonly completed: BettererRuns;
  readonly expired: BettererRuns;
  readonly failed: BettererRuns;
  readonly new: BettererRuns;
  readonly ran: BettererRuns;
  readonly same: BettererRuns;
  readonly skipped: BettererRuns;
  readonly updated: BettererRuns;
  readonly worse: BettererRuns;
};
