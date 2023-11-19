import * as hapi from '@hapi/hapi';
import routes from './routes.js';

const initServer = async () => {
	const server = hapi.server(
		{
			port: 8080,
			host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1',
		},
	);

	server.route(routes);

	await server.start();
	console.log(`Server berjalan di ${server.info.uri}`);
};

initServer();
