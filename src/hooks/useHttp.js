import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
	const response = await fetch(url, config);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(
			data?.message || 'Something went wrong, failed to send request.'
		);
	}

	return data;
}

export default function useHttp(url, config, initialData) {
	const [data, setData] = useState(initialData);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const sendRequest = useCallback(
		async function sendRequest() {
			try {
				setError('');
				setIsLoading(true);

				const resData = await sendHttpRequest(url, config);
				setData(resData);
			} catch (error) {
				setError(error.message || 'Something went wrong!');
			}
			setIsLoading(false);
		},
		[url, config]
	);

	useEffect(() => {
		if ((config && (config.method === 'GET' || !config.method)) || !config) {
			sendRequest();
		}
	}, [sendRequest, config]);

	return {
		data,
		isLoading,
		error,
		sendRequest,
	};
}
