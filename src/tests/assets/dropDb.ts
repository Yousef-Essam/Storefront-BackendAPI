import { execSync } from 'child_process'

const dropDb = () => {
    execSync('npx db-migrate --env test reset')
}

export default dropDb
