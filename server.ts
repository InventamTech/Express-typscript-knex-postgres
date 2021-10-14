import server from './src';

const port = process.env.PORT || 8082;


console.time(`⚡️ server started with 👍🏼 database connected https://localhost:${port} in `);
server.listen(port, () => {
	console.timeEnd(`⚡️ server started with 👍🏼 database connected https://localhost:${port} in `);
});

