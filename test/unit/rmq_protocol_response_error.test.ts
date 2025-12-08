import { expect } from "chai"

import { ResponseCode } from "../../src/util"
import { StreamResponseError } from "../../src/stream_response_error"

describe("[unit] StreamResponseError Test", () => {
  it("Should throw expected StreamResponseError exception", () => {
    const expected = { message: "A message", code: ResponseCode.SubscriptionIdDoesNotExist }
    const isExpectedError = (error: unknown) => {
      return error instanceof StreamResponseError
    }

    try {
      throw new StreamResponseError(expected.message, expected.code)
    } catch (error_) {
      if (!isExpectedError(error_)) {
        expect.fail(`The unexpected error instance was thrown: ${(error_ as Error).constructor.name}`)
      }

      const actual = error_

      expect(actual).instanceOf(StreamResponseError)
      expect(actual.message).eql(expected.message)
      expect(actual.responseCode).eql(expected.code)
    }
  })
})
