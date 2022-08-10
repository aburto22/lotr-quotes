type PipeArgs<T> = Array<(array: T[]) => T[]>;

export const pipe = <T>(initialValue: T[], ...args: PipeArgs<T>): T[] =>
  args.reduce((result, fn) => fn(result), initialValue);

type WithName = {
  name: string;
};

type WithRace = {
  race: string;
};

export const filterByName =
  (name: string) =>
  <T extends WithName>(array: T[]): T[] => {
    const nameFormatted = name.toLowerCase();
    return array.filter((e) => e.name.toLowerCase().includes(nameFormatted));
  };

export const filterByRace =
  (race: string) =>
  <T extends WithRace>(array: T[]): T[] => {
    const raceFormatted = race.toLowerCase();
    return array.filter((e) => e.race.toLowerCase().includes(raceFormatted));
  };
