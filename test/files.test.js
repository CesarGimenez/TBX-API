const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const { describe, it } = require('mocha')

chai.use(chaiHTTP)
const { expect } = chai

describe('GET /files', () => {
  it('should return formatted file data', (done) => {
    chai.request(app)
      .get('/files/data')
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res).to.have.status(200)
        const { body } = res
        expect(body.files).to.be.an('array')
        expect(body.files[0]).to.have.property('file')
        expect(body.files[0]).to.have.property('lines')
        expect(body.files[0].lines[0]).to.have.property('text')
        expect(body.files[0].lines[0]).to.have.property('number')
        expect(body.files[0].lines[0]).to.have.property('hex')
        done()
      })
  })
})

describe('GET /files/list', () => {
  it('should return list of files', (done) => {
    chai.request(app)
      .get('/files/list')
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res).to.have.status(200)
        const { body } = res
        expect(body.files).to.be.an('array')
        expect(body.files[0]).to.be.a('string')
        done()
      })
  })
})

describe('GET /files/data?fileName=test2.csv', () => {
  it('should return file data', (done) => {
    chai.request(app)
      .get('/files/data?fileName=test2.csv')
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res).to.have.status(200)
        const { body } = res
        expect(body.file).to.be.an('object')
        expect(body.file).to.have.property('file')
        expect(body.file).to.have.property('lines')
        done()
      })
  })
})

