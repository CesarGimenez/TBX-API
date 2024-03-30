const chai = require('chai')
const chaiHTTP = require('chai-http')
const app = require('../app')
const { describe, it } = require('mocha')

chai.use(chaiHTTP)
const { expect } = chai

describe('GET /files/data', () => {
  it('should return formatted file data', (done) => { // test the GET route /files/data
    chai.request(app)
      .get('/files/data')
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res).to.have.status(200) // expect http status 200
        const { body } = res // get response body
        expect(body.files).to.be.an('array') // expect body to be an array
        expect(body.files[0]).to.have.property('file') // expect body to have a file property
        expect(body.files[0]).to.have.property('lines') // expect body to have a lines property
        expect(body.files[0].lines[0]).to.have.property('text') // expect lines to have a text property
        expect(body.files[0].lines[0]).to.have.property('number') // expect lines to have a number property
        expect(body.files[0].lines[0]).to.have.property('hex') // expect lines to have a hex property
        done()
      })
  })
})

describe('GET /files/list', () => {
  it('should return list of files', (done) => { // test the GET route /files/list
    chai.request(app)
      .get('/files/list')
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res).to.have.status(200) // expect http status 200
        const { body } = res // get response body
        expect(body.files).to.be.an('array') // expect body to be an array
        expect(body.files[0]).to.be.a('string') // expect body to be a string
        done() // this endpoint should return a list of files in the original form from the external API
      })
  })
})

describe('GET /files/data?fileName=test2.csv', () => {
  it('should return file data', (done) => {
    chai.request(app)
      .get('/files/data?fileName=test2.csv') // test the GET route /files/data?fileName=test2.csv
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res).to.have.status(200) // expect http status 200
        const { body } = res // get response body
        expect(body.file).to.be.an('object') // expect body to be an object
        expect(body.file).to.have.property('file') // expect body to have a file property
        expect(body.file).to.have.property('lines') // expect body to have a lines property
        done()
      })
  })
})

