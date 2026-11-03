export class QueryError extends Error {
    /**
     * @param {string} message
     * @param {number} status
     */
    constructor(message, status) {
        super(message)
        this.name = 'QueryError'
        this.status = status
    }
}

/**
 * @typedef RequestOptions
 * @property {string} url - The URL to fetch
 * @property {'GET' | 'POST'} method - The HTTP method to use
 * @property {HeadersInit} [headers] - Additional headers to include
 * @property {any} [body] - The body of the request, for POST requests
 * @property {File} [file] - The file to send, for POST requests
 * @property {number} [timeout=10000] - Timeout in milliseconds
 * @property {string} errorMessage - The operation to perform
 */

/**
 * @param {RequestOptions} options
 */
export async function request(options) {
    const headers = new Headers(options.headers || {})
    let body
    if (typeof options.body === 'object' && options.body !== null) {
        body = JSON.stringify(options.body)
        headers.set('Content-Type', 'application/json')
    } else if (options.file !== undefined) {
        body = options.file
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/octet-stream')
        }
    }
    const result = await fetch(options.url, {
        method: options.method,
        headers,
        body,
        signal: AbortSignal.timeout(options.timeout ?? 10000),
    })
    if (!result.ok) {
        throw new QueryError(options.errorMessage, result.status)
    }
    if (!result.headers.get('Content-Type')?.includes('application/json')) {
        return null
    }
    const data = await result.json()
    return data ?? null
}