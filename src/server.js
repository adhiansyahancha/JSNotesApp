import * as hapi from '@hapi/hapi';
import routes from './routes.js';

const initServer = async () => {
	const server = hapi.server(
		{
			port: 80,
			host: process.env.NODE_ENV !== 'production' ? '127.0.0.1' : '0.0.0.0',
		},
	);

	server.route(routes);

	await server.start();
	console.log(`Server berjalan di ${server.info.uri}`);
};

initServer();
