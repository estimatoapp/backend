const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const app = express()
const port = 3001

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

app.get('/', (req, res) => {
  res.json({ hello: 'Hello World!' })
})

app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})