export const getInitials = (name) =>
	name
		.split(',')
		.map((name) => name.charAt(0))
		.reverse()
		.join('');

export const isRequired = (name) => `${name} is required`;
