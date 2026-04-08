import * as prismic from "@prismicio/client";

export const client = prismic.createClient("Astrojs");

type GetSingleDocOptions = {
  textFields?: string[];
};

const isRichTextField = (value: unknown): value is prismic.RichTextField => {
  return (
    Array.isArray(value) &&
    value.every(
      (item) => typeof item === "object" && item !== null && "type" in item,
    )
  );
};

const toTextValue = (value: unknown): string | unknown => {
  if (typeof value === "string") return value;
  if (isRichTextField(value)) return prismic.asText(value) ?? "";
  return value;
};

export const getSingleDoc = async (
  type: string,
  options?: GetSingleDocOptions,
) => {
  const doc = await client.getSingle(type);

  if (!options?.textFields?.length) {
    return doc;
  }

  const normalizedData = { ...doc.data } as Record<string, unknown>;

  for (const fieldName of options.textFields) {
    normalizedData[fieldName] = toTextValue(normalizedData[fieldName]);
  }

  return {
    ...doc,
    data: normalizedData,
  };
};
