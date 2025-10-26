export type Translation = {
  slug: {
    current: string;
  };
  language: string;
  title: string;
};

export type Translations = (Translation | null)[] | null;
