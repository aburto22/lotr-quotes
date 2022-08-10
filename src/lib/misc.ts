type PipeArgs<T> = Array<(array: T[]) => T[]>;

export const pipe = <T>(initialValue: T[], ...args: PipeArgs<T>): T[] =>
  args.reduce((result, fn) => fn(result), initialValue);

type WithName = {
  name: string;
};

export const filterByName =
  (name: string) =>
  <T extends WithName>(array: T[]): T[] => {
    const nameFormatted = name.toLowerCase();
    return array.filter((e) => e.name.toLowerCase().includes(nameFormatted));
  };

type WithRace = {
  race: string;
};

export const filterByRace =
  (race: string) =>
  <T extends WithRace>(array: T[]): T[] => {
    const raceFormatted = race.toLowerCase();
    return array.filter((e) => e.race.toLowerCase().includes(raceFormatted));
  };

type WithDialog = {
  dialog: string;
};

export const filterByDialog =
  (dialog: string) =>
  <T extends WithDialog>(array: T[]): T[] => {
    const dialogFormatted = dialog.toLowerCase();
    return array.filter((e) =>
      e.dialog.toLowerCase().includes(dialogFormatted)
    );
  };

type WithCharacterName = {
  characterName: string;
};

export const filterByCharacterName =
  (characterName: string) =>
  <T extends WithCharacterName>(array: T[]): T[] => {
    const characterNameFormatted = characterName.toLowerCase();
    return array.filter((e) =>
      e.characterName.toLowerCase().includes(characterNameFormatted)
    );
  };

export const parseForQuery = (str: string): string =>
  str.replace(/ /g, "+").toLowerCase();
