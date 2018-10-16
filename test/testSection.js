const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const Section = require('../models/section');

chai.use(chaiHttp);

const sampleSection =  {
    title:"Awesome section"
}

describe("Testing out sections", () => {

    after(() => {
        Section.deleteMany({title: "Awesome section"}).exec((err, sections) => {
            console.log(sections)
            sections.remove();
        })

    })

    it('should get us the homepage', (done) => {
        chai.request(app).get('/').end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    })

    it('should return a brand new section', (done) => {
        chai.request(app).post('/sections').send(sampleSection).end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.title.should.equal('Awesome section')
            res.body.notes.should.be.empty;
            done();
        });
    });

    it('should update the title of a section', (done) => {
        var section = new Section(sampleSection);
        section.save((err, createdSection) => {
            chai.request(app).put(`/sections/${createdSection._id}`).send({title: 'New title section'}).end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.title.should.equal('New title section')
                res.body.notes.should.be.empty;
                done();
            })
        });

    })

    it('should delete the section', (done) => {
        var section = new Section(section);
        section.save((err, createdSection) => {
            chai.request(app).delete(`/sections/${createdSection._id}`).end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
       })
    })
});
