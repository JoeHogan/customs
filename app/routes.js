 // app/routes.js

// grab the nerd model we just created
var Application = require('./models/application');
var extend = require('extend');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.get('/api/applications', function(req, res) {
            Application.find(function(err, applications) {
                if (err) return res.send(err);
                return res.json(applications);
            });
        });

        app.post('/api/applications', function(req, res) {
            var application = new Application(req.body);
            application.save(function(err){
                if (err) return res.send(err);
                return res.json(application);
            });
        });

        app.put('/api/applications/:applicationId', function(req, res) {
            Application.findById(req.params.applicationId, function(err, application){
                if (err) return res.send(err);
                extend(application, req.body);
                application.save(function(err){
                    if (err) return res.send(err);
                    return res.json(application);
                });
            });
        });

        app.delete('/api/applications/:applicationId', function(req, res) {
            Application.find({_id: req.params.applicationId}).remove(function(err){
                if (err) return res.send(err);
                return res.send('Item Removed');
            });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };