const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

Sentry.init({
  dsn: "https://657eb998f8dd491b8ab1e84f437ce65e@o1361726.ingest.sentry.io/6652667",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors())

app.get('/', async (req, res) => {
  const user = await database.user.findUnique({where: {id: 1}})
  res.json({ hello: `Hello, ${user.name}!` })
})

app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})