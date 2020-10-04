import { extendedJsonGedcomData } from './examples/extendedJsonGedcomData'

export class UrlBuilder {
    family: extendedJsonGedcomData | {}
    root: string
    deCujus: string
    name: string
    view: 'relatives' | 'hourglass'

    constructor() {
        this.family = {}
        this.root = ''
        this.deCujus = ''
        this.name = ''
        this.view = 'relatives'
    }

    addFamily(family: extendedJsonGedcomData): UrlBuilder {
        this.family = family
        return this
    }

    addRoot(root: string): UrlBuilder {
        this.root = root
        return this
    }

    addDeCujus(deCujus: string): UrlBuilder {
        this.deCujus = deCujus
        return this
    }

    addName(name: string): UrlBuilder {
        this.name = name
        return this
    }

    build(): string {

        if (this.family === {}) throw new Error()
        if (this.root === '') throw new Error()
        if (this.deCujus === '') throw new Error()
        if (this.name === '') throw new Error()

        return "/succession/tree/view?"+
        "url="+"https%3A%2F%2Fwebtreeprint.com%2Ftp_downloader.php%3Fpath%3Dfamous_gedcoms%2Fshakespeare.ged"+
        "&view="+this.view+
        "&name="+this.name+
        "&data="+encodeURI(JSON.stringify(this.family))+
        "&root="+this.root+
        "&deCujus="+this.deCujus
    }
}