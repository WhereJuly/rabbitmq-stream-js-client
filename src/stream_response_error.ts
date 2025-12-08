/**
 * Provides distinct domain exception for the package. Contains the optional
 * RabbitMQ Stream protocol response code for more convenient processing.
 *
 * @param message A custom error message.
 * @param rmqStreamResponseCode The above mentioned response code.
 *
 * @see https://github.com/rabbitmq/rabbitmq-server/blob/main/deps/rabbitmq_stream/docs/PROTOCOL.adoc#response-codes
 *
 * @example Selectively manage the exception type and react differently.
 *
 * ```typescript
 * let result: any;
 *
 * const isRethrowable = (error_: Error) => {
 *     const isGenericError = error_ instanceof StreamResponseError;
 *     const isNonManagedResponseCode = (error_ as StreamResponseError).code !== ResponseCode.NoOffset;
 *
 *     return isGenericError && isNonManagedResponseCode;
 * };
 *
 * try {
 *     result = await consumer.queryOffset();
 *     // ... process result
 * } catch (error_) {
 *     if (isRethrowable(error_)) { throw error_; }
 *
 *     const error = error_ as StreamResponseError;
 *     if (error.code === ResponseCode.NoOffset) { return null; }
 *
 *     return result;
 * }
 * ```
 *
 */
export class StreamResponseError extends Error {
  readonly #responseCode: number

  constructor(message: string, rmqStreamResponseCode: number) {
    super(message)

    this.name = this.constructor.name
    this.#responseCode = rmqStreamResponseCode
  }

  public get responseCode(): number | undefined {
    return this.#responseCode
  }
}
