const mongoose=require('mongoose')
const DB='mongodb+srv://iiirfffann:Zulekha21@cluster0.5wqgd2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(DB).then(()=>console.log('Connected to DB successfully')).catch(err=>console.log(err));
