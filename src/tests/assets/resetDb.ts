import { execSync } from 'child_process'

const resetDb = () => {
    execSync(
        'npx db-migrate --env test down -c 5 && npx db-migrate --env test up'
    )
}

export default resetDb
