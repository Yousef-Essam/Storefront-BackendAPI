import { execSync } from 'child_process'

const resetDb = () => {
    execSync(
        'npx db-migrate --env test reset && npx db-migrate --env test up'
    )
}

export default resetDb
