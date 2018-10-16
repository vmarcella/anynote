const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

const Note = require('../models/note');
const Section = require('../models/section');

chai.use(chaiHttp);

const sampleSection = {
    title: 'Test section'
}

const sampleNote = {
    title: 'Cool note',
    content: 'This is a cool note',
}

var section;

describe('Creating, reading, updating, and deleting notes', () => {
    before(() => {
        section = new Section(sampleSection);
        sampleNote.sectionId = section._id
    })

    after(() => {
        Section.findByIdAndRemove(section._id).then(section => {
            console.log("deleted The section and all of the notes associated with it");
        })

    })

    it('should create a new note', (done) => {
        chai.request(app).post('/notes').send(sampleNote).end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.title.should.equal('Cool note');
            res.body.content.should.equal('This is a cool note');
            res.body.sectionId.should.equal(section._id.toString());
            done();
        })
    })

    it('should get a specific note', (done) => {
        var newNote = new Note(sampleNote);
        newNote.save((err, savedNote) => {
            chai.request(app).get(`/notes/${savedNote._id}`).end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.title.should.equal('Cool note');
                res.body.content.should.equal('This is a cool note');
                res.body.sectionId.should.equal(section._id.toString());
                done();
            })
        })
    });

    it('should update the title of a note', (done) => {
        var newNote = new Note(sampleNote);
        newNote.save((err, savedNote) => {
            chai.request(app).put(`/notes/${savedNote._id}`).send({title: 'updated'}).end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.title.should.equal('updated');
                done();
            })
        })
    })

    it('should delete the note', (done) => {
        var newNote = new Note(sampleNote);
        newNote.save((err, savedNote) => {
            chai.request(app).delete(`/notes/${savedNote._id}`).end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
        })
    })
})
