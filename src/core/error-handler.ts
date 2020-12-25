import { validationResult } from "express-validator"
import { parseInt, values } from "lodash"
export const validationErrorChecker = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array({ onlyFirstError: true }).map((err) => err.msg))
  }
  else {
    next()
  }
}
export default (err, req, res, next) => {
  let statusCode = 400

  const codeRegex = new RegExp("#([^\\s]+)")
  const consecutiveSpaces = new RegExp("[\\s]{2,}")

  if (typeof err === "string") {

    if (err.toString().match(new RegExp("#")) !== null) {
      const [
        , statusCoded
      ] = err.match(codeRegex)
      err = err.replace(codeRegex, "")
      statusCode = parseInt(statusCoded)
    }
    err = err.replace(consecutiveSpaces, " ").trim()
    // return res.status(statusCode).send(err)
  }
  console.error(err)
  return res.status(statusCode).send(err.message ? err.message : err)

}
