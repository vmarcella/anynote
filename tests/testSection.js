const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Section = require('../models/section');

chai.use(chaiHttp);

const sampleSection =  {
    "title":"Awesome section"
}

describe("Testing out sections", () => {
    before()
});
