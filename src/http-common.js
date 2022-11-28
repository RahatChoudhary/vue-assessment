import axios from "axios";

export default axios.create({
	baseURL: 'http://3.232.244.22',
	headers: {
		"Content-type": "application/json"
	}
});