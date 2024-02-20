const fs = require('fs')

class UnionFind {
    constructor(N) {
        this.count = N
        this.id = Array.from({length: N}, (_, i) => i)
    }


    main() {
        fs.readFile('./tinyUF.txt', {encoding: "UTF-8"}, (err, content) => {
            if (err) throw err

            const pairs = content.split('\n').map(e => e.split(' '))

            for (let i = 0; i < pairs.length; i++) {
                const p = pairs[i][0]
                const q = pairs[i][1]

                if (this.connected(p, q)) continue

                this.union(p, q)

                console.log(`connected ${p} and ${q}`)
            }

            console.log(`result: ${this.id}; component count: ${this.count}`)
        })
    }

    connected(p, q) {
        return this.find(p) === this.find(q)
    }

    find(p) {
        return this.id[p]
    }

    union(p, q) {
        const pID = this.find(p)
        const qID = this.find(q)

        if (pID === qID) return

        for (let i = 0; i < this.id.length; i++) {
            if (this.id[i] === pID) this.id[i] = qID
        }

        this.count--
    }
}

module.exports = UnionFind