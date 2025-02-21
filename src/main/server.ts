import env from './config/env'
import app from './config/app'

const main = async () => {
  try {
    await app.listen({ port: env.port, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

main()