import { expect } from "chai"

import RMQProtocolResponseError from "../../src/rmq_protocol_response_error"
import { ResponseCode } from "../../src/util"

describe("[unit] RMQProtocolResponseError Test", () => {
  it("Should throw expected RMQProtocolResponseError exception", () => {
    const expected = { message: "A message", code: ResponseCode.SubscriptionIdDoesNotExist }
    const isExpectedError = (error: unknown) => {
      return error instanceof RMQProtocolResponseError
    }

    try {
      throw new RMQProtocolResponseError(expected.message, expected.code)
    } catch (error_) {
      if (!isExpectedError(error_)) {
        expect.fail(`The unexpected error instance was thrown: ${(error_ as Error).constructor.name}`)
      }

      const actual = error_

      expect(actual).instanceOf(RMQProtocolResponseError)
      expect(actual.message).eql(expected.message)
      expect(actual.code).eql(expected.code)
    }
  })
})
