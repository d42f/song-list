import { copyFileSync, existsSync } from 'fs'

if (!existsSync('api/db.json')) {
  copyFileSync('api/db.json.example', 'api/db.json')
}
