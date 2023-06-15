const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.get('/:pokemonId', async (req, res) => {
    const pokemonId = +req.params.pokemonId
    
    if (
        !Number.isInteger(pokemonId)
        || pokemonId <= 0
    ) {
        res.status(404).end()
    }

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    
    const blob = await (await fetch(url)).blob()
    res.type(blob.type)
    blob.arrayBuffer()
        .then(buf => res.send(Buffer.from(buf)))
    
})


app.listen(process.env.PORT || 3000);

module.exports = app