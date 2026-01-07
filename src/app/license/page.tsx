import checker from 'license-checker';
import fs from 'fs'
import { Markdown } from "@/components/layout/markdown";

type License = {
    licenses: string,
    repository: string,
    publisher: string,
    url: string,
    path: string,
    licenseFile: string,
}
type LicenseDetail = {
    name: string,
    licenses: string,
    repository: string,
    publisher: string,
    url: string,
    licenseText?: string,
}
export default async function License() {
    const licenses: LicenseDetail[] = []
    const init = new Promise<void>((resolve, reject) => {
        checker.init({
            start: process.cwd(),
            production: true
        }, (err: Error, packages) => {
            if (err) {
                reject(err)
            } else {
                const mapped = Object.entries(packages).map(([name, license]) => {
                    return {
                        name,
                        licenses: license.licenses,
                        repository: license.repository,
                        publisher: license.publisher,
                        url: license.url,
                        licenseText: license.licenseFile ? fs.readFileSync(license.licenseFile, 'utf-8') : undefined
                    }
                })
                licenses.push(...mapped as LicenseDetail[])
                resolve()
            }
        })
    })
    await init
    return (
        <>
            <h1>License</h1>
            <div className="flex flex-col gap-4">
                {licenses.map((license) => (
                    <div key={license.name}>
                        <h2>{license.name}</h2>
                        {license.publisher && <p>Published by: {license.publisher}</p>}
                        {license.licenses && <p>License: {license.licenses.includes('Custom ') ? <><span>Custom: </span><a href={license.licenses.split('Custom: ')[1]}>{license.licenses.split('Custom: ')[1]}</a></> : license.licenses}</p>}
                        {license.repository && <p>Repository: <a href={license.repository}>{license.repository}</a></p>}
                        {license.url && <p>URL: <a href={license.url}>{license.url}</a></p>}
                        {license.licenseText && <Markdown markdown={license.licenseText} />}
                    </div>
                ))}
            </div>
        </>
    )
}