import { execSync } from "child_process"

const dropDb = () => {
    execSync('npx db-migrate --env test down -c 5')
}

export default dropDb;