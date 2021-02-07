addEventListener('fetch', event => {
	event.respondWith(addHeaders(event.request))
})


let securityHeaders = {
	"Content-Security-Policy" : "upgrade-insecure-requests",
	"Permissions-Policy" : "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
	"X-Xss-Protection" : "1; mode=block",
	"X-Frame-Options" : "DENY",
	"X-Content-Type-Options" : "nosniff",
	"Referrer-Policy" : "strict-origin-when-cross-origin",
}

let removeHeaders = [
  "x-fastly-request-id",
  "x-github-request-id",
  "X-Cache",
  "X-Cache-Hits",
  "x-proxy-cache",
  "X-Served-By",
  "X-Timer",
  "CF-Cache-Status",
  "Via",
  "Expires"
]


async function addHeaders(req) {
	let response = await fetch(req)
	let newHeaders = new Headers(response.headers)

	if (newHeaders.has("Content-Type") && !newHeaders.get("Content-Type").includes("text/html")) {
        return new Response(response.body , {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        })
	}

	Object.keys(securityHeaders).map(function(name, index) {
		newHeaders.set(name, securityHeaders[name]);
	})

	removeHeaders.forEach(function(name){
		newHeaders.delete(name)
	})

	return new Response(response.body , {
		status: response.status,
		statusText: response.statusText,
		headers: newHeaders
	})
}

/**
 * Respond to the request
 * @param {Request} request
 */
