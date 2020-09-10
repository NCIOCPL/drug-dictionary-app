export const emboldenSubstring = (str, subStr) => {
	// Escape special character first before building expression
	const regex = new RegExp(subStr.replace(/[-[\]{}()*+!<=:?.\\^$|#\s,]/g, '\\$&'), 'i');
	return str.replace(regex, '<strong>$&</strong>');
};
