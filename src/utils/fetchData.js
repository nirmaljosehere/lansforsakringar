const {REACT_APP_DEFAULT_AUTHOR_HOST, REACT_APP_DEFAULT_PUBLISH_HOST, REACT_APP_SERVICE_TOKEN} = process.env;

export const fetchData = async (path) => {
	const isLocalhost = window?.location?.host?.startsWith('localhost:3000');
	const host = isLocalhost ? getAuthorHost() : getPublishHost();
	const endpointURL = `${host}/${path.split(":/")[1]}.model.json`;
	const options = isLocalhost
		? (REACT_APP_SERVICE_TOKEN
			? { headers: { Authorization: `Bearer ${REACT_APP_SERVICE_TOKEN}` } }
			: { credentials: "include" })
		: {};
    const data = await fetch(endpointURL, options);
	const json = await data.json();
	return json;
};

export const getHostUrl = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	let host = getPublishHost();
	if (searchParams.has("authorHost")) {
		host = searchParams.get("authorHost");
	} else if (url.href.includes('https://experience.adobe.com/#/')) {
		host = getAuthorHost();
	}
	return host;
};

export const getAuthorHost = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("authorHost")) {
		return searchParams.get("authorHost");
	} else {
		return REACT_APP_DEFAULT_AUTHOR_HOST;
	}
}

export const getProtocol = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("protocol")) {
		return searchParams.get("protocol");
	} else {
		return "aem";
	}
}

export const getService = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("service")) {
		return searchParams.get("service");
	}
	return null;
}

export const getPublishHost = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("publishHost")) {
		return searchParams.get("publishHost");
	} else {
		return REACT_APP_DEFAULT_PUBLISH_HOST;
	}
}
