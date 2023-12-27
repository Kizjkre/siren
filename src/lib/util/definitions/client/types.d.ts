export enum Types {
  QUANTITATIVE = 'quantitative',
  NOMINAL = 'nominal'
}

type NToQ = (data: string[]) => number[];
type QToN = (data: number[]) => string[];
type TypeInferrer = (data: any[]) => Types;
