/*
Copyright 2020 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import {useState, useEffect} from 'react';
import {getAuthorHost} from "../utils/fetchData";
import {getPublishHost} from "../utils/fetchData";

const {AEMHeadless} = require('@adobe/aem-headless-client-js')
const {GRAPHQL_ENDPOINT, REACT_APP_SERVICE_TOKEN} = process.env;

/**
 * Custom React Hook to perform a GraphQL query
 * @param path - Persistent query path
 */
function useGraphQL(path) {
	let [data, setData] = useState(null);
	let [errorMessage, setErrors] = useState(null);
	useEffect(() => {
		function makeRequest() {
			const isLocalhost = window?.location?.host?.startsWith('localhost:3000');
			const serviceURL = isLocalhost ? getAuthorHost() : getPublishHost();
			const sdk = new AEMHeadless({
				serviceURL,
				endpoint: GRAPHQL_ENDPOINT,
			});
			const request = sdk.runPersistedQuery.bind(sdk);
			// Add cache-busting query param to avoid dispatcher cached responses
			const cacheParam = `cb=${Date.now()}`;
			const cacheBustedPath = path.includes('?') ? `${path}&${cacheParam}` : `${path}?${cacheParam}`;
			const requestOptions = isLocalhost
				? (REACT_APP_SERVICE_TOKEN
					? { headers: { Authorization: `Bearer ${REACT_APP_SERVICE_TOKEN}` } }
					: { credentials: "include" })
				: {};
			request(cacheBustedPath, {}, requestOptions)
				.then(({data, errors}) => {
					//If there are errors in the response set the error message
					if (errors) {
						setErrors(mapErrors(errors));
					}
					//If data in the response set the data as the results
					if (data) {
						setData(data);
					}
				})
				.catch((error) => {
					console.log(error);
					setErrors(error);
					sessionStorage.removeItem('accessToken');
				});
		}

		makeRequest();
	}, [path]);


	return {data, errorMessage}
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
function mapErrors(errors) {
	return errors.map((error) => error.message).join(",");
}

export default useGraphQL;
