const knex = require('knex');

const router = require('express').Router()
const Bears = require('./bears-model.js')

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/bearz.db3',
    },
    useNullAsDefault: true,
    debug: true,
};

const db = knex(knexConfig)

router.get('/', (req, res) => {
    Bears.find()
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    Bears.findById(req.params.id)
        .then(bear => {
            if (bear) {
                res.status(200).json(bear);
            } else {
                res.status(404).json({ message: 'Bear not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/', (req, res) => {
    Bears.find()
        .insert(req.body, 'id')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body; 
    Bears.find()
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} bear updated` });
            } else {
                res.status(404).json({ message: 'Bear not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', (req, res) => {
    Bears.find()
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                const unit = count > 1 ? 'bears' : 'bear';
                res.status(200).json({ message: `${count} ${unit} deleted` });
            } else {
                res.status(404).json({ message: 'Bear not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});



module.exports = router;