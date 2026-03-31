import mongoose from 'mongoose';

async function test() {
  try {
    await mongoose.connect('mongodb+srv://paarthiv54:P8143210v@cluster0.z58p1r4.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');
    console.log("connected!");
    const Project = mongoose.model('Project', new mongoose.Schema({documents: Array}, {strict: false}), 'projects');
    const p = await Project.findOne({'documents.name': '222'});
    if(p) {
      console.log(JSON.stringify(p.documents.find(d => d.name === '222'), null, 2));
    } else {
      console.log('Not found');
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

test();
