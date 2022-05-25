module.exports = app => {
    const file = require("../controllers/files.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", file.findAll);
    router.get("/:id", file.findOne);
    router.get("/file/:Name", file.findOnebyName);

    router.post("/", file.create);
    router.delete("/:idtraining", file.delete);
    router.get('/download/',(req,res)=>{
res.download("../../../ANSI CyberRange - Admin/Server/public/Capturxe.txt");
    });

   /* Router.get('/download/:id', async (req, res) => {
      try {
        const file = await File.findById(req.params.id);
        res.set({
          'Content-Type': file.Name
        });
        res.sendFile(path.join(__dirname, '..', file.Name));
      } catch (error) {
        res.status(400).send('Error while downloading file. Try again later.');
      }
    });*/
    app.use('/api/files', router);
    
    
  };