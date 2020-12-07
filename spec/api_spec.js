describe('testing the add visitor function', () => {
    const axios = require('axios')
    let server

    beforeEach(() => {
        server = require('../src/app')
    });

    it('should check status code is equal to 200', async(done) => {
        try {
            const route = await axios.post("http://127.0.0.1:3000/addVisitor/")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })
})

describe('testing delete visitor', () => {
    const axios = require('axios')
    let server

    beforeEach(() => {
        server = require('../src/app')
    });

    it('should check status code is 200', async(done) => {
        try {
            const route = await axios.delete("http://127.0.0.1:3000/deleteAVisitor")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

    it('should return empty object after deleting A visitors', async(done) => {
        try {
            const route = await axios.delete("http://127.0.0.1:3000/deleteAVisitor")
            expect(route.outputData).toEqual({})
        } catch (err) {
            console.log(err)
        }
        done()
    })
})

describe('testing update visitor', () => {
    const axios = require('axios')
    let server

    beforeEach(() => {
        server = require('../src/app')
    });

    it('should check status code is 200', async(done) => {
        try {
            const route = await axios.put("http://127.0.0.1:3000/updateVisitor")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

})

describe('testing delete all visitor', () => {
    const axios = require('axios')
    let server

    beforeEach(() => {
        server = require('../src/app')
    });

    it('should check status code is 200', async(done) => {
        try {
            const route = await axios.delete("http://127.0.0.1:3000/deleteVisitors")
            expect(route.status).toEqual(200)
        } catch (err) {
            console.log(err)
        }
        done()
    })

    it('should return empty array after deleting all visitors', async(done) => {
        try {
            const route = await axios.delete("http://127.0.0.1:3000/deleteVisitors")
            expect(route.outputData).toEqual([])
        } catch (err) {
            console.log(err)
        }
        done()
    })
})
