# security-headers
JS which can be deployed as a Cloudflare worker script to modify your headers for added security

Check - [security-headers](https://www.securityheaders.com/) for more details

For a website that is served via Cloudflare, you can modify the headers using the script included here. You can change the header values[1], add new headers[1] or remove existing headers[2]. 


[1] - check the variable securityHeaders

[2] - check the variable removeHeaders

### Steps

1. Add the script to your cloudflare worker.
2. Modify the variables
3. Add the following 2 routes (for your domain) to the worker:
```
*.amangoyal.me/*
amangoyal.me/*
```

And Bob's your uncle!

Example:
https://securityheaders.com/?q=amangoyal.me&followRedirects=on



