import type { NToQ, QToN, TypeInferrer } from '$lib/util/definitions/types.d';
import { Types } from '$lib/util/definitions/types.d';

export const ntoq: NToQ = (data: string[]): number[] => {
  const seen: string[] = [];
  return data.map((d: string): number => {
    if (seen.includes(d)) return seen.indexOf(d);
    seen.push(d);
    return seen.length - 1;
  });
};

export const qton: QToN = (data: number[]): string[] => data.map((d: number): string => '' + d);

export const type: TypeInferrer = (data: any[]): Types =>
  data.every((d: any): boolean => +d === d) ? Types.QUANTITATIVE : Types.NOMINAL;
