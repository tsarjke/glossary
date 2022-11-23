const {Router} = require('express');
const Term = require('../models/Term');
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require("express-validator");

const router = Router();

router.post('/generate',
    [
        auth,
        check('term', 'Поле не может быть пустым').exists(),
        check('description', 'Поле не может быть пустым').exists(),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректно введенные данные при создании термина'
            })
        }

        const {term, description} = req.body;

        const existing = await Term.findOne({term: term.toLowerCase()});

        if (existing) {
            return res.status(400).json({message: 'Такой термин уже существует!'});
        }

        const termObj = new Term({
            term: term.toLowerCase(), description, owner: req.user.userId
        });

        await termObj.save();

        res.status(201).json({termObj});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const terms = await Term.find({owner: req.user.userId});
        res.json(terms);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
    }
});
router.get('/:id', auth, async (req, res) => {
    try {
        const term = await Term.findById(req.params.id);
        res.json(term);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так!'})
    }
});

module.exports = router;