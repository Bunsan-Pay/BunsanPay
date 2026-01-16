import checker from 'license-checker';
import fs from 'fs'
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("@/components/layout/markdown").then((mod) => mod.Markdown));

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
type LicenseType = 'MIT' | 'ISC' | 'Apache-2.0' | 'BSD-3-Clause' | 'BSD-2-Clause' | '0BSD' | 'MPL-2.0'
export default async function License() {
    const isExist: Record<LicenseType, boolean> = {
        MIT: false,
        ISC: false,
        'Apache-2.0': false,
        'BSD-3-Clause': false,
        'BSD-2-Clause': false,
        '0BSD': false,
        'MPL-2.0': false,
    }
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
                    const getLicenseText = (licensePath: string) => {
                        switch (license.licenses) {
                            case 'MIT':
                                if (isExist.MIT) {
                                    return null
                                } else {
                                    isExist.MIT = true
                                    return fs.readFileSync(licensePath, 'utf-8')
                                }
                            case 'ISC':
                                if (isExist.ISC) {
                                    return null
                                } else {
                                    isExist.ISC = true
                                    return fs.readFileSync(licensePath, 'utf-8')
                                }
                            case 'Apache-2.0':
                                if (isExist['Apache-2.0']) {
                                    return null
                                } else {
                                    isExist['Apache-2.0'] = true
                                    return fs.readFileSync(licensePath, 'utf-8')
                                }
                            case 'BSD-3-Clause':
                                if (isExist['BSD-3-Clause']) {
                                    return null
                                } else {
                                    isExist['BSD-3-Clause'] = true
                                    return fs.readFileSync(licensePath, 'utf-8')
                                }
                            case 'BSD-2-Clause':
                                if (isExist['BSD-2-Clause']) {
                                    return null
                                } else {
                                    isExist['BSD-2-Clause'] = true
                                    return fs.readFileSync(licensePath, 'utf-8')
                                }
                            case '0BSD':
                                if (isExist['0BSD']) {
                                    return null
                                } else {
                                    isExist['0BSD'] = true
                                    return fs.readFileSync(licensePath, 'utf-8')
                                }
                            case 'MPL-2.0':
                                if (isExist['MPL-2.0']) {
                                    return null
                                } else {
                                    isExist['MPL-2.0'] = true
                                    return fs.readFileSync(licensePath, 'utf-8')
                                }
                            default:
                                return fs.readFileSync(licensePath, 'utf-8')
                        }
                    }
                    const licenseTextResult = getLicenseText(license.licenseFile!)
                    return {
                        name,
                        licenses: license.licenses,
                        repository: license.repository,
                        publisher: license.publisher,
                        url: license.url,
                        licenseText: licenseTextResult ? licenseTextResult : undefined
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