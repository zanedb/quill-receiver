import fetch from 'node-fetch'
import twilio from 'twilio'
import { isEmpty } from 'lodash'

const { WEBHOOK_URL, TWILIO_AUTH_TOKEN, ENDPOINT_URL } = process.env

export default async (req, res) => {
  // validate request type
  if (req.method !== 'POST') {
    return res.status(400).send('send a POST request!')
  }

  // validate that req is from twilio
  const requestIsValid = twilio.validateRequest(
    TWILIO_AUTH_TOKEN,
    req.headers['x-twilio-signature'],
    ENDPOINT_URL,
    req.body
  )
  if (!requestIsValid) {
    console.log('UNAUTHORIZED')
    return res.status(401).send('Unauthorized')
  }

  console.log('AUTHORIZED')

  // ensure there's a body
  if (!req.body) {
    return res.status(400).send('missing body!')
  }

  // format req.body as discord embed
  const fields = []
  Object.keys(req.body).forEach((key) => {
    if (isEmpty(req.body[key])) return
    fields.push({
      name: key,
      value: req.body[key],
    })
  })

  // send message!
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: null,
      embeds: [
        {
          color: 3604735,
          fields: fields,
        },
      ],
      username: 'raw',
    }),
  })
    .catch((error) => {
      console.log(`AN ERROR OCCURRED: ${error}`)
      return res.status(500).send('request to discord failed')
    })
    .then((response) => {
      return res.status(response.status).send()
    })
}
