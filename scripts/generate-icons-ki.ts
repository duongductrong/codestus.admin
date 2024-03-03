import fs from "fs"
import _ from "lodash"
import path from "path"
import { fileURLToPath } from "url"

export class Command {
  targetPath = "src/components/ui/icons"

  getDestination() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const createPath = path.resolve(__dirname, "..", this.targetPath)

    return createPath
  }

  getDirectoryEntries(dir: string): string[] {
    const entries = fs.readdirSync(dir)

    const results = entries.map((entry) => {
      const isFile = /\./.test(entry)
      const isFolder = !isFile

      if (isFolder) {
        return this.getDirectoryEntries(path.resolve(dir, entry))
      }

      return `${dir}${entry}`.replace(this.getDestination(), "")
    })

    const flatResults = results.flat(9).map((_path) => _path)

    return _.uniq(flatResults)
    // return _(flatResults)
  }

  execute() {
    const createPath = this.getDestination()

    const results = this.getDirectoryEntries(createPath)
  }
}
