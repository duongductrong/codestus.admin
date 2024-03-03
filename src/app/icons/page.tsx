/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

"use server"

import fs from "fs"
import _ from "lodash"
import dynamic from "next/dynamic"
import path from "path"
import { fileURLToPath } from "url"

class Command {
  targetPath = "src/components/ui/icons"

  getDestination() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const createPath = path.resolve(__dirname, "..", "..", "..", this.targetPath)

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

      return `${dir}/${entry}`.replace(this.getDestination(), "")
    })

    const flatResults = results.flat(9).map((_path) => _path.replace("/", ".").replace(/^\.|.svg/, ""))

    return _.uniq(flatResults)
  }

  execute() {
    const createPath = this.getDestination()

    const results = this.getDirectoryEntries(createPath)

    return results
  }
}

const Page = () => {
  const results = new Command().execute()

  function transformToType() {
    const typeValue = results.map((item) => `"${item}"`).join(" | ")

    return `type IconName = ${typeValue}`
  }

  return fs.writeFileSync("icons.d.ts", transformToType())
}

export default Page
