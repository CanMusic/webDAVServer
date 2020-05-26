const http = require('http');
const urlencoder = require('urlencoder');
var server = new http.Server();

server.on('request', (req, res) => {
	let buf = '';
	req.on('data', (data) => {
		buf += data;
	});

	req.on('end', () => {
		console.dir({
			method: req.method,
			url: req.url,
			headers: req.headers,
			data: buf
		});
	});

	if (req.method === 'OPTIONS') {
		res.writeHead(200, {
			'Connection': 'keep-alive',
			'Keep-Alive': 'timeout=60',
			'DAV': 2,
			'Allow': 'DELETE, GET, LOCK, UNLOCK, MKCOL, MOVE, OPTIONS, PROPFIND, PUT, COPY',
		});
		res.end();
	} else if (req.method === 'PROPFIND') {
		res.writeHead(207, {
			'Connection': 'keep-alive',
			'Keep-Alive': 'timeout=60',
			'Content-Type': 'text/xml; charset=UTF-8'
		});
		res.write(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
		<d:multistatus xmlns:d="DAV:" xmlns:s="http://ns.jianguoyun.com">
			<d:response>
				<d:href>/dav/</d:href>
				<d:propstat>
					<d:prop>
						<d:getlastmodified>Tue, 26 May 2020 15:19:31 GMT</d:getlastmodified>
						<d:getcontentlength>0</d:getcontentlength>
						<d:resourcetype>
							<d:collection/>
						</d:resourcetype>
					</d:prop>
					<d:status>HTTP/1.1 200 OK</d:status>
				</d:propstat>
			</d:response>
			<d:response>
				<d:href>/dav/${urlencoder.encode('中文测试')}/</d:href>
				<d:propstat>
					<d:prop>
						<d:getlastmodified>Tue, 26 May 2020 15:19:31 GMT</d:getlastmodified>
						<d:getcontentlength>0</d:getcontentlength>
						<d:resourcetype>
							<d:collection/>
						</d:resourcetype>
					</d:prop>
					<d:status>HTTP/1.1 200 OK</d:status>
				</d:propstat>
			</d:response>
			<d:response>
				<d:href>/dav/123/</d:href>
				<d:propstat>
					<d:prop>
						<d:getlastmodified>Tue, 26 May 2020 15:19:31 GMT</d:getlastmodified>
						<d:getcontentlength>0</d:getcontentlength>
						<d:resourcetype>
							<d:collection/>
						</d:resourcetype>
					</d:prop>
					<d:status>HTTP/1.1 200 OK</d:status>
				</d:propstat>
			</d:response>
		</d:multistatus>`);
		res.end();
	}
});

server.listen(9007);