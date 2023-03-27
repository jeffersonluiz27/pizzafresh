const NormalizeUtils = (str: string) =>
	str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

export const matchByText = (
	searchedText: string,
	title: string
) => NormalizeUtils(searchedText).includes(NormalizeUtils(title));